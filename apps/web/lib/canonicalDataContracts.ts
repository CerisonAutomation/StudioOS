/**
 * StudioOS Canonical Data Contracts
 * 
 * This file defines the immutable, canonical truth sources for the entire StudioOS system.
 * All data derives from the immutable EventLog - the single source of truth.
 * 
 * Key Design Principles:
 * - Immutable event sourcing from Firestore EventLog
 * - Client 360 Profile as the unified client view
 * - Strict JSON schema enforcement for all AI outputs
 * - Full traceability for audit and compliance
 * - Horus-level risk gating for all automated actions
 * 
 * @version 1.0.0
 * @author StudioOS Engineering
 */

// ============================================================================
// CORE ENUMS & CONSTANTS
// ============================================================================

export type LifecycleStage =
    | 'S0_INTAKE'
    | 'S1_QUALIFICATION'
    | 'S2_DISCOVERY'
    | 'S3_SCOPE'
    | 'S4_QUOTE_PROPOSAL'
    | 'S5_DESIGN'
    | 'S6_PROCUREMENT'
    | 'S7_INSTALL'
    | 'S8_AFTERCARE';

export const LIFECYCLE_STAGE_ORDER: Record<LifecycleStage, number> = {
    'S0_INTAKE': 0,
    'S1_QUALIFICATION': 1,
    'S2_DISCOVERY': 2,
    'S3_SCOPE': 3,
    'S4_QUOTE_PROPOSAL': 4,
    'S5_DESIGN': 5,
    'S6_PROCUREMENT': 6,
    'S7_INSTALL': 7,
    'S8_AFTERCARE': 8,
};

export type EventType =
    // Communication Events
    | 'EMAIL_RECEIVED'
    | 'EMAIL_CLASSIFIED'
    | 'EMAIL_SENT'
    | 'EMAIL_OPENED'
    | 'EMAIL_CLICKED'
    | 'SMS_RECEIVED'
    | 'SMS_SENT'
    | 'WHATSAPP_RECEIVED'
    | 'WHATSAPP_SENT'
    | 'VOICE_MESSAGE_RECEIVED'
    | 'FACEBOOK_DM_RECEIVED'
    | 'INSTAGRAM_DM_RECEIVED'
    | 'FORM_SUBMISSION_RECEIVED'
    | 'PORTAL_MESSAGE_RECEIVED'

    // Client Management Events
    | 'CLIENT_CREATED'
    | 'CLIENT_UPDATED'
    | 'CLIENT_STAGE_CHANGED'
    | 'CLIENT_TAG_ADDED'
    | 'CLIENT_TAG_REMOVED'
    | 'CLIENT_ASSET_UPLOADED'
    | 'CLIENT_PREFERENCE_CHANGED'

    // Project Events
    | 'PROJECT_CREATED'
    | 'PROJECT_UPDATED'
    | 'PROJECT_STATUS_CHANGED'
    | 'PROJECT_COMPLETED'
    | 'PROJECT_ON_HOLD'
    | 'PROJECT_CANCELLED'

    // Scope & Design Events
    | 'SCOPE_INFERRED'
    | 'SCOPE_COMPUTED'
    | 'SCOPE_APPROVED'
    | 'SCOPE_CHANGED'
    | 'FLOORPLAN_UPLOADED'
    | 'FLOORPLAN_PARSED'
    | 'FLOORPLAN_3D_GENERATED'
    | 'DESIGN_CONCEPT_GENERATED'
    | 'DESIGN_CONCEPT_APPROVED'
    | 'DESIGN_ITERATION_CREATED'
    | 'DESIGN_FREEZE'
    | 'DESIGN_ASSET_CREATED'
    | 'VISION_ANALYSIS_COMPLETED'

    // Quote & Proposal Events
    | 'QUOTE_DRAFTED'
    | 'QUOTE_SENT'
    | 'QUOTE_VIEWED'
    | 'QUOTE_APPROVED'
    | 'QUOTE_REJECTED'
    | 'QUOTE_REVISED'
    | 'PROPOSAL_GENERATED'
    | 'PROPOSAL_SENT'
    | 'PROPOSAL_VIEWED'
    | 'PROPOSAL_SIGNED'
    | 'CHANGE_REQUESTED'
    | 'CHANGE_APPROVED'
    | 'CHANGE_REJECTED'

    // Financial Events
    | 'INVOICE_GENERATED'
    | 'INVOICE_SENT'
    | 'INVOICE_VIEWED'
    | 'INVOICE_PAID'
    | 'INVOICE_OVERDUE'
    | 'PAYMENT_RECEIVED'
    | 'PAYMENT_REMINDER_SENT'
    | 'REFUND_ISSUED'
    | 'DISCOUNT_APPLIED'

    // Procurement & Supplier Events
    | 'RFQ_GENERATED'
    | 'RFQ_SENT'
    | 'QUOTE_RECEIVED'
    | 'ORDER_PLACED'
    | 'ORDER_CONFIRMED'
    | 'ORDER_SHIPPED'
    | 'ORDER_DELIVERED'
    | 'SUPPLIER_DELAY_DETECTED'
    | 'SUPPLIER_ISSUE_REPORTED'
    | 'MATERIAL_RETURN_REQUESTED'
    | 'MATERIAL_RETURN_COMPLETED'

    // Installation & Delivery Events
    | 'INSTALL_SCHEDULED'
    | 'INSTALL_STARTED'
    | 'INSTALL_COMPLETED'
    | 'INSTALL_ISSUE_REPORTED'
    | 'INSTALLATION_APPROVED'
    | 'FINAL_WALKTHROUGH_SCHEDULED'
    | 'FINAL_WALKTHROUGH_COMPLETED'
    | 'PROJECT_HANDBOOK_DELIVERED'

    // Aftercare Events
    | 'WARRANTY_REGISTERED'
    | 'MAINTENANCE_SCHEDULED'
    | 'MAINTENANCE_COMPLETED'
    | 'CLIENT_FEEDBACK_RECEIVED'
    | 'CLIENT_TESTIMONIAL_RECEIVED'
    | 'REFERRAL_GENERATED'
    | 'REVIEW_POSTED'

    // AI & Automation Events
    | 'AI_CLASSIFICATION_COMPLETE'
    | 'AI_SENTIMENT_ANALYSIS_COMPLETE'
    | 'AI_SUMMARY_GENERATED'
    | 'AI_REPLY_DRAFTED'
    | 'AI_REPLY_APPROVED'
    | 'AI_REPLY_SENT'
    | 'AI_REPLY_REJECTED'
    | 'AI_NEXT_BEST_ACTION_GENERATED'
    | 'AI_MICRO_PLAYBOOK_UPDATED'
    | 'AI_DESIGN_SUGGESTION_GENERATED'
    | 'AI_RISK_DETECTED'
    | 'AI_OPPORTUNITY_DETECTED'

    // System Events
    | 'SYSTEM_HEALTH_CHECK'
    | 'BACKUP_COMPLETED'
    | 'SECURITY_AUDIT_COMPLETE'
    | 'COMPLIANCE_CHECK_COMPLETE'
    | 'DATA_EXPORT_COMPLETED'
    | 'REPORT_GENERATED';

