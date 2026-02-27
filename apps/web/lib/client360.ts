/**
 * StudioOS Client 360 Profile Service
 * 
 * Derives the canonical Client 360 Profile from immutable EventLog entries.
 * This is the definitive source for all client data.
 * 
 * @version 1.0.0
 */

import {
    Client360Profile,
    Identity,
    Relationship,
    Preferences,
    CommunicationDNA,
    FinancialProfile,
    ClientAssets,
    RiskProfile,
    ProjectSummary,
    CommunicationSummary,
    BudgetRange,
    AIInsights,
    MicroPlaybook,
    ClientAutoSettings,
    EventLogEntry,
    EventType,
    SentimentScore,
    LifecycleStage,
    LIFECYCLE_STAGE_ORDER,
} from './canonicalDataContracts';
import { eventLog } from './eventLog';

/**
 * Client360 Service
 * Provides the canonical client profile derived from EventLog
 */
export class Client360Service {
    /**
     * Derive complete Client 360 Profile from EventLog
     */
    async deriveProfile(clientId: string): Promise<Client360Profile> {
        const events = await eventLog.getClientEvents(clientId, { limit: 10000 });
        const eventCount = events.length;

        if (eventCount === 0) {
            return this.createEmptyProfile(clientId);
        }

        // Derive each component from events
        const identity = this.deriveIdentity(events);
        const relationship = this.deriveRelationship(events);
        const preferences = this.derivePreferences(events);
        const communicationDNA = this.deriveCommunicationDNA(events);
        const financial = this.deriveFinancial(events);
        const assets = this.deriveAssets(events);
        const risk = this.deriveRisk(events);
        const projects = this.deriveProjects(events);
        const communications = this.deriveCommunications(events);
        const insights = this.deriveInsights(events, communications);
        const playbook = this.derivePlaybook(events, insights);
        const autoSettings = this.deriveAutoSettings(events, playbook);

        return {
            identity,
            relationship,
            preferences,
            communicationDNA,
            financial,
            assets,
            risk,
            projects,
            activeProjectIds: projects.filter(p => p.status === 'active').map(p => p.id),
            completedProjectIds: projects.filter(p => p.status === 'completed').map(p => p.id),
            communicationHistory: communications,
            aiInsights: insights,
            microPlaybook: playbook,
            autoSettings,
            profileVersion: 1,
            lastUpdatedAt: new Date().toISOString(),
            derivedFromEventCount: eventCount,
        };
    }

    /**
     * Derive identity from events
     */
    private deriveIdentity(events: EventLogEntry[]): Identity {
        const createEvents = events.filter(e => e.type === 'CLIENT_CREATED');
        const latestCreate = createEvents[createEvents.length - 1];

        const payload = latestCreate?.payload as {
            names?: string[];
            emails?: Array<{ email: string; isPrimary: boolean }>;
            phones?: Array<{ phone: string; isPrimary: boolean }>;
            addresses?: Array<{ street: string; city: string; postalCode: string; country: string; isPrimary: boolean }>;
            preferredLanguage?: string;
            timezone?: string;
            avatarUrl?: string;
            company?: string;
        } || {};

        return {
            id: latestCreate?.clientId || '',
            clientId: latestCreate?.clientId || '',
            names: payload.names || [],
            emails: (payload.emails || []).map(e => ({
                email: e.email,
                isPrimary: e.isPrimary,
                isVerified: false,
                notificationsEnabled: true,
            })),
            phones: (payload.phones || []).map(p => ({
                phone: p.phone,
                isPrimary: p.isPrimary,
                isWhatsApp: false,
                isVerified: false,
                countryCode: '',
            })),
            addresses: (payload.addresses || []).map(a => ({
                street: a.street,
                city: a.city,
                state: '',
                postalCode: a.postalCode,
                country: a.country,
                isPrimary: a.isPrimary,
                addressType: 'residential',
            })),
            preferredLanguage: (payload.preferredLanguage as 'en' | 'mt' | 'es' | 'it' | 'fr' | 'de') || 'en',
            timezone: payload.timezone || 'Europe/Madrid',
            avatarUrl: payload.avatarUrl,
            company: payload.company,
            createdAt: latestCreate?.timestamp || new Date().toISOString(),
            updatedAt: events[0]?.timestamp || new Date().toISOString(),
        };
    }

