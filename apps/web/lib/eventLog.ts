/**
 * StudioOS EventLog Service
 * 
 * Immutable event logging system - the single source of truth for all data.
 * Events are append-only and form the basis for the Client 360 Profile.
 * 
 * @version 1.0.0
 */

import {
    EventLogEntry,
    EventType,
    EventCategory,
    EventSource,
    Actor,
    EventPayload,
    AIEventAnalysis,
    LifecycleStage
} from './canonicalDataContracts';

// ULID generator for time-sortable unique IDs
function generateULID(): string {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    const TIME_LEN = 10;
    const RANDOM_LEN = 16;

    let str = '';
    let now = Date.now();

    // Timestamp component (10 characters)
    for (let i = TIME_LEN - 1; i >= 0; i--) {
        str = ENCODING[now % 32] + str;
        now = Math.floor(now / 32);
    }

    // Random component (16 characters)
    for (let i = 0; i < RANDOM_LEN; i++) {
        str += ENCODING[Math.floor(Math.random() * 32)];
    }

    return str;
}

// Event category mapping
const EVENT_CATEGORIES: Record<EventType, EventCategory> = {
    EMAIL_RECEIVED: 'communication',
    EMAIL_CLASSIFIED: 'communication',
    EMAIL_SENT: 'communication',
    EMAIL_OPENED: 'communication',
    EMAIL_CLICKED: 'communication',
    SMS_RECEIVED: 'communication',
    SMS_SENT: 'communication',
    WHATSAPP_RECEIVED: 'communication',
    WHATSAPP_SENT: 'communication',
    VOICE_MESSAGE_RECEIVED: 'communication',
    FACEBOOK_DM_RECEIVED: 'communication',
    INSTAGRAM_DM_RECEIVED: 'communication',
    FORM_SUBMISSION_RECEIVED: 'communication',
    PORTAL_MESSAGE_RECEIVED: 'communication',

    CLIENT_CREATED: 'client_management',
    CLIENT_UPDATED: 'client_management',
    CLIENT_STAGE_CHANGED: 'client_management',
    CLIENT_TAG_ADDED: 'client_management',
    CLIENT_TAG_REMOVED: 'client_management',
    CLIENT_ASSET_UPLOADED: 'client_management',
    CLIENT_PREFERENCE_CHANGED: 'client_management',

    PROJECT_CREATED: 'project',
    PROJECT_UPDATED: 'project',
    PROJECT_STATUS_CHANGED: 'project',
    PROJECT_COMPLETED: 'project',
    PROJECT_ON_HOLD: 'project',
    PROJECT_CANCELLED: 'project',

    SCOPE_INFERRED: 'scope',
    SCOPE_COMPUTED: 'scope',
    SCOPE_APPROVED: 'scope',
    SCOPE_CHANGED: 'scope',
    FLOORPLAN_UPLOADED: 'scope',
    FLOORPLAN_PARSED: 'scope',
    FLOORPLAN_3D_GENERATED: 'scope',

    DESIGN_CONCEPT_GENERATED: 'design',
    DESIGN_CONCEPT_APPROVED: 'design',
    DESIGN_ITERATION_CREATED: 'design',
    DESIGN_FREEZE: 'design',
    DESIGN_ASSET_CREATED: 'design',
    VISION_ANALYSIS_COMPLETED: 'design',

    QUOTE_DRAFTED: 'quote',
    QUOTE_SENT: 'quote',
    QUOTE_VIEWED: 'quote',
    QUOTE_APPROVED: 'quote',
    QUOTE_REJECTED: 'quote',
    QUOTE_REVISED: 'quote',
    PROPOSAL_GENERATED: 'quote',
    PROPOSAL_SENT: 'quote',
    PROPOSAL_VIEWED: 'quote',
    PROPOSAL_SIGNED: 'quote',
    CHANGE_REQUESTED: 'quote',
    CHANGE_APPROVED: 'quote',
    CHANGE_REJECTED: 'quote',

    INVOICE_GENERATED: 'invoice',
    INVOICE_SENT: 'invoice',
    INVOICE_VIEWED: 'invoice',
    INVOICE_PAID: 'invoice',
    INVOICE_OVERDUE: 'invoice',
    PAYMENT_RECEIVED: 'payment',
    PAYMENT_REMINDER_SENT: 'payment',
    REFUND_ISSUED: 'payment',
    DISCOUNT_APPLIED: 'payment',

    RFQ_GENERATED: 'procurement',
    RFQ_SENT: 'procurement',
    QUOTE_RECEIVED: 'procurement',
    ORDER_PLACED: 'procurement',
    ORDER_CONFIRMED: 'procurement',
    ORDER_SHIPPED: 'procurement',
    ORDER_DELIVERED: 'procurement',
    SUPPLIER_DELAY_DETECTED: 'procurement',
    SUPPLIER_ISSUE_REPORTED: 'procurement',
    MATERIAL_RETURN_REQUESTED: 'procurement',
    MATERIAL_RETURN_COMPLETED: 'procurement',

    INSTALL_SCHEDULED: 'installation',
    INSTALL_STARTED: 'installation',
    INSTALL_COMPLETED: 'installation',
    INSTALL_ISSUE_REPORTED: 'installation',
    INSTALLATION_APPROVED: 'installation',
    FINAL_WALKTHROUGH_SCHEDULED: 'installation',
    FINAL_WALKTHROUGH_COMPLETED: 'installation',
    PROJECT_HANDBOOK_DELIVERED: 'installation',

    WARRANTY_REGISTERED: 'aftercare',
    MAINTENANCE_SCHEDULED: 'aftercare',
    MAINTENANCE_COMPLETED: 'aftercare',
    CLIENT_FEEDBACK_RECEIVED: 'aftercare',
    CLIENT_TESTIMONIAL_RECEIVED: 'aftercare',
    REFERRAL_GENERATED: 'aftercare',
    REVIEW_POSTED: 'aftercare',

    AI_CLASSIFICATION_COMPLETE: 'ai_automation',
    AI_SENTIMENT_ANALYSIS_COMPLETE: 'ai_automation',
    AI_SUMMARY_GENERATED: 'ai_automation',
    AI_REPLY_DRAFTED: 'ai_automation',
    AI_REPLY_APPROVED: 'ai_automation',
    AI_REPLY_SENT: 'ai_automation',
    AI_REPLY_REJECTED: 'ai_automation',
    AI_NEXT_BEST_ACTION_GENERATED: 'ai_automation',
    AI_MICRO_PLAYBOOK_UPDATED: 'ai_automation',
    AI_DESIGN_SUGGESTION_GENERATED: 'ai_automation',
    AI_RISK_DETECTED: 'ai_automation',
    AI_OPPORTUNITY_DETECTED: 'ai_automation',

    SYSTEM_HEALTH_CHECK: 'system',
    BACKUP_COMPLETED: 'system',
    SECURITY_AUDIT_COMPLETE: 'system',
    COMPLIANCE_CHECK_COMPLETE: 'system',
    DATA_EXPORT_COMPLETED: 'system',
    REPORT_GENERATED: 'system',
};

