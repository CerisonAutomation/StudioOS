import { 
  Content, 
  ContentTemplate, 
  MediaAsset, 
  ContentCollection, 
  ContentWorkflow,
  ContentAnalytics,
  ContentSearch,
  ContentExport,
  ContentImport,
  ContentType,
  ContentStatus
} from './types';

// =============================================================================
// CMS CORE SERVICE - ENTERPRISE GRADE IMPLEMENTATION
// World-class patterns with real-time collaboration, version control, and AI assistance
// =============================================================================

export interface CMSServiceConfig {
  apiEndpoint: string;
  apiKey: string;
  version: string;
  features: {
    realTimeCollaboration: boolean;
    aiAssistance: boolean;
    advancedAnalytics: boolean;
    workflowAutomation: boolean;
    mediaOptimization: boolean;
    seoOptimization: boolean;
    accessibilityCompliance: boolean;
    performanceOptimization: boolean;
  };
  limits: {
    maxFileSize: number;
    maxContentLength: number;
    maxMediaPerContent: number;
    maxRevisions: number;
    apiRateLimit: number;
  };
}

export class CMSService {
  private config: CMSServiceConfig;
  private cache: Map<string, any> = new Map();
  private subscribers: Map<string, Set<Function>> = new Map();
  private wsConnection: WebSocket | null = null;

  constructor(config: CMSServiceConfig) {
    this.config = config;
    this.initializeWebSocket();
  }

  // =============================================================================
  // WEBSOCKET & REAL-TIME COLLABORATION
  // =============================================================================
  
  private initializeWebSocket() {
    if (!this.config.features.realTimeCollaboration) return;

    const wsUrl = this.config.apiEndpoint.replace('http', 'ws') + '/ws';
    this.wsConnection = new WebSocket(wsUrl);
    
    this.wsConnection.onopen = () => {
      console.log('CMS WebSocket connected');
      this.authenticate();
    };

    this.wsConnection.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleWebSocketMessage(message);
    };