export type EventSource =
    | 'email_ingress'
    | 'web_portal'
    | 'mobile_app'
    | 'voice_input'
    | 'ai_agent'
    | 'manual_entry'
    | 'system'
    | 'webhook'
    | 'form'
    | 'social_media';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ConfidenceLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

export type SentimentScore = number;

export type UrgencyLevel = 'low' | 'normal' | 'high' | 'urgent';

export type CommunicationTone = 'warm_formal' | 'formal' | 'warm' | 'casual';

export type ResponseLength = 'short' | 'medium' | 'long';

export type Channel =
    | 'email'
    | 'sms'
    | 'whatsapp'
    | 'voice'
    | 'facebook_dm'
    | 'instagram_dm'
    | 'web_portal'
    | 'form'
    | 'phone';

export type EventCategory =
    | 'communication'
    | 'client_management'
    | 'project'
    | 'scope'
    | 'design'
    | 'quote'
    | 'proposal'
    | 'invoice'
    | 'payment'
    | 'procurement'
    | 'installation'
    | 'aftercare'
    | 'ai_automation'
    | 'system';

export type AssetType =
    | 'photo'
    | 'floorplan'
    | 'moodboard'
    | 'render'
    | 'sketch'
    | 'video'
    | 'document'
    | 'contract'
    | 'invoice'
    | 'receipt'
    | 'other';

export type RoomType =
    | 'living_room'
    | 'bedroom'
    | 'kitchen'
    | 'bathroom'
    | 'dining_room'
    | 'office'
    | 'hallway'
    | 'closet'
    | 'garage'
    | 'balcony'
    | 'terrace'
    | 'utility'
    | 'other';

export type DesignArtifactType =
    | 'moodboard'
    | 'concept_board'
    | 'color_palette'
    | 'material_board'
    | 'space_plan'
    | '3d_render'
    | 'elevation'
    | 'detail_drawing'
    | 'lighting_plan'
    | 'furniture_plan'
    | 'finish_schedule';

export type ProjectStatus =
    | 'lead'
    | 'active'
    | 'on_hold'
    | 'completed'
    | 'cancelled'
    | 'archived';

export type ProjectType =
    | 'residential'
    | 'commercial'
    | 'hospitality'
    | 'retail'
    | 'office'
    | 'mixed_use'
    | 'renovation'
    | 'new_build';

export type QuoteStatus =
    | 'draft'
    | 'internal_review'
    | 'sent'
    | 'viewed'
    | 'responded'
    | 'approved'
    | 'rejected'
    | 'revised'
    | 'expired'
    | 'withdrawn';

export type InvoiceStatus =
    | 'draft'
    | 'sent'
    | 'viewed'
    | 'paid'
    | 'partial'
    | 'overdue'
    | 'cancelled'
    | 'refunded';

export type SupplierType =
    | 'furniture'
    | 'lighting'
    | 'fabrics'
    | 'flooring'
    | 'paint'
    | 'tile'
    | 'stone'
    | 'hardware'
    | 'appliances'
    | 'art'
    | 'accessories'
    | 'contractor'
    | 'other';

export type CampaignType =
    | 'email'
    | 'social'
    | 'sms'
    | 'whatsapp'
    | 'retargeting'
    | 'seasonal'
    | 'promotional'
    | 'nurture'
    | 're_engagement';

export type CampaignStatus =
    | 'draft'
    | 'scheduled'
    | 'active'
    | 'paused'
    | 'completed'
    | 'cancelled';

export type MarketingChannel =
    | 'email'
    | 'instagram'
    | 'facebook'
    | 'whatsapp'
    | 'sms'
    | 'web';

export type ActionCategory =
    | 'inbox'
    | 'project'
    | 'finance'
    | 'supplier'
    | 'design'
    | 'compliance'
    | 'system';

// ============================================================================
// IDENTITY & CONTACT
// ============================================================================