/**
 * EventLog Service
 * Provides immutable event logging with full traceability
 */
export class EventLogService {
    private events: Map<string, EventLogEntry> = new Map();

    /**
     * Log a new event - immutable append operation
     */
    async logEvent(params: {
        clientId: string;
        projectId?: string;
        type: EventType;
        source: EventSource;
        actor: Actor;
        payload: EventPayload;
        aiAnalysis?: AIEventAnalysis;
        correlationId?: string;
        causationId?: string;
        previousEventId?: string;
        gdprConsent?: boolean;
    }): Promise<EventLogEntry> {
        const event: EventLogEntry = {
            id: generateULID(),
            timestamp: new Date().toISOString(),
            clientId: params.clientId,
            projectId: params.projectId,
            type: params.type,
            category: EVENT_CATEGORIES[params.type],
            source: params.source,
            actor: params.actor,
            payload: params.payload,
            aiAnalysis: params.aiAnalysis,
            correlationId: params.correlationId,
            causationId: params.causationId,
            previousEventId: params.previousEventId,
            gdprConsent: params.gdprConsent,
        };

        // Store event (in real app, this would write to Firestore)
        this.events.set(event.id, event);

        return event;
    }

    /**
     * Get all events for a client
     */
    async getClientEvents(clientId: string, options?: {
        limit?: number;
        offset?: number;
        startDate?: string;
        endDate?: string;
        types?: EventType[];
        categories?: EventCategory[];
    }): Promise<EventLogEntry[]> {
        let clientEvents = Array.from(this.events.values())
            .filter(e => e.clientId === clientId);

        if (options?.startDate) {
            clientEvents = clientEvents.filter(e => e.timestamp >= options.startDate!);
        }

        if (options?.endDate) {
            clientEvents = clientEvents.filter(e => e.timestamp <= options.endDate!);
        }

        if (options?.types?.length) {
            clientEvents = clientEvents.filter(e => options.types!.includes(e.type));
        }

        if (options?.categories?.length) {
            clientEvents = clientEvents.filter(e => options.categories!.includes(e.category));
        }

        // Sort by timestamp descending (newest first)
        clientEvents.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

        const offset = options?.offset || 0;
        const limit = options?.limit || 100;

        return clientEvents.slice(offset, offset + limit);
    }

