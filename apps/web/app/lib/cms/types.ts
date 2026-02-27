import { z } from 'zod';

// =============================================================================
// CONTENT MANAGEMENT SYSTEM - WORLD CLASS PATTERNS
// Enterprise-grade CMS with real-time collaboration, version control, and AI assistance
// =============================================================================

// Content Types Schema
export const ContentTypeSchema = z.enum([
  'page',
  'article',
  'blog_post',
  'project',
  'portfolio',
  'product',
  'service',
  'case_study',
  'testimonial',
  'team_member',
  'faq',
  'announcement',
  'event',
  'newsletter',
  'press_release',
  'documentation',
  'template',
  'component',
  'asset',
  'media',
]);

// Content Status Schema
export const ContentStatusSchema = z.enum([
  'draft',
  'review',
  'approved',
  'scheduled',
  'published',
  'archived',
  'deleted',
]);

// Content Priority Schema
export const ContentPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'urgent',
  'critical',
]);

// SEO Schema
export const SEOSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
  keywords: z.array(z.string()).optional(),
  canonicalUrl: z.string().url().optional(),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  openGraph: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    type: z.string().optional(),
    locale: z.string().optional(),
    siteName: z.string().optional(),
  }).optional(),
  twitter: z.object({
    card: z.enum(['summary', 'summary_large_image']).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    creator: z.string().optional(),
    site: z.string().optional(),
  }).optional(),
  structuredData: z.record(z.any()).optional(),
});

// Content Schema
export const ContentSchema = z.object({
  id: z.string().uuid(),
  type: ContentTypeSchema,
  status: ContentStatusSchema,
  priority: ContentPrioritySchema,
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  excerpt: z.string().max(500).optional(),
  content: z.string(),
  metadata: z.record(z.any()).optional(),
  seo: SEOSchema.optional(),
  featuredImage: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  author: z.string().uuid(),
  coAuthors: z.array(z.string().uuid()).optional(),
  publishedAt: z.date().optional(),
  scheduledAt: z.date().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().default(1),
  revisionHistory: z.array(z.object({
    version: z.number(),
    author: z.string().uuid(),
    changes: z.string(),
    timestamp: z.date(),
  })).optional(),
  workflow: z.object({
    currentStage: z.string(),
    assignedTo: z.array(z.string().uuid()),
    dueDate: z.date().optional(),
    approvals: z.array(z.object({
      userId: z.string().uuid(),
      role: z.string(),
      status: z.enum(['pending', 'approved', 'rejected']),
      timestamp: z.date(),
      comments: z.string().optional(),
    })).optional(),
  }).optional(),
  analytics: z.object({
    views: z.number().default(0),
    shares: z.number().default(0),
    likes: z.number().default(0),
    comments: z.number().default(0),
    conversions: z.number().default(0),
    bounceRate: z.number().optional(),
    timeOnPage: z.number().optional(),
  }).optional(),
  accessibility: z.object({
    wcagLevel: z.enum(['A', 'AA', 'AAA']).default('AA'),
    altTexts: z.record(z.string()).optional(),
    language: z.string().default('en'),
    readingLevel: z.string().optional(),
  }).optional(),
  performance: z.object({
    loadTime: z.number().optional(),
    pageSize: z.number().optional(),
    imageOptimization: z.boolean().default(true),
    cachingEnabled: z.boolean().default(true),
    cdnEnabled: z.boolean().default(false),
  }).optional(),
});

// Content Template Schema
export const ContentTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  type: ContentTypeSchema,
  structure: z.object({
    sections: z.array(z.object({
      id: z.string(),
      type: z.enum(['header', 'content', 'sidebar', 'footer', 'custom']),
      order: z.number(),
      components: z.array(z.object({
        type: z.string(),
        props: z.record(z.any()),
        required: z.boolean().default(false),
      })),
    })),
    layout: z.enum(['single', 'sidebar-left', 'sidebar-right', 'two-column', 'three-column']),
    responsive: z.boolean().default(true),
  }),
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'textarea', 'rich-text', 'image', 'video', 'date', 'number', 'boolean', 'select', 'multi-select', 'file']),
    label: z.string(),
    required: z.boolean().default(false),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
      custom: z.string().optional(),
    }).optional(),
    defaultValue: z.any().optional(),
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  })),
  styling: z.object({
    theme: z.string().optional(),
    customCSS: z.string().optional(),
    fonts: z.array(z.string()).optional(),
    colors: z.record(z.string()).optional(),
  }).optional(),
  seo: z.object({
    titleTemplate: z.string().optional(),
    descriptionTemplate: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    structuredDataTemplate: z.record(z.any()).optional(),
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().uuid(),
  usage: z.object({
    contentCount: z.number().default(0),
    lastUsed: z.date().optional(),
    popularity: z.number().default(0),
  }).optional(),
});

// Media Asset Schema
export const MediaAssetSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['image', 'video', 'audio', 'document', 'archive']),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    duration: z.number().optional(),
  }).optional(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
  optimization: z.object({
    compressed: z.boolean().default(false),
    webp: z.boolean().default(false),
    lazy: z.boolean().default(true),
    cdn: z.boolean().default(false),
  }).optional(),
  usage: z.object({
    contentCount: z.number().default(0),
    lastUsed: z.date().optional(),
    downloadCount: z.number().default(0),
  }).optional(),
  uploadedBy: z.string().uuid(),
  uploadedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Content Collection Schema
export const ContentCollectionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  type: ContentTypeSchema,
  filters: z.object({
    status: z.array(ContentStatusSchema).optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    authors: z.array(z.string().uuid()).optional(),
    dateRange: z.object({
      start: z.date().optional(),
      end: z.date().optional(),
    }).optional(),
    custom: z.record(z.any()).optional(),
  }).optional(),
  sorting: z.object({
    field: z.enum(['createdAt', 'updatedAt', 'publishedAt', 'title', 'priority', 'views']),
    direction: z.enum(['asc', 'desc']).default('desc'),
  }).optional(),
  pagination: z.object({
    page: z.number().default(1),
    limit: z.number().default(20),
    total: z.number().optional(),
  }).optional(),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isPublic: z.boolean().default(false),
  shareToken: z.string().optional(),
  shareExpiresAt: z.date().optional(),
});

