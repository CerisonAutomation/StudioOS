import { z } from 'zod';

// AI Model Types
export const AIModelSchema = z.enum(['gpt-4o', 'claude-3.5-sonnet', 'gemini-ultra']);
export type AIModel = z.infer<typeof AIModelSchema>;

// Task Types
export const TaskTypeSchema = z.enum([
  'design_generation',
  'space_planning', 
  'material_selection',
  'budget_optimization',
  'client_communication',
  'project_coordination'
]);
export type TaskType = z.infer<typeof TaskTypeSchema>;

// AI Request Schema
export const AIRequestSchema = z.object({
  id: z.string(),
  type: TaskTypeSchema,
  model: AIModelSchema.optional(),
  input: z.string(),
  context: z.record(z.any()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  userId: z.string(),
  projectId: z.string().optional(),
});

// AI Response Schema
export const AIResponseSchema = z.object({
  id: z.string(),
  requestId: z.string(),
  model: AIModelSchema,
  output: z.string(),
  confidence: z.number().min(0).max(1),
  tokens: z.object({
    input: z.number(),
    output: z.number(),
    total: z.number()
  }),
  latency: z.number(),
  cost: z.number(),
  timestamp: z.string(),
});

// Agent Orchestration Schema
export const AgentOrchestrationSchema = z.object({
  workflowId: z.string(),
  tasks: z.array(AIRequestSchema),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  results: z.array(AIResponseSchema).optional(),
  error: z.string().optional(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
});

// Model Performance Metrics
export const ModelMetricsSchema = z.object({
  model: AIModelSchema,
  avgLatency: z.number(),
  avgConfidence: z.number(),
  successRate: z.number(),
  costPerToken: z.number(),
  totalRequests: z.number(),
  totalCost: z.number(),
});

// Fallback Chain Schema
export const FallbackChainSchema = z.object({
  primary: AIModelSchema,
  fallbacks: z.array(AIModelSchema),
  conditions: z.array(z.object({
    model: AIModelSchema,
    trigger: z.enum(['latency', 'confidence', 'cost', 'error']),
    threshold: z.number()
  }))
});

export type AIRequest = z.infer<typeof AIRequestSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export type AgentOrchestration = z.infer<typeof AgentOrchestrationSchema>;
export type ModelMetrics = z.infer<typeof ModelMetricsSchema>;
export type FallbackChain = z.infer<typeof FallbackChainSchema>;