    /**
     * Get all events for a project
     */
    async getProjectEvents(projectId: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<EventLogEntry[]> {
        let projectEvents = Array.from(this.events.values())
            .filter(e => e.projectId === projectId);

        projectEvents.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

        const offset = options?.offset || 0;
        const limit = options?.limit || 100;

        return projectEvents.slice(offset, offset + limit);
    }

    /**
     * Get event by ID
     */
    async getEvent(eventId: string): Promise<EventLogEntry | null> {
        return this.events.get(eventId) || null;
    }

    /**
     * Get event count for a client
     */
    async getClientEventCount(clientId: string): Promise<number> {
        return Array.from(this.events.values())
            .filter(e => e.clientId === clientId).length;
    }

    /**
     * Get latest stage for a client
     */
    async getLatestStage(clientId: string): Promise<LifecycleStage | null> {
        const stageEvents = await this.getClientEvents(clientId, {
            types: ['CLIENT_STAGE_CHANGED'],
            limit: 1,
        });

        if (stageEvents.length === 0) return null;

        const payload = stageEvents[0].payload as { newStage?: LifecycleStage };
        return payload.newStage || null;
    }

    /**
     * Get communication history for a client
     */
    async getCommunicationHistory(clientId: string, limit = 50): Promise<EventLogEntry[]> {
        return this.getClientEvents(clientId, {
            categories: ['communication'],
            limit,
        });
    }

    /**
     * Query events by correlation ID (for tracing)
     */
    async getCorrelatedEvents(correlationId: string): Promise<EventLogEntry[]> {
        return Array.from(this.events.values())
            .filter(e => e.correlationId === correlationId)
            .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    }

    /**
     * Get timeline of events (flattened for display)
     */
    async getClientTimeline(clientId: string, limit = 20): Promise<{
        id: string;
        timestamp: string;
        type: EventType;
        category: EventCategory;
        summary: string;
        sentiment?: number;
    }[]> {
        const events = await this.getClientEvents(clientId, { limit });

        return events.map(e => ({
            id: e.id,
            timestamp: e.timestamp,
            type: e.type,
            category: e.category,
            summary: this.getEventSummary(e),
            sentiment: e.aiAnalysis?.sentiment,
        }));
    }

    /**
     * Generate summary text for an event
     */
    private getEventSummary(event: EventLogEntry): string {
        const type = event.type;

        switch (type) {
            case 'EMAIL_RECEIVED':
                return `Email received: ${(event.payload as { subject?: string }).subject || 'No subject'}`;
            case 'EMAIL_SENT':
                return `Email sent: ${(event.payload as { subject?: string }).subject || 'No subject'}`;
            case 'CLIENT_STAGE_CHANGED':
                return `Stage changed to ${(event.payload as { newStage?: string }).newStage || 'unknown'}`;
            case 'QUOTE_SENT':
                return `Quote sent to client`;
            case 'QUOTE_APPROVED':
                return `Quote approved by client`;
            case 'PAYMENT_RECEIVED':
                return `Payment received`;
            case 'DESIGN_CONCEPT_APPROVED':
                return `Design concept approved`;
            case 'PROJECT_COMPLETED':
                return `Project marked as completed`;
            default:
                return type.replace(/_/g, ' ').toLowerCase();
        }
    }

    /**
     * Export events for audit
     */
    async exportEvents(clientId: string, startDate: string, endDate: string): Promise<EventLogEntry[]> {
        return this.getClientEvents(clientId, {
            startDate,
            endDate,
            limit: 10000,
        });
    }
}

// Singleton instance
export const eventLog = new EventLogService();

// Helper function for quick event logging
export async function logStudioEvent(params: {
    clientId: string;
    projectId?: string;
    type: EventType;
    source: EventSource;
    actor?: Actor;
    payload: EventPayload;
    aiAnalysis?: AIEventAnalysis;
}) {
    const actor: Actor = params.actor || {
        type: 'system',
        id: 'studioos',
        name: 'StudioOS',
    };

    return eventLog.logEvent({
        ...params,
        actor,
    });
}
