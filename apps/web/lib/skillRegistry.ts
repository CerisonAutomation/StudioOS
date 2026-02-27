/**
 * StudioOS Skill Registry
 * 
 * Defines all available AI skills for the inbox, design, and other operations.
 * Each skill is a callable function that can be invoked by AI agents.
 * 
 * @version 1.0.0
 */

// Simple skill definitions for type checking
export interface StudioOSSkill {
    id: string;
    name: string;
    description: string;
    category: string;
    version: string;
    status: 'active' | 'deprecated' | 'beta';
    riskLevel: 'low' | 'medium' | 'high';
    requiresApproval: boolean;
}

// Inbox Skills
export const INBOX_SKILLS = {
    CLASSIFY_EMAIL: 'inbox.classify_email',
    SUMMARIZE_THREAD: 'inbox.summarize_thread',
    DRAFT_REPLY: 'inbox.draft_reply',
    EXTRACT_ACTION_ITEMS: 'inbox.extract_action_items',
} as const;

// Design Skills
export const DESIGN_SKILLS = {
    GENERATE_CONCEPT: 'design.generate_concept',
    VISION_ANALYSIS: 'design.vision_analysis',
    INFER_SCOPE: 'scope.infer_from_text',
    PARSE_FLOORPLAN: 'floorplan.parse_to_rooms',
} as const;

// Quote Skills
export const QUOTE_SKILLS = {
    COMPUTE: 'quote.compute',
    GENERATE_PDF: 'quote.generate_pdf',
} as const;

// Supplier Skills
export const SUPPLIER_SKILLS = {
    DETECT_DELAYS: 'supplier.detect_delays',
    COMPARE_QUOTES: 'supplier.compare_quotes',
} as const;

// Governance Skills
export const GOVERNANCE_SKILLS = {
    RISK_GATE_SEND: 'governance.risk_gate_send',
} as const;

// Marketing Skills
export const MARKETING_SKILLS = {
    GENERATE_CONTENT: 'marketing.generate_content',
} as const;

// Skill Categories
export const SKILL_CATEGORIES = {
    INBOX: 'inbox',
    DESIGN: 'design',
    SCOPE: 'scope',
    FLOORPLAN: 'floorplan',
    QUOTE: 'quote',
    SUPPLIER: 'supplier',
    GOVERNANCE: 'governance',
    MARKETING: 'marketing',
} as const;

// Skill registry helper functions
export function getSkillById(id: string): StudioOSSkill | undefined {
    const skills: StudioOSSkill[] = [
        { id: INBOX_SKILLS.CLASSIFY_EMAIL, name: 'Classify Email', description: 'Classify incoming email', category: 'inbox', version: '1.0.0', status: 'active', riskLevel: 'low', requiresApproval: false },
        { id: INBOX_SKILLS.SUMMARIZE_THREAD, name: 'Summarize Thread', description: 'Summarize communication threads', category: 'inbox', version: '1.0.0', status: 'active', riskLevel: 'low', requiresApproval: false },
        { id: INBOX_SKILLS.DRAFT_REPLY, name: 'Draft Reply', description: 'Draft context-aware replies', category: 'inbox', version: '1.0.0', status: 'active', riskLevel: 'medium', requiresApproval: true },
        { id: DESIGN_SKILLS.GENERATE_CONCEPT, name: 'Generate Design Concept', description: 'Generate AI design concepts', category: 'design', version: '1.0.0', status: 'active', riskLevel: 'low', requiresApproval: false },
        { id: DESIGN_SKILLS.VISION_ANALYSIS, name: 'Vision Analysis', description: 'Analyze uploaded images', category: 'design', version: '1.0.0', status: 'active', riskLevel: 'low', requiresApproval: false },
        { id: QUOTE_SKILLS.COMPUTE, name: 'Compute Quote', description: 'Compute quote line items', category: 'quote', version: '1.0.0', status: 'active', riskLevel: 'medium', requiresApproval: true },
        { id: GOVERNANCE_SKILLS.RISK_GATE_SEND, name: 'Risk Gate Send', description: 'Evaluate risk before sending', category: 'governance', version: '1.0.0', status: 'active', riskLevel: 'high', requiresApproval: true },
        { id: MARKETING_SKILLS.GENERATE_CONTENT, name: 'Generate Marketing Content', description: 'Generate marketing content', category: 'marketing', version: '1.0.0', status: 'active', riskLevel: 'low', requiresApproval: true },
    ];
    return skills.find(s => s.id === id);
}

export function getSkillsByCategory(category: string): StudioOSSkill[] {
    const allSkills = [
        { id: INBOX_SKILLS.CLASSIFY_EMAIL, name: 'Classify Email', description: 'Classify incoming email', category: 'inbox', version: '1.0.0', status: 'active' as const, riskLevel: 'low' as const, requiresApproval: false },
        { id: INBOX_SKILLS.SUMMARIZE_THREAD, name: 'Summarize Thread', description: 'Summarize communication threads', category: 'inbox', version: '1.0.0', status: 'active' as const, riskLevel: 'low' as const, requiresApproval: false },
        { id: INBOX_SKILLS.DRAFT_REPLY, name: 'Draft Reply', description: 'Draft context-aware replies', category: 'inbox', version: '1.0.0', status: 'active' as const, riskLevel: 'medium' as const, requiresApproval: true },
        { id: DESIGN_SKILLS.GENERATE_CONCEPT, name: 'Generate Design Concept', description: 'Generate AI design concepts', category: 'design', version: '1.0.0', status: 'active' as const, riskLevel: 'low' as const, requiresApproval: false },
        { id: DESIGN_SKILLS.VISION_ANALYSIS, name: 'Vision Analysis', description: 'Analyze uploaded images', category: 'design', version: '1.0.0', status: 'active' as const, riskLevel: 'low' as const, requiresApproval: false },
        { id: QUOTE_SKILLS.COMPUTE, name: 'Compute Quote', description: 'Compute quote line items', category: 'quote', version: '1.0.0', status: 'active' as const, riskLevel: 'medium' as const, requiresApproval: true },
        { id: GOVERNANCE_SKILLS.RISK_GATE_SEND, name: 'Risk Gate Send', description: 'Evaluate risk before sending', category: 'governance', version: '1.0.0', status: 'active' as const, riskLevel: 'high' as const, requiresApproval: true },
        { id: MARKETING_SKILLS.GENERATE_CONTENT, name: 'Generate Marketing Content', description: 'Generate marketing content', category: 'marketing', version: '1.0.0', status: 'active' as const, riskLevel: 'low' as const, requiresApproval: true },
    ];
    return allSkills.filter(s => s.category === category);
}

export function requiresHumanApproval(skillId: string): boolean {
    const skill = getSkillById(skillId);
    return skill?.requiresApproval || false;
}

export function getRiskLevel(skillId: string): 'low' | 'medium' | 'high' {
    const skill = getSkillById(skillId);
    return skill?.riskLevel || 'low';
}