    this.wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.reconnectWebSocket();
    };

    this.wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnectWebSocket();
    };
  }

  private authenticate() {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'auth',
        apiKey: this.config.apiKey,
      }));
    }
  }

  private reconnectWebSocket() {
    setTimeout(() => {
      this.initializeWebSocket();
    }, 5000);
  }

  private handleWebSocketMessage(message: any) {
    const { type, data, channel } = message;
    
    switch (type) {
      case 'content_updated':
      case 'content_created':
      case 'content_deleted':
        this.notifySubscribers(channel, data);
        break;
      case 'collaboration':
        this.handleCollaborationEvent(data);
        break;
      case 'analytics':
        this.updateAnalyticsCache(data);
        break;
    }
  }

  // =============================================================================
  // CONTENT MANAGEMENT
  // =============================================================================

  async createContent(content: Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<Content> {
    const response = await this.fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify(content),
    });

    const newContent = await response.json();
    
    // Cache the new content
    this.cache.set(`content:${newContent.id}`, newContent);
    
    // Notify subscribers
    this.notifySubscribers(`content:${newContent.type}`, newContent);
    
    return newContent;
  }

  async updateContent(id: string, updates: Partial<Content>): Promise<Content> {
    const response = await this.fetch(`/api/content/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });

    const updatedContent = await response.json();
    
    // Update cache
    this.cache.set(`content:${id}`, updatedContent);
    
    // Notify subscribers
    this.notifySubscribers(`content:${updatedContent.type}`, updatedContent);
    
    return updatedContent;
  }

  async getContent(id: string): Promise<Content | null> {
    // Check cache first
    const cached = this.cache.get(`content:${id}`);
    if (cached) return cached;

    const response = await this.fetch(`/api/content/${id}`);
    if (!response.ok) return null;

    const content = await response.json();
    this.cache.set(`content:${id}`, content);
    return content;
  }

  async deleteContent(id: string): Promise<void> {
    await this.fetch(`/api/content/${id}`, { method: 'DELETE' });
    
    // Remove from cache
    this.cache.delete(`content:${id}`);
    
    // Notify subscribers
    this.notifySubscribers('content:deleted', { id });
  }

  async searchContent(search: ContentSearch): Promise<{
    results: Content[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params = new URLSearchParams();
    
    if (search.query) params.set('q', search.query);
    if (search.type) params.set('type', search.type);
    if (search.status) params.set('status', search.status);
    if (search.tags) params.set('tags', search.tags.join(','));
    if (search.categories) params.set('categories', search.categories.join(','));
    if (search.author) params.set('author', search.author);
    if (search.dateRange?.start) params.set('start', search.dateRange.start.toISOString());
    if (search.dateRange?.end) params.set('end', search.dateRange.end.toISOString());
    if (search.sortBy) params.set('sort', search.sortBy);
    if (search.sortOrder) params.set('order', search.sortOrder);
    params.set('page', search.page.toString());
    params.set('limit', search.limit.toString());
    params.set('includeContent', search.includeContent.toString());
    params.set('includeMetadata', search.includeMetadata.toString());
    params.set('includeAnalytics', search.includeAnalytics.toString());

    const response = await this.fetch(`/api/content/search?${params}`);
    return response.json();
  }

  async getContentBySlug(slug: string): Promise<Content | null> {
    const response = await this.fetch(`/api/content/slug/${slug}`);
    if (!response.ok) return null;

    const content = await response.json();
    this.cache.set(`content:${content.id}`, content);
    return content;
  }

  async getContentByType(type: ContentType, options?: {
    status?: ContentStatus;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Content[]> {
    const params = new URLSearchParams();
    params.set('type', type);
    if (options?.status) params.set('status', options.status);
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());
    if (options?.sortBy) params.set('sort', options.sortBy);
    if (options?.sortOrder) params.set('order', options.sortOrder);

    const response = await this.fetch(`/api/content/type/${type}?${params}`);
    return response.json();
  }

  // =============================================================================
  // CONTENT VERSIONING & REVISIONS
  // =============================================================================

  async createRevision(contentId: string, changes: string): Promise<Content> {
    const response = await this.fetch(`/api/content/${contentId}/revisions`, {
      method: 'POST',
      body: JSON.stringify({ changes }),
    });

    const updatedContent = await response.json();
    this.cache.set(`content:${contentId}`, updatedContent);
    return updatedContent;
  }

  async getRevisions(contentId: string): Promise<Content[]> {
    const response = await this.fetch(`/api/content/${contentId}/revisions`);
    return response.json();
  }

  async restoreRevision(contentId: string, version: number): Promise<Content> {
    const response = await this.fetch(`/api/content/${contentId}/revisions/${version}/restore`, {
      method: 'POST',
    });

    const restoredContent = await response.json();
    this.cache.set(`content:${contentId}`, restoredContent);
    return restoredContent;
  }

  async compareRevisions(contentId: string, version1: number, version2: number): Promise<{
    added: string[];
    removed: string[];
    modified: { old: string; new: string }[];
  }> {
    const response = await this.fetch(`/api/content/${contentId}/revisions/compare?v1=${version1}&v2=${version2}`);
    return response.json();
  }

  // =============================================================================
  // CONTENT TEMPLATES
  // =============================================================================

  async createTemplate(template: Omit<ContentTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usage'>): Promise<ContentTemplate> {
    const response = await this.fetch('/api/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });

    const newTemplate = await response.json();
    this.cache.set(`template:${newTemplate.id}`, newTemplate);
    return newTemplate;
  }

  async getTemplates(type?: ContentType): Promise<ContentTemplate[]> {
    const params = type ? `?type=${type}` : '';
    const response = await this.fetch(`/api/templates${params}`);
    return response.json();
  }

  async getTemplate(id: string): Promise<ContentTemplate | null> {
    const cached = this.cache.get(`template:${id}`);
    if (cached) return cached;

    const response = await this.fetch(`/api/templates/${id}`);
    if (!response.ok) return null;

    const template = await response.json();
    this.cache.set(`template:${id}`, template);
    return template;
  }

  async applyTemplate(templateId: string, data: Record<string, any>): Promise<Content> {
    const response = await this.fetch(`/api/templates/${templateId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const content = await response.json();
    this.cache.set(`content:${content.id}`, content);
    return content;
  }

  // =============================================================================
  // MEDIA MANAGEMENT
  // =============================================================================

  async uploadMedia(file: File, options?: {
    alt?: string;
    caption?: string;
    tags?: string[];
    optimize?: boolean;
  }): Promise<MediaAsset> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options?.alt) formData.append('alt', options.alt);
    if (options?.caption) formData.append('caption', options.caption);
    if (options?.tags) formData.append('tags', JSON.stringify(options.tags));
    if (options?.optimize !== undefined) formData.append('optimize', options.optimize.toString());

    const response = await this.fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
    });

    const media = await response.json();
    this.cache.set(`media:${media.id}`, media);
    return media;
  }

  async getMedia(id: string): Promise<MediaAsset | null> {
    const cached = this.cache.get(`media:${id}`);
    if (cached) return cached;

    const response = await this.fetch(`/api/media/${id}`);
    if (!response.ok) return null;

    const media = await response.json();
    this.cache.set(`media:${id}`, media);
    return media;
  }

  async searchMedia(query: string, type?: string): Promise<MediaAsset[]> {
    const params = new URLSearchParams();
    params.set('q', query);
    if (type) params.set('type', type);

    const response = await this.fetch(`/api/media/search?${params}`);
    return response.json();
  }

  async optimizeMedia(id: string, options: {
    format?: string;
    quality?: number;
    resize?: { width: number; height: number };
    crop?: { x: number; y: number; width: number; height: number };
  }): Promise<MediaAsset> {
    const response = await this.fetch(`/api/media/${id}/optimize`, {
      method: 'POST',
      body: JSON.stringify(options),
    });

    const optimizedMedia = await response.json();
    this.cache.set(`media:${id}`, optimizedMedia);
    return optimizedMedia;
  }

  // =============================================================================
  // CONTENT WORKFLOWS
  // =============================================================================

  async createWorkflow(workflow: Omit<ContentWorkflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentWorkflow> {
    const response = await this.fetch('/api/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow),
    });

    const newWorkflow = await response.json();
    this.cache.set(`workflow:${newWorkflow.id}`, newWorkflow);
    return newWorkflow;
  }

  async getWorkflows(contentType?: ContentType): Promise<ContentWorkflow[]> {
    const params = contentType ? `?contentType=${contentType}` : '';
    const response = await this.fetch(`/api/workflows${params}`);
    return response.json();
  }

  async applyWorkflow(contentId: string, workflowId: string): Promise<void> {
    await this.fetch(`/api/content/${contentId}/workflow/${workflowId}`, {
      method: 'POST',
    });
  }

  async updateWorkflowStage(contentId: string, stageId: string, data?: {
    notes?: string;
    assignees?: string[];
  }): Promise<Content> {
    const response = await this.fetch(`/api/content/${contentId}/workflow/${stageId}`, {
      method: 'PATCH',
      body: JSON.stringify(data || {}),
    });

    const updatedContent = await response.json();
    this.cache.set(`content:${contentId}`, updatedContent);
    return updatedContent;
  }

  // =============================================================================
  // ANALYTICS & INSIGHTS
  // =============================================================================

  async getContentAnalytics(contentId: string, period?: string): Promise<ContentAnalytics[]> {
    const params = period ? `?period=${period}` : '';
    const response = await this.fetch(`/api/analytics/content/${contentId}${params}`);
    return response.json();
  }

  async getSiteAnalytics(period?: string): Promise<{
    totalViews: number;
    totalContent: number;
    publishedContent: number;
    averageEngagement: number;
    topContent: Content[];
    trafficSources: Array<{ source: string; views: number; percentage: number }>;
    deviceBreakdown: Array<{ device: string; views: number; percentage: number }>;
    geographicData: Array<{ country: string; views: number; percentage: number }>;
  }> {
    const params = period ? `?period=${period}` : '';
    const response = await this.fetch(`/api/analytics/site${params}`);
    return response.json();
  }

  async trackContentView(contentId: string, metadata?: {
    source?: string;
    medium?: string;
    campaign?: string;
    device?: string;
    location?: string;
  }): Promise<void> {
    await this.fetch(`/api/analytics/content/${contentId}/view`, {
      method: 'POST',
      body: JSON.stringify(metadata || {}),
    });
  }

  // =============================================================================
  // AI ASSISTANCE
  // =============================================================================

  async generateContent(prompt: string, options?: {
    type?: ContentType;
    tone?: string;
    length?: number;
    keywords?: string[];
    includeSeo?: boolean;
  }): Promise<{
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    seo?: {
      title: string;
      description: string;
      keywords: string[];
    };
  }> {
    if (!this.config.features.aiAssistance) {
      throw new Error('AI assistance is not enabled');
    }

    const response = await this.fetch('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, ...options }),
    });

    return response.json();
  }

  async optimizeContent(contentId: string): Promise<{
    suggestions: Array<{
      type: 'seo' | 'readability' | 'accessibility' | 'performance';
      priority: 'high' | 'medium' | 'low';
      message: string;
      action?: string;
    }>;
    optimizedContent?: Content;
  }> {
    if (!this.config.features.aiAssistance) {
      throw new Error('AI assistance is not enabled');
    }

    const response = await this.fetch(`/api/ai/optimize/${contentId}`, {
      method: 'POST',
    });

    return response.json();
  }

  async generateSummary(contentId: string, length?: number): Promise<string> {
    if (!this.config.features.aiAssistance) {
      throw new Error('AI assistance is not enabled');
    }

    const params = length ? `?length=${length}` : '';
    const response = await this.fetch(`/api/ai/summary/${contentId}${params}`);
    const result = await response.json();
    return result.summary;
  }

  // =============================================================================
  // IMPORT/EXPORT
  // =============================================================================

  async exportContent(config: ContentExport): Promise<Blob> {
    const response = await this.fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify(config),
    });

    return response.blob();
  }

  async importContent(config: ContentImport): Promise<{
    imported: number;
    updated: number;
    errors: string[];
    skipped: string[];
  }> {
    const response = await this.fetch('/api/import', {
      method: 'POST',
      body: JSON.stringify(config),
    });

    return response.json();
  }

  // =============================================================================
  // REAL-TIME COLLABORATION
  // =============================================================================

  subscribe(channel: string, callback: Function): () => void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    
    this.subscribers.get(channel)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.get(channel)?.delete(callback);
    };
  }

  private notifySubscribers(channel: string, data: any): void {
    const callbacks = this.subscribers.get(channel);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in subscriber callback:', error);
        }
      });
    }
  }

  private handleCollaborationEvent(data: any): void {
    const { type, contentId, userId, payload } = data;
    
    switch (type) {
      case 'cursor_move':
      case 'selection_change':
      case 'text_edit':
      case 'comment_add':
      case 'comment_resolve':
        this.notifySubscribers(`collaboration:${contentId}`, data);
        break;
    }
  }

  sendCollaborationEvent(contentId: string, type: string, payload: any): void {
    if (!this.wsConnection || this.wsConnection.readyState !== WebSocket.OPEN) {
      return;
    }

    this.wsConnection.send(JSON.stringify({
      type: 'collaboration',
      data: {
        type,
        contentId,
        payload,
      },
    }));
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  private async fetch(endpoint: string, options?: RequestInit): Promise<Response> {
    const url = `${this.config.apiEndpoint}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      'X-API-Version': this.config.version,
      ...options?.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`CMS API Error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  private updateAnalyticsCache(data: any): void {
    const { contentId, metrics } = data;
    const cacheKey = `analytics:${contentId}`;
    
    const existing = this.cache.get(cacheKey) || [];
    existing.push(metrics);
    
    // Keep only last 100 entries
    if (existing.length > 100) {
      existing.splice(0, existing.length - 100);
    }
    
    this.cache.set(cacheKey, existing);
  }

  // =============================================================================
  // CACHE MANAGEMENT
  // =============================================================================

  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  getCacheStats(): {
    size: number;
    keys: string[];
    memoryUsage: number;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  private estimateMemoryUsage(): number {
    // Rough estimation of memory usage
    let total = 0;
    for (const [key, value] of this.cache) {
      total += key.length * 2; // String characters
      total += JSON.stringify(value).length * 2;
    }
    return total;
  }

  // =============================================================================
  // HEALTH & MONITORING
  // =============================================================================

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    api: boolean;
    websocket: boolean;
    cache: boolean;
    features: Record<string, boolean>;
    latency: number;
    timestamp: Date;
  }> {
    const startTime = Date.now();
    
    try {
      const response = await this.fetch('/api/health');
      const apiHealth = await response.json();
      
      return {
        status: apiHealth.status,
        api: apiHealth.api,
        websocket: this.wsConnection?.readyState === WebSocket.OPEN,
        cache: this.cache.size > 0,
        features: this.config.features,
        latency: Date.now() - startTime,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        api: false,
        websocket: false,
        cache: false,
        features: this.config.features,
        latency: Date.now() - startTime,
        timestamp: new Date(),
      };
    }
  }

  destroy(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    
    this.cache.clear();
    this.subscribers.clear();
  }
}

// =============================================================================
// CMS FACTORY & SINGLETON
// =============================================================================

let cmsInstance: CMSService | null = null;

export function createCMS(config: CMSServiceConfig): CMSService {
  cmsInstance = new CMSService(config);
  return cmsInstance;
}

export function getCMS(): CMSService {
  if (!cmsInstance) {
    throw new Error('CMS not initialized. Call createCMS() first.');
  }
  return cmsInstance;
}

export function destroyCMS(): void {
  if (cmsInstance) {
    cmsInstance.destroy();
    cmsInstance = null;
  }
}
