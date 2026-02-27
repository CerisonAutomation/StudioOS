/**
 * StudioOS Policy Engine & Risk Gate
 * 
 * Implements Horus-level risk gating for all automated workflows.
 * Evaluates proposed actions against predefined rules.
 * 
 * @version 1.0.0
 */

import {
    PolicyEngine,
    Policy,
    RiskGate,
    RiskLevel,
    EventType,
    Client360Profile,
    ComplianceRule,
} from './canonicalDataContracts';
import { INBOX_SKILLS, GOVERNANCE_SKILLS, requiresHumanApproval, getRiskLevel } from './skillRegistry';

// ============================================================================
// DEFAULT POLICIES
// ============================================================================

const defaultPolicies: Policy[] = [
    {
        id: 'policy.email.auto_send',
        name: 'Auto-Send Email Policy',
        description: 'Rules for auto-sending AI-generated emails',
        category: 'communication',
        priority: 1,
        enabled: true,
        conditions: [
            { field: 'channel', operator: 'equals', value: 'email', logic: 'AND' },
            { field: 'confidence', operator: 'greater_than', value: 0.9, logic: 'AND' },
            { field: 'riskLevel', operator: 'equals', value: 'low', logic: 'AND' },
        ],
        actions: [
            { type: 'allow' },
        ],
        appliesTo: ['client'],
        riskThreshold: 'low',
        requiresHumanApproval: false,
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'policy.email.review_required',
        name: 'Email Review Required',
        description: 'Require human review for sensitive emails',
        category: 'communication',
        priority: 2,
        enabled: true,
        conditions: [
            { field: 'contains_sensitive', operator: 'equals', value: true, logic: 'AND' },
            { field: 'riskLevel', operator: 'in', value: ['medium', 'high'], logic: 'AND' },
        ],
        actions: [
            { type: 'flag' },
            { type: 'notify', parameters: { recipients: ['account_manager'] } },
        ],
        appliesTo: ['client'],
        riskThreshold: 'medium',
        requiresHumanApproval: true,
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'policy.finance.quotes',
        name: 'Quote Approval Policy',
        description: 'Rules for quote generation and approval',
        category: 'finance',
        priority: 1,
        enabled: true,
        conditions: [
            { field: 'total', operator: 'greater_than', value: 50000, logic: 'AND' },
        ],
        actions: [
            { type: 'flag' },
            { type: 'escalate', parameters: { to: 'senior_manager' } },
        ],
        appliesTo: ['quote'],
        riskThreshold: 'high',
        requiresHumanApproval: true,
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'policy.design.approval',
        name: 'Design Approval Policy',
        description: 'Require approval before finalizing designs',
        category: 'design',
        priority: 1,
        enabled: true,
        conditions: [
            { field: 'status', operator: 'equals', value: 'final', logic: 'AND' },
        ],
        actions: [
            { type: 'allow' },
            { type: 'log' },
        ],
        appliesTo: ['project'],
        riskThreshold: 'medium',
        requiresHumanApproval: true,
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'policy.procurement.spending',
        name: 'Procurement Spending Limits',
        description: 'Limit automatic procurement without approval',
        category: 'procurement',
        priority: 1,
        enabled: true,
        conditions: [
            { field: 'amount', operator: 'greater_than', value: 10000, logic: 'AND' },
        ],
        actions: [
            { type: 'deny' },
            { type: 'escalate', parameters: { to: 'finance_team' } },
        ],
        appliesTo: ['supplier'],
        riskThreshold: 'high',
        requiresHumanApproval: true,
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// ============================================================================
// DEFAULT RISK GATES
// ============================================================================

const defaultRiskGates: RiskGate[] = [
    {
        id: 'gate.send_email',
        name: 'Send Email Gate',
        description: 'Evaluate if email can be auto-sent',
        category: 'communication',
        triggerEvent: 'EMAIL_SENT',
        conditions: [
            { field: 'client.risk.payment', operator: 'less_than', value: 50 },
            { field: 'client.risk.churn', operator: 'less_than', value: 30 },
        ],
        riskFactors: [
            { name: 'client_sentiment', weight: 0.3, calculation: 'client.sentiment' },
            { name: 'payment_status', weight: 0.4, calculation: 'client.payment_on_time_rate' },
            { name: 'communication_tone', weight: 0.3, calculation: 'message.sentiment' },
        ],
        threshold: 70,
        onPass: [
            { type: 'allow' },
            { type: 'log' },
        ],
        onFail: [
            { type: 'flag' },
            { type: 'notify', parameters: { method: 'email', recipients: ['manager'] } },
        ],
        enabled: true,
        passRate: 0.92,
    },
    {
        id: 'gate.generate_quote',
        name: 'Generate Quote Gate',
        description: 'Evaluate if quote can be auto-generated',
        category: 'quote',
        triggerEvent: 'QUOTE_DRAFTED',
        conditions: [
            { field: 'project.scope.complete', operator: 'equals', value: true },
        ],
        riskFactors: [
            { name: 'scope_clarity', weight: 0.4, calculation: 'project.scope.completeness' },
            { name: 'budget_defined', weight: 0.3, calculation: 'client.budget.max > 0' },
            { name: 'client_engagement', weight: 0.3, calculation: 'client.communication_frequency' },
        ],
        threshold: 60,
        onPass: [
            { type: 'allow' },
        ],
        onFail: [
            { type: 'flag' },
            { type: 'notify', parameters: { method: 'dashboard' } },
        ],
        enabled: true,
        passRate: 0.85,
    },
    {
        id: 'gate.send_proposal',
        name: 'Send Proposal Gate',
        description: 'Evaluate if proposal can be auto-sent',
        category: 'proposal',
        triggerEvent: 'PROPOSAL_SENT',
        conditions: [
            { field: 'quote.approved', operator: 'equals', value: true },
        ],
        riskFactors: [
            { name: 'quote_approval', weight: 0.5, calculation: 'quote.status == approved' },
            { name: 'terms_standard', weight: 0.3, calculation: 'proposal.terms_standard' },
            { name: 'pricing_approved', weight: 0.2, calculation: 'proposal.within_budget' },
        ],
        threshold: 80,
        onPass: [
            { type: 'allow' },
        ],
        onFail: [
            { type: 'deny' },
            { type: 'escalate' },
        ],
        enabled: true,
        passRate: 0.78,
    },
    {
        id: 'gate.auto_order',
        name: 'Auto-Order Gate',
        description: 'Evaluate if materials can be auto-ordered',
        category: 'procurement',
        triggerEvent: 'ORDER_PLACED',
        conditions: [
            { field: 'budget.available', operator: 'greater_than', value: 0 },
            { field: 'supplier.rating', operator: 'greater_than', value: 4 },
        ],
        riskFactors: [
            { name: 'budget_available', weight: 0.4, calculation: 'project.budget.remaining' },
            { name: 'supplier_rating', weight: 0.3, calculation: 'supplier.rating' },
            { name: 'delivery_reliability', weight: 0.3, calculation: 'supplier.on_time_rate' },
        ],
        threshold: 75,
        onPass: [
            { type: 'allow' },
        ],
        onFail: [
            { type: 'deny' },
            { type: 'flag' },
        ],
        enabled: true,
        passRate: 0.88,
    },
];

// ============================================================================
// POLICY ENGINE CLASS
// ============================================================================

export class PolicyEngineService implements PolicyEngine {
    policies: Policy[];
    riskGates: RiskGate[];
    complianceRules: ComplianceRule[];

    constructor() {
        this.policies = defaultPolicies;
        this.riskGates = defaultRiskGates;
        this.complianceRules = [];
    }

    /**
     * Evaluate if an action is allowed based on policies
     */
    async evaluateAction(params: {
        actionType: string;
        entity: 'client' | 'project' | 'quote' | 'invoice' | 'supplier' | 'system';
        entityId: string;
        metadata: Record<string, unknown>;
        clientProfile?: Client360Profile;
    }): Promise<{
        allowed: boolean;
        requiresApproval: boolean;
        riskLevel: RiskLevel;
        reasons: string[];
        recommendations?: string[];
    }> {
        // Find applicable policies
        const applicablePolicies = this.policies
            .filter(p => p.enabled)
            .filter(p => p.appliesTo.includes(params.entity))
            .sort((a, b) => b.priority - a.priority);

        let requiresApproval = false;
        let riskLevel: RiskLevel = 'low';
        const reasons: string[] = [];

        for (const policy of applicablePolicies) {
            // Check conditions
            const conditionsMet = policy.conditions.every(cond => {
                const value = params.metadata[cond.field];
                return this.evaluateCondition(cond.operator, value, cond.value);
            });

            if (conditionsMet) {
                // Check risk threshold
                const thresholdRisk = this.riskLevelToNumber(policy.riskThreshold);
                const currentRisk = this.riskLevelToNumber(riskLevel);

                if (thresholdRisk <= currentRisk) {
                    if (policy.requiresHumanApproval) {
                        requiresApproval = true;
                        reasons.push(`Policy ${policy.name} requires human approval`);
                    }

                    for (const action of policy.actions) {
                        if (action.type === 'deny') {
                            return {
                                allowed: false,
                                requiresApproval: true,
                                riskLevel: 'high',
                                reasons: [...reasons, `Denied by policy: ${policy.name}`],
                            };
                        }
                    }
                }
            }
        }

        return {
            allowed: !requiresApproval,
            requiresApproval,
            riskLevel,
            reasons,
        };
    }

    /**
     * Evaluate risk gate for a specific action
     */
    async evaluateRiskGate(params: {
        gateId: string;
        context: Record<string, unknown>;
    }): Promise<{
        passed: boolean;
        score: number;
        threshold: number;
        actions: string[];
    }> {
        const gate = this.riskGates.find(g => g.id === params.gateId);

        if (!gate || !gate.enabled) {
            return {
                passed: true,
                score: 100,
                threshold: 0,
                actions: ['gate_disabled'],
            };
        }

        // Calculate risk score based on factors
        let score = 0;
        for (const factor of gate.riskFactors) {
            const factorValue = this.evaluateRiskFactor(factor.calculation, params.context);
            score += factorValue * factor.weight;
        }

        const passed = score >= gate.threshold;

        return {
            passed,
            score,
            threshold: gate.threshold,
            actions: passed
                ? gate.onPass.map(a => a.type)
                : gate.onFail.map(a => a.type),
        };
    }

    /**
     * Check if skill requires human approval
     */
    async checkSkillApproval(skillId: string): Promise<{
        requiresApproval: boolean;
        approvalLevel: 'human' | 'ai';
        reason?: string;
    }> {
        const requiresApproval = requiresHumanApproval(skillId);
        const riskLevel = getRiskLevel(skillId);

        return {
            requiresApproval,
            approvalLevel: requiresApproval ? 'human' : 'ai',
            reason: riskLevel === 'high' ? 'High risk action' : undefined,
        };
    }

    /**
     * Evaluate policy conditions
     */
    private evaluateCondition(operator: string, value: unknown, target: unknown): boolean {
        switch (operator) {
            case 'equals':
                return value === target;
            case 'not_equals':
                return value !== target;
            case 'contains':
                return typeof value === 'string' && value.includes(target as string);
            case 'greater_than':
                return typeof value === 'number' && value > (target as number);
            case 'less_than':
                return typeof value === 'number' && value < (target as number);
            case 'in':
                return Array.isArray(target) && target.includes(value);
            default:
                return false;
        }
    }

    /**
     * Calculate risk factor value from context
     */
    private evaluateRiskFactor(calculation: string, context: Record<string, unknown>): number {
        // Simple evaluation - in production, this would be more sophisticated
        try {
            const parts = calculation.split('.');
            let value: unknown = context;

            for (const part of parts) {
                if (value && typeof value === 'object') {
                    value = (value as Record<string, unknown>)[part];
                }
            }

            if (typeof value === 'number') {
                return Math.min(100, Math.max(0, value));
            }

            if (typeof value === 'boolean') {
                return value ? 100 : 0;
            }

            return 50; // Default neutral value
        } catch {
            return 50;
        }
    }

    /**
     * Convert risk level to number
     */
    private riskLevelToNumber(level: RiskLevel): number {
        switch (level) {
            case 'low': return 1;
            case 'medium': return 2;
            case 'high': return 3;
            case 'critical': return 4;
            default: return 1;
        }
    }

    /**
     * Get all policies
     */
    getPolicies(): Policy[] {
        return this.policies;
    }

    /**
     * Get all risk gates
     */
    getRiskGates(): RiskGate[] {
        return this.riskGates;
    }

    /**
     * Add a new policy
     */
    addPolicy(policy: Policy): void {
        this.policies.push(policy);
    }

    /**
     * Add a new risk gate
     */
    addRiskGate(gate: RiskGate): void {
        this.riskGates.push(gate);
    }
}

// Singleton instance
export const policyEngine = new PolicyEngineService();

// Convenience function for risk gating
export async function riskGateCheck(params: {
    action: string;
    skillId?: string;
    entity: 'client' | 'project' | 'quote' | 'invoice' | 'supplier' | 'system';
    entityId: string;
    metadata: Record<string, unknown>;
    clientProfile?: Client360Profile;
}): Promise<{
    approved: boolean;
    riskLevel: RiskLevel;
    requiresHumanReview: boolean;
    message: string;
}> {
    // Check skill-level approval first
    if (params.skillId) {
        const skillCheck = await policyEngine.checkSkillApproval(params.skillId);
        if (skillCheck.requiresApproval) {
            return {
                approved: false,
                riskLevel: 'high',
                requiresHumanReview: true,
                message: `Skill ${params.skillId} requires human approval: ${skillCheck.reason || ''}`,
            };
        }
    }

    // Evaluate policy
    const policyResult = await policyEngine.evaluateAction({
        actionType: params.action,
        entity: params.entity,
        entityId: params.entityId,
        metadata: params.metadata,
        clientProfile: params.clientProfile,
    });

    if (!policyResult.allowed) {
        return {
            approved: false,
            riskLevel: policyResult.riskLevel,
            requiresHumanReview: policyResult.requiresApproval,
            message: policyResult.reasons.join(', '),
        };
    }

    return {
        approved: true,
        riskLevel: policyResult.riskLevel,
        requiresHumanReview: policyResult.requiresApproval,
        message: 'Action approved',
    };
}