// Content Workflow Schema
export const ContentWorkflowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  contentType: ContentTypeSchema,
  stages: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.enum(['draft', 'review', 'approval', 'publish', 'archive']),
    assignees: z.array(z.string().uuid()),
    rules: z.array(z.object({
      condition: z.string(),
      action: z.enum(['auto-approve', 'auto-reject', 'notify', 'escalate']),
      parameters: z.record(z.any()).optional(),
    })).optional(),
    timeLimit: z.number().optional(), // in hours
    autoAdvance: z.boolean().default(false),
  })),
  transitions: z.array(z.object({
    from: z.string(),
    to: z.string(),
    conditions: z.array(z.object({
      field: z.string(),
      operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than']),
      value: z.any(),
    })),
    actions: z.array(z.object({
      type: z.enum(['notify', 'assign', 'update_field', 'create_task', 'send_email']),
      parameters: z.record(z.any()).optional(),
    })),
  })),
  permissions: z.object({
    canEdit: z.array(z.string().uuid()),
    canView: z.array(z.string().uuid()),
    canPublish: z.array(z.string().uuid()),
    canDelete: z.array(z.string().uuid()),
  }),
  isActive: z.boolean().default(true),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Content Analytics Schema
export const ContentAnalyticsSchema = z.object({
  id: z.string().uuid(),
  contentId: z.string().uuid(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly']),
  metrics: z.object({
    views: z.number().default(0),
    uniqueViews: z.number().default(0),
    pageViews: z.number().default(0),
    sessions: z.number().default(0),
    users: z.number().default(0),
    bounceRate: z.number().optional(),
    avgSessionDuration: z.number().optional(),
    avgTimeOnPage: z.number().optional(),
    scrollDepth: z.number().optional(),
    conversions: z.number().default(0),
    conversionRate: z.number().optional(),
    shares: z.number().default(0),
    likes: z.number().default(0),
    comments: z.number().default(0),
    downloads: z.number().default(0),
    revenue: z.number().optional(),
  }),
  sources: z.array(z.object({
    source: z.string(),
    medium: z.string(),
    campaign: z.string().optional(),
    views: z.number(),
    conversions: z.number(),
  })).optional(),
  devices: z.array(z.object({
    device: z.enum(['desktop', 'mobile', 'tablet']),
    views: z.number(),
    bounceRate: z.number().optional(),
  })).optional(),
  locations: z.array(z.object({
    country: z.string(),
    region: z.string().optional(),
    city: z.string().optional(),
    views: z.number(),
  })).optional(),
  searchQueries: z.array(z.object({
    query: z.string(),
    views: z.number(),
    position: z.number().optional(),
  })).optional(),
  timestamp: z.date(),
});

// Content Search Schema
export const ContentSearchSchema = z.object({
  query: z.string().optional(),
  type: ContentTypeSchema.optional(),
  status: ContentStatusSchema.optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  author: z.string().uuid().optional(),
  dateRange: z.object({
    start: z.date().optional(),
    end: z.date().optional(),
  }).optional(),
  sortBy: z.enum(['relevance', 'createdAt', 'updatedAt', 'publishedAt', 'title', 'views']).default('relevance'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(20),
  includeContent: z.boolean().default(false),
  includeMetadata: z.boolean().default(true),
  includeAnalytics: z.boolean().default(false),
});

// Content Export Schema
export const ContentExportSchema = z.object({
  format: z.enum(['json', 'xml', 'csv', 'pdf', 'docx', 'html']),
  filters: ContentSearchSchema.optional(),
  fields: z.array(z.string()).optional(),
  includeMedia: z.boolean().default(false),
  includeAnalytics: z.boolean().default(false),
  includeRevisions: z.boolean().default(false),
  compression: z.boolean().default(true),
  password: z.string().optional(),
});

// Content Import Schema
export const ContentImportSchema = z.object({
  format: z.enum(['json', 'xml', 'csv', 'wordpress', 'drupal', 'ghost']),
  data: z.any(),
  mapping: z.record(z.string()).optional(),
  overwrite: z.boolean().default(false),
  preserveIds: z.boolean().default(false),
  defaultStatus: ContentStatusSchema.default('draft'),
  defaultAuthor: z.string().uuid().optional(),
  importMedia: z.boolean().default(true),
  createCategories: z.boolean().default(true),
  createTags: z.boolean().default(true),
});

// Type exports
export type ContentType = z.infer<typeof ContentTypeSchema>;
export type ContentStatus = z.infer<typeof ContentStatusSchema>;
export type ContentPriority = z.infer<typeof ContentPrioritySchema>;
export type SEO = z.infer<typeof SEOSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type ContentTemplate = z.infer<typeof ContentTemplateSchema>;
export type MediaAsset = z.infer<typeof MediaAssetSchema>;
export type ContentCollection = z.infer<typeof ContentCollectionSchema>;
export type ContentWorkflow = z.infer<typeof ContentWorkflowSchema>;
export type ContentAnalytics = z.infer<typeof ContentAnalyticsSchema>;
export type ContentSearch = z.infer<typeof ContentSearchSchema>;
export type ContentExport = z.infer<typeof ContentExportSchema>;
export type ContentImport = z.infer<typeof ContentImportSchema>;