export interface Identity {
    id: string;
    clientId: string;
    names: string[];
    emails: EmailAddress[];
    phones: PhoneNumber[];
    addresses: Address[];
    preferredLanguage: 'en' | 'mt' | 'es' | 'it' | 'fr' | 'de';
    timezone: string;
    avatarUrl?: string;
    company?: string;
    jobTitle?: string;
    dateOfBirth?: string;
    nationality?: string;
    taxId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface EmailAddress {
    email: string;
    isPrimary: boolean;
    isVerified: boolean;
    verifiedAt?: string;
    notificationsEnabled: boolean;
}

export interface PhoneNumber {
    phone: string;
    isPrimary: boolean;
    isWhatsApp: boolean;
    isVerified: boolean;
    verifiedAt?: string;
    countryCode: string;
}

export interface Address {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isPrimary: boolean;
    addressType: 'residential' | 'commercial' | 'billing' | 'shipping';
}

// ============================================================================
// RELATIONSHIP & LIFECYCLE
// ============================================================================

export interface Relationship {
    stage: LifecycleStage;
    stageHistory: StageTransition[];
    leadScore: number;
    leadScoreHistory: { timestamp: string; score: number }[];
    sentimentCurrent: SentimentScore;
    sentimentHistory: SentimentSnapshot[];
    sla: ServiceLevelAgreement;
    accountManager?: string;
    primaryDesigner?: string;
    referralSource?: string;
    referralCode?: string;
    createdAt: string;
    firstContactAt?: string;
    lastContactAt?: string;
    nextScheduledContact?: string;
}

export interface StageTransition {
    fromStage: LifecycleStage | null;
    toStage: LifecycleStage;
    timestamp: string;
    triggeredBy: 'manual' | 'automated' | 'client_action';
    reason?: string;
}

export interface SentimentSnapshot {
    timestamp: string;
    score: SentimentScore;
    source: 'email' | 'call' | 'meeting' | 'survey' | 'ai_analysis';
    context?: string;
}

export interface ServiceLevelAgreement {
    replyWithinHours: number;
    responseTimeActual?: number;
    meetingsPerWeek?: number;
    dedicatedHoursPerWeek?: number;
    emergencyContactProtocol?: string;
}

// ============================================================================
// PREFERENCES & CONSTRAINTS
// ============================================================================

export interface Preferences {
    styleTags: string[];
    styleConfidence: Record<string, number>;
    materialsPreferred: string[];
    materialsAvoid: string[];
    brandsPreferred: string[];
    brandsAvoid: string[];
    colorsPreferred: string[];
    colorsAvoid: string[];
    tonePreference: CommunicationTone;
    responseLengthPreference: ResponseLength;
    communicationPreferences: CommunicationPreference[];
    budgetRange: BudgetRange;
    timelinePreference: TimelinePreference;
    lifestyleRequirements: string[];
    accessibilityRequirements: string[];
    sustainabilityPriority: 'low' | 'medium' | 'high';
    updatedAt: string;
}

export interface CommunicationPreference {
    channel: Channel;
    enabled: boolean;
    preferredTimes?: string[];
    doNotDisturb?: string;
}

export interface BudgetRange {
    min: number;
    max: number;
    currency: string;
    isFlexible: boolean;
    includesContingency: boolean;
    contingencyPercent?: number;
}

export interface TimelinePreference {
    desiredStartDate?: string;
    desiredCompletionDate?: string;
    flexibility: 'fixed' | 'flexible' | 'very_flexible';
    urgency: UrgencyLevel;
    moveInDate?: string;
    eventDate?: string;
}

// ============================================================================
// COMMUNICATION DNA
// ============================================================================

export interface CommunicationDNA {
    inferredLength: ResponseLength;
    inferredFormality: CommunicationTone;
    responsePattern: ResponsePattern;
    engagementPattern: EngagementPattern;
    decisionMakingStyle: DecisionMakingStyle;
    communicationStyleAnalysis: CommunicationStyleAnalysis;
    lastAnalyzedAt: string;
}

export interface ResponsePattern {
    medianHours: number;
    fastestResponseHours: number;
    slowestResponseHours: number;
    typicalResponseTimeDistribution: { bucket: string; count: number }[];
    responseRate: number;
}

export interface EngagementPattern {
    mostActiveDayOfWeek: string;
    mostActiveTimeOfDay: string;
    preferredMeetingTimes: string[];
    meetingDuration: number;
    prefersWrittenOverCalls: boolean;
    checkInFrequencyPreferred: 'weekly' | 'biweekly' | 'monthly' | 'as_needed';
}

export interface DecisionMakingStyle {
    speed: 'quick' | 'moderate' | 'deliberate';
    informationNeed: 'minimal' | 'moderate' | 'extensive';
    approvalNeeded: boolean;
    typicalApprovalCycleDays: number;
    preferOptionsCount: number;
}

export interface CommunicationStyleAnalysis {
    formality: number;
    warmth: number;
    directness: number;
    verbosity: number;
    emojiUsage: 'none' | 'sparse' | 'moderate' | 'frequent';
    greetingStyle: string;
    signOffStyle: string;
}

// ============================================================================
// FINANCIAL DATA
// ============================================================================

export interface FinancialProfile {
    quotes: QuoteSummary[];
    invoices: InvoiceSummary[];
    payments: PaymentRecord[];
    paymentBehavior: PaymentBehavior;
    totalRevenue: number;
    averageDealSize: number;
    currency: string;
    billingAddress?: Address;
    taxExempt: boolean;
    taxExemptionCertificate?: string;
    paymentTermsAgreed: string;
    discountEntitlements: DiscountEntitlement[];
}

export interface QuoteSummary {
    id: string;
    projectId: string;
    projectName: string;
    amount: number;
    currency: string;
    version: number;
    status: QuoteStatus;
    createdAt: string;
    sentAt?: string;
    viewedAt?: string;
    approvedAt?: string;
}

export interface InvoiceSummary {
    id: string;
    projectId: string;
    projectName: string;
    invoiceNumber: string;
    amount: number;
    currency: string;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    paidAt?: string;
}

export interface PaymentRecord {
    id: string;
    invoiceId: string;
    amount: number;
    currency: string;
    method: 'bank_transfer' | 'card' | 'cash' | 'cheque' | 'other';
    reference?: string;
    receivedAt: string;
    processedAt: string;
}

export interface PaymentBehavior {
    onTimeRate: number;
    earlyPaymentRate: number;
    latePaymentRate: number;
    averageDaysLate: number;
    discountRequests: number;
    discountGiven: number;
    paymentIssues: PaymentIssue[];
}

export interface PaymentIssue {
    type: 'late' | 'dispute' | 'partial' | 'failed';
    description: string;
    invoiceId: string;
    occurredAt: string;
    resolvedAt?: string;
}

export interface DiscountEntitlement {
    type: 'loyalty' | 'volume' | 'promotional' | 'staff';
    percentage: number;
    validUntil?: string;
    conditions?: string;
}

// ============================================================================
// ASSETS
// ============================================================================

export interface ClientAssets {
    photos: Asset[];
    floorplans: FloorplanAsset[];
    pdfs: DocumentAsset[];
    videos: Asset[];
    designs: DesignArtifact[];
    contracts: DocumentAsset[];
    receipts: DocumentAsset[];
    other: Asset[];
    totalStorageUsed: number;
}

export interface Asset {
    id: string;
    clientId: string;
    projectId?: string;
    type: AssetType;
    name: string;
    url: string;
    thumbnailUrl?: string;
    mimeType: string;
    size: number;
    dimensions?: { width: number; height: number };
    duration?: number;
    uploadedAt: string;
    uploadedBy: string;
    tags: string[];
    description?: string;
    source: EventSource;
}

export interface FloorplanAsset extends Asset {
    type: 'floorplan';
    floorplanData: FloorplanData;
}

export interface FloorplanData {
    rooms: Room[];
    totalArea: number;
    unit: 'sqm' | 'sqft';
    floors: number;
    dimensions?: { width: number; height: number };
    scale?: number;
    northIndicator?: boolean;
    measurements: Measurement[];
}

export interface Room {
    id: string;
    name: string;
    type: RoomType;
    area: number;
    dimensions?: { width: number; length: number; height: number };
    windows: number;
    doors: number;
    features: string[];
    notes?: string;
}

export interface Measurement {
    from: string;
    to: string;
    value: number;
    unit: 'm' | 'cm' | 'ft' | 'in';
}

export interface DocumentAsset extends Asset {
    type: 'document' | 'contract' | 'invoice' | 'receipt';
    documentData: DocumentData;
}

export interface DocumentData {
    pages?: number;
    extractedText?: string;
    signedAt?: string;
    expiresAt?: string;
}

// ============================================================================
// DESIGN ARTIFACTS
// ============================================================================

export interface DesignArtifact {
    id: string;
    clientId: string;
    projectId: string;
    type: DesignArtifactType;
    name: string;
    description?: string;
    version: number;
    status: 'draft' | 'in_review' | 'approved' | 'rejected' | 'superseded';
    generationMethod: 'ai_generated' | 'manual' | 'hybrid';
    generationPrompt?: string;
    assets: Asset[];
    metadata: DesignArtifactMetadata;
    approvals: DesignApproval[];
    feedback: DesignFeedback[];
    createdAt: string;
    updatedAt: string;
    createdBy: 'ai_agent' | 'designer' | 'client';
}

export interface DesignArtifactMetadata {
    style?: string;
    mood?: string;
    colorTemperature?: 'warm' | 'neutral' | 'cool';
    complexity?: 'simple' | 'moderate' | 'complex';
    estimatedCost?: number;
    roomIds?: string[];
    tags?: string[];
    aiModelUsed?: string;
    generationTime?: number;
}

export interface DesignApproval {
    userId: string;
    userName: string;
    role: 'designer' | 'client' | 'project_manager' | 'stakeholder';
    decision: 'approved' | 'approved_with_comments' | 'rejected' | 'pending';
    comments?: string;
    timestamp: string;
}

export interface DesignFeedback {
    id: string;
    userId: string;
    userName: string;
    type: 'comment' | 'revision_request' | 'question' | 'compliment';
    content: string;
    timestamp: string;
    resolved: boolean;
    resolvedAt?: string;
}

// ============================================================================
// RISK MANAGEMENT
// ============================================================================

export interface RiskProfile {
    overall: RiskScore;
    churn: RiskScore;
    scopeCreep: RiskScore;
    payment: RiskScore;
    supplier: RiskScore;
    timeline: RiskScore;
    quality: RiskScore;
    riskHistory: RiskEvent[];
    mitigationStrategies: MitigationStrategy[];
}

export interface RiskScore {
    level: RiskLevel;
    score: number;
    factors: RiskFactor[];
    lastUpdatedAt: string;
    trend: 'increasing' | 'stable' | 'decreasing';
}

export interface RiskFactor {
    category: string;
    description: string;
    weight: number;
    evidence: string[];
    detectedAt: string;
}

export interface RiskEvent {
    id: string;
    type: string;
    severity: RiskLevel;
    description: string;
    occurredAt: string;
    resolvedAt?: string;
    resolution?: string;
}

export interface MitigationStrategy {
    id: string;
    riskType: string;
    strategy: string;
    implementation: string;
    effectiveness: 'high' | 'medium' | 'low';
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// PROJECTS
// ============================================================================

export interface Project {
    id: string;
    clientId: string;
    name: string;
    code: string;
    status: ProjectStatus;
    type: ProjectType;
    description?: string;
    address?: Address;
    stage: LifecycleStage;
    stageHistory: StageTransition[];
    startDate: string;
    targetEndDate?: string;
    actualEndDate?: string;
    scope: ProjectScope;
    scopeHistory: ScopeChange[];
    designArtifacts: DesignArtifact[];
    currentDesignVersion: number;
    designApprovals: DesignApproval[];
    quotes: ProjectQuote[];
    invoices: ProjectInvoice[];
    payments: PaymentRecord[];
    budget: ProjectBudget;
    team: ProjectTeam;
    clientContacts: string[];
    schedule: ProjectSchedule;
    milestones: Milestone[];
    orders: PurchaseOrder[];
    supplierAssignments: SupplierAssignment[];
    installations: InstallationRecord[];
    documents: DocumentAsset[];
    communicationLog: CommunicationLog[];
    tags: string[];
    notes: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface ProjectScope {
    rooms: RoomScope[];
    services: ServiceScope[];
    deliverables: Deliverable[];
    exclusions: string[];
    assumptions: string[];
    constraints: string[];
    totalArea: number;
    areaUnit: 'sqm' | 'sqft';
}

export interface RoomScope {
    roomId: string;
    roomName: string;
    roomType: RoomType;
    area: number;
    targetBudget?: number;
    designLevel: 'standard' | 'premium' | 'luxury';
    priority: number;
    requirements: string[];
    finishLevel: 'basic' | 'standard' | 'premium' | 'luxury';
}

export interface ServiceScope {
    service: string;
    description: string;
    included: boolean;
    optional: boolean;
    estimatedHours?: number;
    requiredQualifications?: string[];
}

export interface Deliverable {
    id: string;
    name: string;
    description: string;
    type: DesignArtifactType;
    format: string;
    dueDate?: string;
    deliveredAt?: string;
    status: 'pending' | 'in_progress' | 'delivered' | 'approved';
}

export interface ScopeChange {
    id: string;
    type: 'addition' | 'removal' | 'modification';
    description: string;
    impact: 'cost' | 'timeline' | 'scope';
    impactValue: number;
    approvedBy?: string;
    approvedAt?: string;
    createdAt: string;
}

export interface ProjectBudget {
    total: number;
    currency: string;
    breakdown: BudgetCategory[];
    contingency: number;
    contingencyUsed: number;
    contingencyRemaining: number;
    approvedVariations: BudgetVariation[];
    actualSpend: number;
}

export interface BudgetCategory {
    category: string;
    allocated: number;
    spent: number;
    committed: number;
    remaining: number;
}

export interface BudgetVariation {
    id: string;
    description: string;
    amount: number;
    approvedBy: string;
    approvedAt: string;
}

export interface ProjectTeam {
    projectManager?: TeamMember;
    leadDesigner?: TeamMember;
    designers: TeamMember[];
    contractors: TeamMember[];
    consultants: TeamMember[];
}

export interface TeamMember {
    userId: string;
    name: string;
    role: string;
    email: string;
    phone?: string;
    hourlyRate?: number;
    assignedAt: string;
}

export interface ProjectSchedule {
    startDate: string;
    targetEndDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    phases: SchedulePhase[];
    criticalPath: string[];
}

export interface SchedulePhase {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'delayed';
    dependencies: string[];
    deliverables: string[];
}

export interface Milestone {
    id: string;
    name: string;
    description?: string;
    targetDate: string;
    actualDate?: string;
    status: 'pending' | 'achieved' | 'missed' | 'delayed';
    dependencies: string[];
    deliverables: string[];
}

export interface PurchaseOrder {
    id: string;
    supplierId: string;
    supplierName: string;
    orderNumber: string;
    items: OrderItem[];
    totalAmount: number;
    currency: string;
    status: 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: string;
    expectedDelivery?: string;
    actualDelivery?: string;
    trackingNumber?: string;
}

export interface OrderItem {
    itemId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications?: string;
}

export interface SupplierAssignment {
    supplierId: string;
    supplierName: string;
    category: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    assignedAt: string;
}

export interface InstallationRecord {
    id: string;
    type: string;
    scheduledDate: string;
    startTime?: string;
    endTime?: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
    team: TeamMember[];
    location: string;
    notes?: string;
}

export interface CommunicationLog {
    id: string;
    channel: Channel;
    direction: 'inbound' | 'outbound';
    timestamp: string;
    summary: string;
    sentiment: SentimentScore;
    aiAnalyzed: boolean;
    linkedToProject: boolean;
    participants: string[];
}

export interface ProjectQuote {
    id: string;
    version: number;
    quoteNumber: string;
    status: QuoteStatus;
    amount: number;
    currency: string;
    createdAt: string;
    sentAt?: string;
    approvedAt?: string;
}

export interface ProjectInvoice {
    id: string;
    invoiceNumber: string;
    status: InvoiceStatus;
    amount: number;
    currency: string;
    issueDate: string;
    dueDate: string;
    paidAt?: string;
}

// ============================================================================
// CANONICAL CLIENT 360 PROFILE
// ============================================================================

export interface Client360Profile {
    identity: Identity;
    relationship: Relationship;
    preferences: Preferences;
    communicationDNA: CommunicationDNA;
    financial: FinancialProfile;
    assets: ClientAssets;
    risk: RiskProfile;
    projects: ProjectSummary[];
    activeProjectIds: string[];
    completedProjectIds: string[];
    communicationHistory: CommunicationSummary[];
    aiInsights: AIInsights;
    microPlaybook: MicroPlaybook;
    autoSettings: ClientAutoSettings;
    profileVersion: number;
    lastUpdatedAt: string;
    derivedFromEventCount: number;
}

export interface ProjectSummary {
    id: string;
    name: string;
    code: string;
    status: ProjectStatus;
    stage: LifecycleStage;
    startDate: string;
    endDate?: string;
    totalValue: number;
    currency: string;
}

export interface CommunicationSummary {
    id: string;
    channel: Channel;
    direction: 'inbound' | 'outbound';
    timestamp: string;
    summary: string;
    sentiment: SentimentScore;
    aiClassified: boolean;
    classification?: string;
    intent?: string;
}

export interface AIInsights {
    nextBestActions: NextBestAction[];
    opportunities: Opportunity[];
    risks: AIDetectedRisk[];
    predictions: Prediction[];
    patterns: PatternInsight[];
    lastAnalysisAt: string;
}

export interface NextBestAction {
    id: string;
    type: string;
    priority: number;
    description: string;
    rationale: string;
    expectedOutcome: string;
    confidence: number;
    applicableUntil?: string;
    triggeredBy?: string;
}

export interface Opportunity {
    id: string;
    type: 'upsell' | 'referral' | 'repeat_business' | 'testimonial' | 'partnership';
    description: string;
    value?: number;
    probability: number;
    recommendedTiming: string;
    createdAt: string;
}

export interface AIDetectedRisk {
    id: string;
    type: string;
    severity: RiskLevel;
    description: string;
    indicators: string[];
    recommendedAction: string;
    detectedAt: string;
}

export interface Prediction {
    id: string;
    type: 'churn' | 'conversion' | 'budget' | 'timeline' | 'sentiment';
    prediction: string;
    probability: number;
    confidence: number;
    factors: string[];
    predictedAt: string;
}

export interface PatternInsight {
    id: string;
    type: string;
    description: string;
    frequency: number;
    firstObserved: string;
    lastObserved: string;
    significance: 'low' | 'medium' | 'high';
}

// ============================================================================
// MICRO-PLAYBOOK
// ============================================================================

export interface MicroPlaybook {
    id: string;
    clientId: string;
    version: number;
    communicationStrategy: CommunicationStrategy;
    engagementTactics: EngagementTactics;
    recommendedActions: RecommendedAction[];
    contentRecommendations: ContentRecommendation[];
    timingOptimizations: TimingOptimization[];
    customRules: CustomPlaybookRule[];
    effectivenessMetrics: EffectivenessMetrics;
    lastLearningAt: string;
    adaptationNotes: string[];
}

export interface CommunicationStrategy {
    overallApproach: string;
    preferredTone: CommunicationTone;
    keyMessages: string[];
    topicsToAvoid: string[];
    sensitiveTopics: SensitiveTopic[];
}

export interface SensitiveTopic {
    topic: string;
    handlingGuidance: string;
    escalationRequired: boolean;
}

export interface EngagementTactics {
    touchpointFrequency: 'minimal' | 'moderate' | 'frequent';
    channelPreferences: ChannelPreference[];
    contentTypes: string[];
    personalizationLevel: 'generic' | 'personalized' | 'highly_personalized';
}

export interface ChannelPreference {
    channel: Channel;
    priority: number;
    optimalTime?: string;
    doNotUse?: boolean;
}

export interface RecommendedAction {
    id: string;
    action: string;
    description: string;
    priority: number;
    reason: string;
    suggestedTiming?: string;
    assignedTo?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'skipped';
    completedAt?: string;
}

export interface ContentRecommendation {
    id: string;
    type: 'portfolio' | 'article' | 'case_study' | 'tip' | 'promotion';
    contentId?: string;
    title: string;
    description: string;
    relevanceScore: number;
    suggestedTiming?: string;
}

export interface TimingOptimization {
    id: string;
    context: string;
    optimalTime: string;
    optimalDay: string;
    rationale: string;
    confidence: number;
}

export interface CustomPlaybookRule {
    id: string;
    trigger: string;
    action: string;
    conditions: string[];
    createdBy: 'ai' | 'human';
    createdAt: string;
}

export interface EffectivenessMetrics {
    actionCompletionRate: number;
    responseRate: number;
    sentimentImprovement: number;
    conversionRate?: number;
    lastCalculatedAt: string;
}

// ============================================================================
// AUTO-SETTINGS
// ============================================================================

export interface ClientAutoSettings {
    notifications: AutoNotificationSettings;
    communication: AutoCommunicationSettings;
    workflow: AutoWorkflowSettings;
    risk: AutoRiskSettings;
    ai: AutoAISettings;
    overrides: SettingOverride[];
    lastOptimizedAt: string;
    optimizationSource: 'historical' | 'ai_recommendation' | 'manual';
}

export interface AutoNotificationSettings {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
    milestoneAlerts: boolean;
    riskAlerts: boolean;
    financialAlerts: boolean;
    designUpdates: boolean;
}

export interface AutoCommunicationSettings {
    autoReply: boolean;
    autoReplyConfidenceThreshold: number;
    autoReplyMaxRiskLevel: RiskLevel;
    aiDraftReply: boolean;
    sentimentBasedTone: boolean;
    preferredResponseLength: ResponseLength;
    autoFollowUp: boolean;
    followUpDelayHours: number;
}

export interface AutoWorkflowSettings {
    autoGenerateQuote: boolean;
    autoGenerateDesign: boolean;
    autoScheduleMeetings: boolean;
    autoApproveLowRisk: boolean;
    autoInvoiceOnApproval: boolean;
}

export interface AutoRiskSettings {
    autoFlagHighRisk: boolean;
    autoEscalateCritical: boolean;
    proactiveRiskMitigation: boolean;
}

export interface AutoAISettings {
    modelPreference: 'openai' | 'gemini' | 'auto';
    reasoningLevel: 'fast' | 'standard' | 'deep';
    maxTokensPerResponse: number;
    includeCitations: boolean;
}

export interface SettingOverride {
    setting: string;
    originalValue: unknown;
    overriddenValue: unknown;
    overriddenBy: string;
    overriddenAt: string;
    reason?: string;
}

// ============================================================================
// IMMUTABLE EVENT LOG
// ============================================================================

export interface EventLogEntry {
    id: string;
    timestamp: string;
    clientId: string;
    projectId?: string;
    type: EventType;
    category: EventCategory;
    source: EventSource;
    actor: Actor;
    payload: EventPayload;
    aiAnalysis?: AIEventAnalysis;
    correlationId?: string;
    causationId?: string;
    previousEventId?: string;
    gdprConsent?: boolean;
    dataRetentionExpiry?: string;
}

export interface Actor {
    type: 'human' | 'ai_agent' | 'system' | 'webhook';
    id: string;
    name: string;
    role?: string;
}

export interface EventPayload {
    _eventType: EventType;
    _version: string;
    [key: string]: unknown;
}

export interface AIEventAnalysis {
    sentiment: SentimentScore;
    sentimentConfidence: number;
    intent?: string;
    intentConfidence: number;
    urgency: UrgencyLevel;
    topicClassification?: string[];
    entities?: ExtractedEntity[];
    summary?: string;
    language?: string;
    isSpam?: boolean;
}

export interface ExtractedEntity {
    type: 'person' | 'organization' | 'location' | 'date' | 'money' | 'project' | 'file';
    value: string;
    confidence: number;
    position: { start: number; end: number };
}

// ============================================================================
// QUOTES & PROPOSALS
// ============================================================================

export interface Quote {
    id: string;
    clientId: string;
    projectId: string;
    version: number;
    quoteNumber: string;
    status: QuoteStatus;
    title: string;
    executiveSummary: string;
    scopeOfWork: ScopeOfWork;
    lineItems: LineItem[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    discount: Discount;
    total: number;
    currency: string;
    validityPeriod: number;
    paymentTerms: PaymentTerms;
    assumptions: string[];
    exclusions: string[];
    tiers?: QuoteTier[];
    pdfUrl?: string;
    pdfGeneratedAt?: string;
    approvedBy?: string;
    approvedAt?: string;
    signatureUrl?: string;
    createdAt: string;
    sentAt?: string;
    viewedAt?: string;
    expiresAt?: string;
    riskScore?: number;
    aiRecommendations?: string[];
}

export interface ScopeOfWork {
    description: string;
    phases: WorkPhase[];
    deliverables: Deliverable[];
}

export interface WorkPhase {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface LineItem {
    id: string;
    category: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    markup?: number;
    notes?: string;
    specifications?: string;
}

export interface Discount {
    type: 'percentage' | 'fixed';
    value: number;
    reason?: string;
    approvedBy?: string;
}

export interface PaymentTerms {
    deposit: number;
    depositPercent?: number;
    milestonePayments: MilestonePayment[];
    balanceDue: number;
    paymentMethods: string[];
}

export interface MilestonePayment {
    id: string;
    name: string;
    trigger: string;
    percent: number;
    amount: number;
    dueDate?: string;
}

export interface QuoteTier {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    recommended: boolean;
}

// ============================================================================
// INVOICES
// ============================================================================

export interface Invoice {
    id: string;
    clientId: string;
    projectId: string;
    invoiceNumber: string;
    status: InvoiceStatus;
    lineItems: InvoiceLineItem[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    discount?: Discount;
    total: number;
    currency: string;
    amountPaid: number;
    amountDue: number;
    issueDate: string;
    dueDate: string;
    paidAt?: string;
    paymentMethod?: string;
    paymentReference?: string;
    pdfUrl?: string;
    quoteId?: string;
    remindersSent: InvoiceReminder[];
    createdAt: string;
}

export interface InvoiceLineItem {
    id: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    phase?: string;
}

export interface InvoiceReminder {
    id: string;
    type: 'first' | 'second' | 'final' | 'overdue';
    sentAt: string;
    method: 'email' | 'sms';
}

// ============================================================================
// SUPPLIERS
// ============================================================================

export interface Supplier {
    id: string;
    name: string;
    code: string;
    type: SupplierType;
    primaryContact: SupplierContact;
    contacts: SupplierContact[];
    address: Address;
    website?: string;
    taxId?: string;
    paymentTerms?: string;
    categories: string[];
    brands: string[];
    rating: number;
    onTimeDelivery: number;
    qualityScore: number;
    communicationScore: number;
    responseTime: number;
    performanceHistory: PerformanceRecord[];
    priceList?: string;
    defaultDiscount?: number;
    status: 'active' | 'inactive' | 'preferred' | 'blocked';
    documents: DocumentAsset[];
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface SupplierContact {
    name: string;
    role: string;
    email: string;
    phone: string;
    isPrimary: boolean;
}

export interface PerformanceRecord {
    id: string;
    projectId: string;
    category: string;
    date: string;
    onTimeDelivery: boolean;
    qualityRating: number;
    communicationRating: number;
    issue?: string;
    resolution?: string;
}

// ============================================================================
// SKILL REGISTRY
// ============================================================================

export interface SkillRegistry {
    skills: Skill[];
    categories: SkillCategory[];
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    category: string;
    version: string;
    status: 'active' | 'deprecated' | 'beta';
    invocation: SkillInvocation;
    inputSchema: string;
    outputSchema: string;
    modelRequirements?: ModelRequirement;
    riskLevel: RiskLevel;
    requiresApproval: boolean;
    approvalLevel?: 'human' | 'ai';
    author: string;
    createdAt: string;
    updatedAt: string;
    usageCount: number;
    successRate: number;
}

export interface SkillInvocation {
    type: 'function' | 'agent' | 'workflow';
    name: string;
    parameters?: Record<string, unknown>;
}

export interface ModelRequirement {
    provider: 'openai' | 'gemini' | 'auto';
    model?: string;
    minVersion?: string;
    reasoningRequired: boolean;
    thinkingLevel?: 'fast' | 'standard' | 'high';
}

export interface SkillCategory {
    id: string;
    name: string;
    description: string;
    icon?: string;
    skills: string[];
}

// ============================================================================// AI ORCHESTRATION
// ============================================================================

export interface ModelRouterConfig {
    defaultProvider: 'openai' | 'gemini' | 'auto';
    taskRouting: TaskRoutingRule[];
    costOptimization: CostOptimizationConfig;
    fallbackProvider: 'openai' | 'gemini';
    fallbackEnabled: boolean;
}

export interface TaskRoutingRule {
    task: string;
    provider: 'openai' | 'gemini' | 'auto';
    model?: string;
    reasoningLevel?: 'fast' | 'standard' | 'high';
    conditions?: RoutingCondition[];
}

export interface RoutingCondition {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: unknown;
}

export interface CostOptimizationConfig {
    maxCostPerRequest: number;
    budgetLimit: number;
    budgetPeriod: 'daily' | 'weekly' | 'monthly';
    autoDowngrade: boolean;
    downgradeThreshold: number;
}

// ============================================================================
// POLICY & GOVERNANCE
// ============================================================================

export interface PolicyEngine {
    policies: Policy[];
    riskGates: RiskGate[];
    complianceRules: ComplianceRule[];
}

export interface Policy {
    id: string;
    name: string;
    description: string;
    category: string;
    priority: number;
    enabled: boolean;
    conditions: PolicyCondition[];
    actions: PolicyAction[];
    appliesTo: ('client' | 'project' | 'quote' | 'invoice' | 'supplier' | 'system')[];
    riskThreshold: RiskLevel;
    requiresHumanApproval: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface PolicyCondition {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in';
    value: unknown;
    logic: 'AND' | 'OR';
}

export interface PolicyAction {
    type: 'allow' | 'deny' | 'flag' | 'notify' | 'escalate' | 'log';
    parameters?: Record<string, unknown>;
}

export interface RiskGate {
    id: string;
    name: string;
    description: string;
    category: string;
    triggerEvent: EventType | 'any';
    conditions: RiskGateCondition[];
    riskFactors: RiskFactorDefinition[];
    threshold: number;
    onPass: GateAction[];
    onFail: GateAction[];
    enabled: boolean;
    lastTriggered?: string;
    passRate: number;
}

export interface RiskGateCondition {
    field: string;
    operator: string;
    value: unknown;
}

export interface RiskFactorDefinition {
    name: string;
    weight: number;
    calculation: string;
}

export interface GateAction {
    type: string;
    parameters?: Record<string, unknown>;
}

export interface ComplianceRule {
    id: string;
    name: string;
    description: string;
    regulation: string;
    category: string;
    requirements: string[];
    enforcement: 'strict' | 'advisory';
    checks: ComplianceCheck[];
}

export interface ComplianceCheck {
    id: string;
    name: string;
    description: string;
    checkType: 'automated' | 'manual' | 'hybrid';
    frequency: 'realtime' | 'daily' | 'weekly' | 'monthly';
    lastCheck?: string;
    status: 'pass' | 'fail' | 'warning' | 'pending';
}

// ============================================================================
// MARKETING
// ============================================================================

export interface MarketingCampaign {
    id: string;
    name: string;
    type: CampaignType;
    status: CampaignStatus;
    targetAudience: TargetAudience;
    clientIds?: string[];
    channels: MarketingChannel[];
    content: CampaignContent[];
    scheduledStart: string;
    scheduledEnd?: string;
    actualStart?: string;
    actualEnd?: string;
    budget?: number;
    spent?: number;
    metrics: CampaignMetrics;
    createdAt: string;
    createdBy: string;
}

export interface TargetAudience {
    segment?: string;
    criteria: AudienceCriteria[];
}

export interface AudienceCriteria {
    field: string;
    operator: string;
    value: unknown;
}

export interface CampaignContent {
    channel: MarketingChannel;
    content: string;
    subject?: string;
    mediaUrls?: string[];
}

export interface CampaignMetrics {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue?: number;
    unsubscribes: number;
    bounces: number;
    opens?: number;
    engagement: number;
}

// ============================================================================
// VOICE & iOS/visionOS
// ============================================================================

export interface VoiceSession {
    id: string;
    clientId?: string;
    userId: string;
    deviceType: 'ios' | 'vision_os' | 'android' | 'web';
    startTime: string;
    endTime?: string;
    duration?: number;
    transcript: VoiceTranscriptEntry[];
    recognizedIntents: RecognizedIntent[];
    actions: VoiceAction[];
    status: 'active' | 'completed' | 'abandoned';
    terminationReason?: string;
}

export interface VoiceTranscriptEntry {
    timestamp: string;
    speaker: 'user' | 'assistant';
    text: string;
    confidence: number;
}

export interface RecognizedIntent {
    name: string;
    confidence: number;
    entities: Record<string, string>;
}

export interface VoiceAction {
    id: string;
    type: string;
    description: string;
    result?: string;
    timestamp: string;
}

// ============================================================================
// ONYXHYDRA QA SYSTEM
// ============================================================================

export interface QAEngine {
    gates: QAGate[];
    lastRun: QARun | null;
    health: QAHealth;
}

export interface QAGate {
    id: string;
    name: string;
    description: string;
    category: 'lint' | 'type' | 'test' | 'build' | 'api' | 'security' | 'compliance';
    status: 'active' | 'disabled' | 'broken';
    command?: string;
    endpoint?: string;
    script?: string;
    timeout: number;
    retries: number;
    criticality: 'critical' | 'high' | 'medium' | 'low';
    lastRun?: string;
    lastResult?: 'pass' | 'fail' | 'error';
    lastDuration?: number;
    successRate: number;
    averageDuration: number;
}

export interface QARun {
    id: string;
    startedAt: string;
    completedAt: string;
    gates: QAGateResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
        errors: number;
        duration: number;
    };
}

export interface QAGateResult {
    gateId: string;
    gateName: string;
    status: 'pass' | 'fail' | 'error' | 'skipped';
    duration: number;
    output?: string;
    error?: string;
    artifacts?: QAArtifact[];
}

export interface QAArtifact {
    type: 'log' | 'screenshot' | 'report' | 'trace';
    url: string;
    description: string;
}

export interface QAHealth {
    overall: 'healthy' | 'degraded' | 'unhealthy';
    gates: Record<string, 'healthy' | 'degraded' | 'unhealthy'>;
    lastCheck: string;
}

// ============================================================================
// FLOORPLAN ARTIFACTS
// ============================================================================

export interface FloorplanArtifact {
    id: string;
    clientId: string;
    projectId: string;
    name: string;
    version: number;
    floorplan2D: Floorplan2D;
    floorplan3D?: Floorplan3D;
    rooms: ParsedRoom[];
    totalArea: number;
    areaUnit: 'sqm' | 'sqft';
    roomCount: number;
    source: 'uploaded' | 'drawn' | 'imported';
    createdAt: string;
    updatedAt: string;
}

export interface Floorplan2D {
    width: number;
    height: number;
    unit: 'px' | 'm' | 'ft';
    scale: number;
    imageUrl?: string;
    svgData?: string;
    elements: FloorplanElement[];
}

export interface FloorplanElement {
    id: string;
    type: 'wall' | 'door' | 'window' | 'room' | 'furniture' | 'dimension';
    points: { x: number; y: number }[];
    properties: Record<string, unknown>;
}

export interface Floorplan3D {
    modelUrl?: string;
    thumbnailUrl?: string;
    settings: Floorplan3DSettings;
    rooms: Room3D[];
}

export interface Floorplan3DSettings {
    cameraPosition?: { x: number; y: number; z: number };
    lighting?: string;
    materials?: string;
}

export interface Room3D {
    roomId: string;
    meshData?: string;
    furniture: FurnitureItem3D[];
}

export interface FurnitureItem3D {
    id: string;
    name: string;
    modelUrl?: string;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
}

export interface ParsedRoom {
    id: string;
    name: string;
    type: RoomType;
    area: number;
    perimeter?: number;
    dimensions?: { width: number; length: number };
    windows: number;
    doors: number;
    features: string[];
    confidence: number;
}

// ============================================================================
// ACTION CARDS (for dashboard)
// ============================================================================

export interface ActionCard {
    id: string;
    title: string;
    description: string;
    risk: RiskLevel;
    confidence: number;
    link: string;
    category: ActionCategory;
    priority: number;
    dueAt?: string;
    assignedTo?: string;
    aiGenerated: boolean;
    relatedEvents: string[];
}