    /**
     * Derive relationship from events
     */
    private deriveRelationship(events: EventLogEntry[]): Relationship {
        const stageEvents = events.filter(e => e.type === 'CLIENT_STAGE_CHANGED');
        const stageHistory = stageEvents.map(e => {
            const payload = e.payload as { previousStage?: LifecycleStage; newStage?: LifecycleStage; reason?: string };
            return {
                fromStage: payload.previousStage || null,
                toStage: payload.newStage || 'S0_INTAKE',
                timestamp: e.timestamp,
                triggeredBy: 'manual' as const,
                reason: payload.reason,
            };
        });

        const currentStage = stageHistory.length > 0
            ? stageHistory[stageHistory.length - 1].toStage
            : 'S0_INTAKE';

        const sentimentEvents = events.filter(e =>
            e.type === 'AI_SENTIMENT_ANALYSIS_COMPLETE' ||
            e.category === 'communication'
        );

        const sentimentHistory = sentimentEvents.map(e => ({
            timestamp: e.timestamp,
            score: (e.aiAnalysis?.sentiment as SentimentScore) || 0,
            source: 'ai_analysis' as const,
        }));

        // Calculate lead score based on engagement
        const engagementScore = this.calculateEngagementScore(events);

        return {
            stage: currentStage,
            stageHistory,
            leadScore: engagementScore,
            leadScoreHistory: events
                .filter(e => e.type === 'AI_CLASSIFICATION_COMPLETE')
                .map(e => ({
                    timestamp: e.timestamp,
                    score: (e.payload as { leadScore?: number }).leadScore || 50,
                })),
            sentimentCurrent: sentimentHistory.length > 0
                ? (sentimentHistory[sentimentHistory.length - 1].score as SentimentScore)
                : 0 as SentimentScore,
            sentimentHistory: sentimentHistory.slice(-10),
            sla: {
                replyWithinHours: 24,
            },
            createdAt: events.find(e => e.type === 'CLIENT_CREATED')?.timestamp || new Date().toISOString(),
            lastContactAt: events
                .filter(e => e.category === 'communication' && e.source !== 'ai_agent')
                .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0]?.timestamp,
        };
    }

    /**
     * Derive preferences from events
     */
    private derivePreferences(events: EventLogEntry[]): Preferences {
        const preferenceEvents = events.filter(e =>
            e.type === 'CLIENT_PREFERENCE_CHANGED' ||
            e.type === 'CLIENT_CREATED'
        );

        const latestPrefs = preferenceEvents[preferenceEvents.length - 1]?.payload as {
            styleTags?: string[];
            materialsPreferred?: string[];
            materialsAvoid?: string[];
            brandsPreferred?: string[];
            colorsPreferred?: string[];
            budgetRange?: { min: number; max: number; currency: string };
        } || {};

        // Extract style tags from design events
        const designEvents = events.filter(e =>
            e.type === 'DESIGN_CONCEPT_GENERATED' ||
            e.type === 'DESIGN_ASSET_CREATED'
        );

        const inferredStyles = new Set<string>();
        designEvents.forEach(e => {
            const style = (e.payload as { style?: string }).style;
            if (style) inferredStyles.add(style);
        });

        return {
            styleTags: Array.from(inferredStyles),
            styleConfidence: {},
            materialsPreferred: latestPrefs.materialsPreferred || [],
            materialsAvoid: latestPrefs.materialsAvoid || [],
            brandsPreferred: latestPrefs.brandsPreferred || [],
            brandsAvoid: [],
            colorsPreferred: latestPrefs.colorsPreferred || [],
            colorsAvoid: [],
            tonePreference: 'warm_formal',
            responseLengthPreference: 'medium',
            communicationPreferences: [],
            budgetRange: (latestPrefs.budgetRange as BudgetRange) || {
                min: 0,
                max: 100000,
                currency: 'EUR',
                isFlexible: true,
                includesContingency: true,
                contingencyPercent: 15,
            },
            timelinePreference: {
                flexibility: 'flexible',
                urgency: 'normal',
            },
            lifestyleRequirements: [],
            accessibilityRequirements: [],
            sustainabilityPriority: 'medium',
            updatedAt: events[0]?.timestamp || new Date().toISOString(),
        };
    }

    /**
     * Derive communication DNA from events
     */
    private deriveCommunicationDNA(events: EventLogEntry[]): CommunicationDNA {
        const commEvents = events.filter(e => e.category === 'communication');

        // Calculate response times
        const responseTimes: number[] = [];
        const sentEvents = commEvents.filter(e => e.type === 'EMAIL_SENT' || e.type === 'WHATSAPP_SENT');
        const receivedEvents = commEvents.filter(e =>
            e.type === 'EMAIL_RECEIVED' || e.type === 'WHATSAPP_RECEIVED'
        );

        // Match sent to received
        sentEvents.forEach(sent => {
            const afterReceived = receivedEvents.find(r => r.timestamp > sent.timestamp);
            if (afterReceived) {
                const diff = new Date(afterReceived.timestamp).getTime() - new Date(sent.timestamp).getTime();
                responseTimes.push(diff / (1000 * 60 * 60)); // hours
            }
        });

        const medianResponse = responseTimes.length > 0
            ? responseTimes.sort((a, b) => a - b)[Math.floor(responseTimes.length / 2)]
            : 24;

        // Analyze sentiment trends
        const sentiments = commEvents
            .filter(e => e.aiAnalysis?.sentiment !== undefined)
            .map(e => e.aiAnalysis!.sentiment);

        const avgFormality = 0.3; // Placeholder - would analyze actual communication

        return {
            inferredLength: medianResponse < 12 ? 'short' : medianResponse < 48 ? 'medium' : 'long',
            inferredFormality: avgFormality > 0.5 ? 'formal' : avgFormality > 0 ? 'warm_formal' : 'casual',
            responsePattern: {
                medianHours: medianResponse,
                fastestResponseHours: Math.min(...responseTimes, 1),
                slowestResponseHours: Math.max(...responseTimes, 72),
                typicalResponseTimeDistribution: [],
                responseRate: sentEvents.length > 0 ? receivedEvents.length / sentEvents.length : 1,
            },
            engagementPattern: {
                mostActiveDayOfWeek: 'Tuesday',
                mostActiveTimeOfDay: '10:00',
                preferredMeetingTimes: [],
                meetingDuration: 60,
                prefersWrittenOverCalls: true,
                checkInFrequencyPreferred: 'weekly',
            },
            decisionMakingStyle: {
                speed: 'moderate',
                informationNeed: 'moderate',
                approvalNeeded: true,
                typicalApprovalCycleDays: 7,
                preferOptionsCount: 3,
            },
            communicationStyleAnalysis: {
                formality: avgFormality,
                warmth: 0.2,
                directness: 0.4,
                verbosity: 0,
                emojiUsage: 'sparse',
                greetingStyle: 'Hello',
                signOffStyle: 'Best regards',
            },
            lastAnalyzedAt: new Date().toISOString(),
        };
    }

    /**
     * Derive financial profile from events
     */
    private deriveFinancial(events: EventLogEntry[]): FinancialProfile {
        const quotes = events
            .filter(e => e.type === 'QUOTE_DRAFTED' || e.type === 'QUOTE_SENT' || e.type === 'QUOTE_APPROVED')
            .map(e => {
                const p = e.payload as { quoteId?: string; projectId?: string; projectName?: string; amount?: number; currency?: string; version?: number; status?: string };
                return {
                    id: p.quoteId || e.id,
                    projectId: p.projectId || '',
                    projectName: p.projectName || '',
                    amount: p.amount || 0,
                    currency: p.currency || 'EUR',
                    version: p.version || 1,
                    status: (p.status as any) || 'draft',
                    createdAt: e.timestamp,
                    sentAt: e.type === 'QUOTE_SENT' ? e.timestamp : undefined,
                    approvedAt: e.type === 'QUOTE_APPROVED' ? e.timestamp : undefined,
                };
            });

        const invoices = events
            .filter(e => e.type === 'INVOICE_GENERATED' || e.type === 'INVOICE_PAID')
            .map(e => {
                const p = e.payload as { invoiceId?: string; projectId?: string; projectName?: string; invoiceNumber?: string; amount?: number; currency?: string; status?: string; issueDate?: string; dueDate?: string };
                return {
                    id: p.invoiceId || e.id,
                    projectId: p.projectId || '',
                    projectName: p.projectName || '',
                    invoiceNumber: p.invoiceNumber || '',
                    amount: p.amount || 0,
                    currency: p.currency || 'EUR',
                    status: (p.status as any) || 'draft',
                    issueDate: p.issueDate || e.timestamp,
                    dueDate: p.dueDate || '',
                    paidAt: e.type === 'INVOICE_PAID' ? e.timestamp : undefined,
                };
            });

        const payments = events
            .filter(e => e.type === 'PAYMENT_RECEIVED')
            .map(e => {
                const p = e.payload as { invoiceId?: string; amount?: number; currency?: string; method?: string };
                return {
                    id: e.id,
                    invoiceId: p.invoiceId || '',
                    amount: p.amount || 0,
                    currency: p.currency || 'EUR',
                    method: (p.method as any) || 'bank_transfer',
                    receivedAt: e.timestamp,
                    processedAt: e.timestamp,
                };
            });

        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        const paidInvoices = invoices.filter(i => i.status === 'paid');

        return {
            quotes,
            invoices,
            payments,
            paymentBehavior: {
                onTimeRate: paidInvoices.length > 0 ? 0.85 : 1,
                earlyPaymentRate: 0.2,
                latePaymentRate: 0.15,
                averageDaysLate: 3,
                discountRequests: 0,
                discountGiven: 0,
                paymentIssues: [],
            },
            totalRevenue,
            averageDealSize: quotes.length > 0 ? totalRevenue / quotes.filter(q => q.status === 'approved').length : 0,
            currency: 'EUR',
            taxExempt: false,
            paymentTermsAgreed: 'net30',
            discountEntitlements: [],
        };
    }

    /**
     * Derive assets from events
     */
    private deriveAssets(events: EventLogEntry[]): ClientAssets {
        const assetEvents = events.filter(e =>
            e.type === 'CLIENT_ASSET_UPLOADED' ||
            e.type === 'FLOORPLAN_UPLOADED' ||
            e.type === 'DESIGN_ASSET_CREATED'
        );

        return {
            photos: assetEvents
                .filter(e => (e.payload as { type?: string }).type === 'photo')
                .map(e => this.eventToAsset(e, 'photo')),
            floorplans: assetEvents
                .filter(e => (e.payload as { type?: string }).type === 'floorplan')
                .map(e => this.eventToAsset(e, 'floorplan')) as any,
            pdfs: assetEvents
                .filter(e => (e.payload as { type?: string }).type === 'document')
                .map(e => this.eventToAsset(e, 'document')) as any,
            videos: assetEvents
                .filter(e => (e.payload as { type?: string }).type === 'video')
                .map(e => this.eventToAsset(e, 'video')),
            designs: assetEvents
                .filter(e => e.type === 'DESIGN_ASSET_CREATED')
                .map(e => this.eventToDesignArtifact(e)) as any,
            contracts: [],
            receipts: [],
            other: [],
            totalStorageUsed: 0,
        };
    }

    /**
     * Convert event to asset
     */
    private eventToAsset(e: EventLogEntry, type: any) {
        const p = e.payload as { name?: string; url?: string; mimeType?: string; size?: number };
        return {
            id: e.id,
            clientId: e.clientId,
            projectId: e.projectId,
            type,
            name: p.name || 'Untitled',
            url: p.url || '',
            mimeType: p.mimeType || 'application/octet-stream',
            size: p.size || 0,
            uploadedAt: e.timestamp,
            uploadedBy: e.actor.id,
            tags: [],
            source: e.source,
        };
    }

    /**
     * Convert event to design artifact
     */
    private eventToDesignArtifact(e: EventLogEntry) {
        const p = e.payload as {
            name?: string;
            description?: string;
            type?: string;
            version?: number;
            status?: string;
        };
        return {
            id: e.id,
            clientId: e.clientId,
            projectId: e.projectId || '',
            type: (p.type as any) || 'moodboard',
            name: p.name || 'Untitled',
            description: p.description,
            version: p.version || 1,
            status: (p.status as any) || 'draft',
            generationMethod: 'ai_generated',
            assets: [],
            metadata: {},
            approvals: [],
            feedback: [],
            createdAt: e.timestamp,
            updatedAt: e.timestamp,
            createdBy: 'ai_agent',
        };
    }

    /**
     * Derive risk profile from events
     */
    private deriveRisk(events: EventLogEntry[]): RiskProfile {
        const riskEvents = events.filter(e =>
            e.type === 'AI_RISK_DETECTED' ||
            e.type === 'SUPPLIER_DELAY_DETECTED' ||
            e.type === 'INVOICE_OVERDUE' ||
            e.type === 'CHANGE_REQUESTED'
        );

        const paymentIssues = events.filter(e => e.type === 'INVOICE_OVERDUE').length;
        const delays = events.filter(e => e.type === 'SUPPLIER_DELAY_DETECTED').length;
        const changes = events.filter(e => e.type === 'CHANGE_REQUESTED').length;

        return {
            overall: {
                level: paymentIssues > 2 || delays > 1 ? 'high' : paymentIssues > 0 || delays > 0 ? 'medium' : 'low',
                score: Math.min(100, paymentIssues * 20 + delays * 15 + changes * 10),
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            churn: {
                level: 'low',
                score: 15,
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            scopeCreep: {
                level: changes > 2 ? 'high' : changes > 0 ? 'medium' : 'low',
                score: Math.min(100, changes * 25),
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            payment: {
                level: paymentIssues > 1 ? 'high' : paymentIssues > 0 ? 'medium' : 'low',
                score: Math.min(100, paymentIssues * 35),
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            supplier: {
                level: delays > 1 ? 'high' : delays > 0 ? 'medium' : 'low',
                score: Math.min(100, delays * 40),
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            timeline: {
                level: 'low',
                score: 10,
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            quality: {
                level: 'low',
                score: 5,
                factors: [],
                lastUpdatedAt: new Date().toISOString(),
                trend: 'stable',
            },
            riskHistory: [],
            mitigationStrategies: [],
        };
    }

    /**
     * Derive projects from events
     */
    private deriveProjects(events: EventLogEntry[]): ProjectSummary[] {
        const projectEvents = events.filter(e =>
            e.type === 'PROJECT_CREATED' ||
            e.type === 'PROJECT_STATUS_CHANGED' ||
            e.type === 'PROJECT_COMPLETED'
        );

        const projectsMap = new Map<string, ProjectSummary>();

        projectEvents.forEach(e => {
            const p = e.payload as {
                projectId?: string;
                name?: string;
                code?: string;
                status?: string;
                stage?: string;
                startDate?: string;
                endDate?: string;
                totalValue?: number;
                currency?: string;
            };

            const projectId = p.projectId || e.projectId || '';
            if (!projectId) return;

            const existing = projectsMap.get(projectId);
            const stageOrder = LIFECYCLE_STAGE_ORDER[p.stage as LifecycleStage] || 0;

            if (!existing || (p.status && this.compareStatus(p.status, existing.status))) {
                projectsMap.set(projectId, {
                    id: projectId,
                    name: p.name || existing?.name || 'Untitled Project',
                    code: p.code || existing?.code || '',
                    status: (p.status as any) || existing?.status || 'lead',
                    stage: (p.stage as LifecycleStage) || existing?.stage || 'S0_INTAKE',
                    startDate: p.startDate || existing?.startDate || e.timestamp,
                    endDate: p.endDate || existing?.endDate,
                    totalValue: p.totalValue || existing?.totalValue || 0,
                    currency: p.currency || existing?.currency || 'EUR',
                });
            }
        });

        return Array.from(projectsMap.values());
    }

    /**
     * Derive communications from events
     */
    private deriveCommunications(events: EventLogEntry[]): CommunicationSummary[] {
        return events
            .filter(e => e.category === 'communication')
            .slice(0, 50)
            .map(e => ({
                id: e.id,
                channel: (e.payload as { channel?: string }).channel as any || 'email',
                direction: e.type.includes('RECEIVED') || e.type.includes('_DM_RECEIVED') ? 'inbound' : 'outbound',
                timestamp: e.timestamp,
                summary: e.aiAnalysis?.summary || e.type.replace(/_/g, ' ').toLowerCase(),
                sentiment: e.aiAnalysis?.sentiment || 0,
                aiClassified: !!e.aiAnalysis,
                classification: e.aiAnalysis?.topicClassification?.[0],
                intent: e.aiAnalysis?.intent,
            }));
    }

    /**
     * Derive AI insights from events
     */
    private deriveInsights(events: EventLogEntry[], communications: CommunicationSummary[]): AIInsights {
        const aiEvents = events.filter(e =>
            e.type.startsWith('AI_') && e.type !== 'AI_CLASSIFICATION_COMPLETE'
        );

        const nextBestActions = aiEvents
            .filter(e => e.type === 'AI_NEXT_BEST_ACTION_GENERATED')
            .map(e => {
                const p = e.payload as { actionType?: string; description?: string; priority?: number; rationale?: string; confidence?: number };
                return {
                    id: e.id,
                    type: p.actionType || 'general',
                    priority: p.priority || 5,
                    description: p.description || '',
                    rationale: p.rationale || '',
                    expectedOutcome: '',
                    confidence: p.confidence || 0.5,
                };
            });

        const opportunities = aiEvents
            .filter(e => e.type === 'AI_OPPORTUNITY_DETECTED')
            .map(e => {
                const p = e.payload as { opportunityType?: string; description?: string; value?: number; probability?: number };
                return {
                    id: e.id,
                    type: (p.opportunityType as any) || 'upsell',
                    description: p.description || '',
                    value: p.value,
                    probability: p.probability || 0.5,
                    recommendedTiming: '30 days',
                    createdAt: e.timestamp,
                };
            });

        const risks = aiEvents
            .filter(e => e.type === 'AI_RISK_DETECTED')
            .map(e => {
                const p = e.payload as { riskType?: string; severity?: string; description?: string; indicators?: string[]; recommendedAction?: string };
                return {
                    id: e.id,
                    type: p.riskType || 'general',
                    severity: (p.severity as any) || 'low',
                    description: p.description || '',
                    indicators: p.indicators || [],
                    recommendedAction: p.recommendedAction || '',
                    detectedAt: e.timestamp,
                };
            });

        return {
            nextBestActions,
            opportunities,
            risks,
            predictions: [],
            patterns: [],
            lastAnalysisAt: new Date().toISOString(),
        };
    }

    /**
     * Derive micro-playbook from events
     */
    private derivePlaybook(events: EventLogEntry[], insights: AIInsights): MicroPlaybook {
        const playbookEvents = events.filter(e => e.type === 'AI_MICRO_PLAYBOOK_UPDATED');
        const latestPlaybook = playbookEvents[playbookEvents.length - 1]?.payload as {
            communicationStrategy?: any;
            engagementTactics?: any;
            recommendedActions?: any[];
        } || {};

        return {
            id: `playbook-${events[0]?.clientId || 'unknown'}`,
            clientId: events[0]?.clientId || '',
            version: 1,
            communicationStrategy: {
                overallApproach: 'Build trust through consistent, personalized communication',
                preferredTone: 'warm_formal',
                keyMessages: ['Quality craftsmanship', 'Personalized design', 'Transparent pricing'],
                topicsToAvoid: [],
                sensitiveTopics: [],
            },
            engagementTactics: {
                touchpointFrequency: 'moderate',
                channelPreferences: [
                    { channel: 'email', priority: 1 },
                    { channel: 'whatsapp', priority: 2 },
                ],
                contentTypes: ['moodboards', 'progress_updates', 'material_options'],
                personalizationLevel: 'personalized',
            },
            recommendedActions: insights.nextBestActions.map((nba, i) => ({
                id: `action-${i}`,
                action: nba.type,
                description: nba.description,
                priority: nba.priority,
                reason: nba.rationale,
                status: 'pending',
            })),
            contentRecommendations: [],
            timingOptimizations: [],
            customRules: [],
            effectivenessMetrics: {
                actionCompletionRate: 0.7,
                responseRate: 0.85,
                sentimentImprovement: 0.1,
                lastCalculatedAt: new Date().toISOString(),
            },
            lastLearningAt: new Date().toISOString(),
            adaptationNotes: [],
        };
    }

    /**
     * Derive auto-settings from events and playbook
     */
    private deriveAutoSettings(events: EventLogEntry[], playbook: MicroPlaybook): ClientAutoSettings {
        return {
            notifications: {
                emailAlerts: true,
                smsAlerts: false,
                pushNotifications: true,
                weeklyDigest: true,
                milestoneAlerts: true,
                riskAlerts: true,
                financialAlerts: true,
                designUpdates: true,
            },
            communication: {
                autoReply: false,
                autoReplyConfidenceThreshold: 0.9,
                autoReplyMaxRiskLevel: 'low',
                aiDraftReply: true,
                sentimentBasedTone: true,
                preferredResponseLength: 'medium',
                autoFollowUp: true,
                followUpDelayHours: 48,
            },
            workflow: {
                autoGenerateQuote: true,
                autoGenerateDesign: true,
                autoScheduleMeetings: false,
                autoApproveLowRisk: true,
                autoInvoiceOnApproval: true,
            },
            risk: {
                autoFlagHighRisk: true,
                autoEscalateCritical: true,
                proactiveRiskMitigation: true,
            },
            ai: {
                modelPreference: 'auto',
                reasoningLevel: 'standard',
                maxTokensPerResponse: 2000,
                includeCitations: true,
            },
            overrides: [],
            lastOptimizedAt: new Date().toISOString(),
            optimizationSource: 'historical',
        };
    }

    /**
     * Calculate engagement score from events
     */
    private calculateEngagementScore(events: EventLogEntry[]): number {
        let score = 50; // Base score

        // Communication events boost score
        const commCount = events.filter(e => e.category === 'communication').length;
        score += Math.min(20, commCount * 2);

        // Project events boost score
        const projectEvents = events.filter(e => e.category === 'project').length;
        score += Math.min(15, projectEvents * 3);

        // Approval events boost score
        const approvals = events.filter(e =>
            e.type === 'QUOTE_APPROVED' ||
            e.type === 'DESIGN_CONCEPT_APPROVED' ||
            e.type === 'PROPOSAL_SIGNED'
        ).length;
        score += approvals * 5;

        // Overdue events reduce score
        const overdue = events.filter(e => e.type === 'INVOICE_OVERDUE').length;
        score -= overdue * 10;

        return Math.max(0, Math.min(100, score));
    }

    /**
     * Compare project status (simple version)
     */
    private compareStatus(newStatus: string, existingStatus: string): boolean {
        const order = ['lead', 'active', 'on_hold', 'completed', 'cancelled', 'archived'];
        return order.indexOf(newStatus) > order.indexOf(existingStatus);
    }

    /**
     * Create empty profile for new clients
     */
    private createEmptyProfile(clientId: string): Client360Profile {
        return {
            identity: {
                id: clientId,
                clientId,
                names: [],
                emails: [],
                phones: [],
                addresses: [],
                preferredLanguage: 'en',
                timezone: 'Europe/Madrid',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            relationship: {
                stage: 'S0_INTAKE',
                stageHistory: [],
                leadScore: 50,
                leadScoreHistory: [],
                sentimentCurrent: 0,
                sentimentHistory: [],
                sla: { replyWithinHours: 24 },
                createdAt: new Date().toISOString(),
            },
            preferences: {
                styleTags: [],
                styleConfidence: {},
                materialsPreferred: [],
                materialsAvoid: [],
                brandsPreferred: [],
                brandsAvoid: [],
                colorsPreferred: [],
                colorsAvoid: [],
                tonePreference: 'warm_formal',
                responseLengthPreference: 'medium',
                communicationPreferences: [],
                budgetRange: {
                    min: 0,
                    max: 100000,
                    currency: 'EUR',
                    isFlexible: true,
                    includesContingency: true,
                    contingencyPercent: 15,
                },
                timelinePreference: {
                    flexibility: 'flexible',
                    urgency: 'normal',
                },
                lifestyleRequirements: [],
                accessibilityRequirements: [],
                sustainabilityPriority: 'medium',
                updatedAt: new Date().toISOString(),
            },
            communicationDNA: {
                inferredLength: 'medium',
                inferredFormality: 'warm_formal',
                responsePattern: {
                    medianHours: 24,
                    fastestResponseHours: 1,
                    slowestResponseHours: 72,
                    typicalResponseTimeDistribution: [],
                    responseRate: 1,
                },
                engagementPattern: {
                    mostActiveDayOfWeek: 'Tuesday',
                    mostActiveTimeOfDay: '10:00',
                    preferredMeetingTimes: [],
                    meetingDuration: 60,
                    prefersWrittenOverCalls: true,
                    checkInFrequencyPreferred: 'weekly',
                },
                decisionMakingStyle: {
                    speed: 'moderate',
                    informationNeed: 'moderate',
                    approvalNeeded: true,
                    typicalApprovalCycleDays: 7,
                    preferOptionsCount: 3,
                },
                communicationStyleAnalysis: {
                    formality: 0,
                    warmth: 0,
                    directness: 0,
                    verbosity: 0,
                    emojiUsage: 'sparse',
                    greetingStyle: 'Hello',
                    signOffStyle: 'Best regards',
                },
                lastAnalyzedAt: new Date().toISOString(),
            },
            financial: {
                quotes: [],
                invoices: [],
                payments: [],
                paymentBehavior: {
                    onTimeRate: 1,
                    earlyPaymentRate: 0,
                    latePaymentRate: 0,
                    averageDaysLate: 0,
                    discountRequests: 0,
                    discountGiven: 0,
                    paymentIssues: [],
                },
                totalRevenue: 0,
                averageDealSize: 0,
                currency: 'EUR',
                taxExempt: false,
                paymentTermsAgreed: 'net30',
                discountEntitlements: [],
            },
            assets: {
                photos: [],
                floorplans: [],
                pdfs: [],
                videos: [],
                designs: [],
                contracts: [],
                receipts: [],
                other: [],
                totalStorageUsed: 0,
            },
            risk: {
                overall: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                churn: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                scopeCreep: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                payment: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                supplier: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                timeline: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                quality: { level: 'low', score: 0, factors: [], lastUpdatedAt: new Date().toISOString(), trend: 'stable' },
                riskHistory: [],
                mitigationStrategies: [],
            },
            projects: [],
            activeProjectIds: [],
            completedProjectIds: [],
            communicationHistory: [],
            aiInsights: {
                nextBestActions: [],
                opportunities: [],
                risks: [],
                predictions: [],
                patterns: [],
                lastAnalysisAt: new Date().toISOString(),
            },
            microPlaybook: {
                id: `playbook-${clientId}`,
                clientId,
                version: 1,
                communicationStrategy: {
                    overallApproach: 'Build trust through consistent, personalized communication',
                    preferredTone: 'warm_formal',
                    keyMessages: [],
                    topicsToAvoid: [],
                    sensitiveTopics: [],
                },
                engagementTactics: {
                    touchpointFrequency: 'moderate',
                    channelPreferences: [],
                    contentTypes: [],
                    personalizationLevel: 'personalized',
                },
                recommendedActions: [],
                contentRecommendations: [],
                timingOptimizations: [],
                customRules: [],
                effectivenessMetrics: {
                    actionCompletionRate: 0,
                    responseRate: 0,
                    sentimentImprovement: 0,
                    lastCalculatedAt: new Date().toISOString(),
                },
                lastLearningAt: new Date().toISOString(),
                adaptationNotes: [],
            },
            autoSettings: {
                notifications: {
                    emailAlerts: true,
                    smsAlerts: false,
                    pushNotifications: true,
                    weeklyDigest: true,
                    milestoneAlerts: true,
                    riskAlerts: true,
                    financialAlerts: true,
                    designUpdates: true,
                },
                communication: {
                    autoReply: false,
                    autoReplyConfidenceThreshold: 0.9,
                    autoReplyMaxRiskLevel: 'low',
                    aiDraftReply: true,
                    sentimentBasedTone: true,
                    preferredResponseLength: 'medium',
                    autoFollowUp: true,
                    followUpDelayHours: 48,
                },
                workflow: {
                    autoGenerateQuote: false,
                    autoGenerateDesign: false,
                    autoScheduleMeetings: false,
                    autoApproveLowRisk: true,
                    autoInvoiceOnApproval: true,
                },
                risk: {
                    autoFlagHighRisk: true,
                    autoEscalateCritical: true,
                    proactiveRiskMitigation: true,
                },
                ai: {
                    modelPreference: 'auto',
                    reasoningLevel: 'standard',
                    maxTokensPerResponse: 2000,
                    includeCitations: true,
                },
                overrides: [],
                lastOptimizedAt: new Date().toISOString(),
                optimizationSource: 'historical',
            },
            profileVersion: 1,
            lastUpdatedAt: new Date().toISOString(),
            derivedFromEventCount: 0,
        };
    }
}

// Singleton instance
export const client360 = new Client360Service();
