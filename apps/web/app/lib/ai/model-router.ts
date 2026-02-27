import { AIModel, AIRequest, AIResponse, ModelMetrics, FallbackChain } from './types';

// Model Configuration
export const MODEL_CONFIG = {
  'gpt-4o': {
    name: 'GPT-4o',
    maxTokens: 128000,
    costPerToken: 0.000005,
    avgLatency: 2000,
    specialties: ['design_generation', 'client_communication', 'project_coordination'],
    provider: 'openai'
  },
  'claude-3.5-sonnet': {
    name: 'Claude 3.5 Sonnet',
    maxTokens: 200000,
    costPerToken: 0.000003,
    avgLatency: 1500,
    specialties: ['space_planning', 'material_selection', 'budget_optimization'],
    provider: 'anthropic'
  },
  'gemini-ultra': {
    name: 'Gemini Ultra',
    maxTokens: 1000000,
    costPerToken: 0.000001,
    avgLatency: 3000,
    specialties: ['design_generation', 'space_planning', 'material_selection'],
    provider: 'google'
  }
} as const;

// Fallback Chains for different task types
export const FALLBACK_CHAINS: Record<string, FallbackChain> = {
  design_generation: {
    primary: 'gpt-4o',
    fallbacks: ['claude-3.5-sonnet', 'gemini-ultra'],
    conditions: [
      { model: 'gpt-4o', trigger: 'latency', threshold: 5000 },
      { model: 'gpt-4o', trigger: 'confidence', threshold: 0.7 },
      { model: 'gpt-4o', trigger: 'error', threshold: 0 }
    ]
  },
  space_planning: {
    primary: 'claude-3.5-sonnet',
    fallbacks: ['gemini-ultra', 'gpt-4o'],
    conditions: [
      { model: 'claude-3.5-sonnet', trigger: 'latency', threshold: 3000 },
      { model: 'claude-3.5-sonnet', trigger: 'confidence', threshold: 0.8 }
    ]
  },
  budget_optimization: {
    primary: 'claude-3.5-sonnet',
    fallbacks: ['gpt-4o'],
    conditions: [
      { model: 'claude-3.5-sonnet', trigger: 'cost', threshold: 0.01 }
    ]
  }
};

// Model Router Class
export class ModelRouter {
  private metrics: Map<AIModel, ModelMetrics> = new Map();
  private fallbackChains: Map<string, FallbackChain> = new Map(Object.entries(FALLBACK_CHAINS));

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics() {
    Object.keys(MODEL_CONFIG).forEach(model => {
      this.metrics.set(model as AIModel, {
        model: model as AIModel,
        avgLatency: MODEL_CONFIG[model as AIModel].avgLatency,
        avgConfidence: 0.85,
        successRate: 0.95,
        costPerToken: MODEL_CONFIG[model as AIModel].costPerToken,
        totalRequests: 0,
        totalCost: 0
      });
    });
  }

  // Select optimal model for task
  selectModel(taskType: string, priority: string = 'medium'): AIModel {
    const chain = this.fallbackChains.get(taskType);
    if (!chain) {
      return 'gpt-4o'; // Default fallback
    }

    // Check if primary model meets criteria
    const primaryMetrics = this.metrics.get(chain.primary);
    if (primaryMetrics && this.isModelSuitable(primaryMetrics, chain.primary, priority)) {
      return chain.primary;
    }

    // Try fallback models
    for (const fallbackModel of chain.fallbacks) {
      const fallbackMetrics = this.metrics.get(fallbackModel);
      if (fallbackMetrics && this.isModelSuitable(fallbackMetrics, fallbackModel, priority)) {
        return fallbackModel;
      }
    }

    return chain.primary; // Last resort
  }

  private isModelSuitable(metrics: ModelMetrics, model: AIModel, priority: string): boolean {
    const config = MODEL_CONFIG[model];

    // Check if model specializes in task type
    if (!config.specialties.some(specialty => specialty === this.getTaskTypeFromModel(model))) {
      return false;
    }

    // Priority-based criteria
    switch (priority) {
      case 'urgent':
        return metrics.avgLatency < 2000 && metrics.successRate > 0.9;
      case 'high':
        return metrics.avgLatency < 3000 && metrics.successRate > 0.85;
      case 'medium':
        return metrics.avgLatency < 5000 && metrics.successRate > 0.8;
      default:
        return metrics.successRate > 0.7;
    }
  }

  private getTaskTypeFromModel(model: AIModel): string {
    // Simplified mapping - in real implementation would be more sophisticated
    const mapping = {
      'gpt-4o': 'design_generation',
      'claude-3.5-sonnet': 'space_planning',
      'gemini-ultra': 'design_generation'
    };
    return mapping[model] || 'design_generation';
  }

  // Update model metrics after request
  updateMetrics(model: AIModel, response: AIResponse) {
    const currentMetrics = this.metrics.get(model);
    if (!currentMetrics) return;

    const newMetrics: ModelMetrics = {
      ...currentMetrics,
      avgLatency: this.calculateMovingAverage(currentMetrics.avgLatency, response.latency),
      avgConfidence: this.calculateMovingAverage(currentMetrics.avgConfidence, response.confidence),
      successRate: response.confidence > 0.5 ?
        this.calculateMovingAverage(currentMetrics.successRate, 1) :
        this.calculateMovingAverage(currentMetrics.successRate, 0),
      totalRequests: currentMetrics.totalRequests + 1,
      totalCost: currentMetrics.totalCost + response.cost
    };

    this.metrics.set(model, newMetrics);
  }

  private calculateMovingAverage(current: number, newValue: number, alpha: number = 0.1): number {
    return current * (1 - alpha) + newValue * alpha;
  }

  // Get model performance metrics
  getModelMetrics(model?: AIModel): ModelMetrics[] {
    if (model) {
      const metrics = this.metrics.get(model);
      return metrics ? [metrics] : [];
    }
    return Array.from(this.metrics.values());
  }

  // Get cost optimization recommendations
  getCostOptimizationSuggestions(): Array<{
    model: AIModel;
    suggestion: string;
    potentialSavings: number;
  }> {
    const suggestions = [];

    for (const [model, metrics] of this.metrics.entries()) {
      if (metrics.avgLatency > 3000) {
        suggestions.push({
          model,
          suggestion: 'Consider using faster model for time-sensitive tasks',
          potentialSavings: metrics.totalCost * 0.2
        });
      }

      if (metrics.successRate < 0.8) {
        suggestions.push({
          model,
          suggestion: 'Model reliability is low, consider fallback chain',
          potentialSavings: metrics.totalCost * 0.1
        });
      }
    }

    return suggestions.sort((a, b) => b.potentialSavings - a.potentialSavings);
  }
}

// Singleton instance
export const modelRouter = new ModelRouter();
