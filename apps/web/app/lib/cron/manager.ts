import * as cron from 'node-cron';
import { logger } from './logger';
import { cms } from './cms-service';
import { analytics } from './analytics-service';
import { email } from './email-service';
import { backup as backupService } from './backup-service';
import { security } from './security-service';
import { performance } from './performance-service';

// =============================================================================
// ENTERPRISE CRON JOB SYSTEM - GAME CHANGING AUTOMATION
// World-class scheduled tasks with error handling, monitoring, and resilience
// =============================================================================

interface CronJobConfig {
  name: string;
  schedule: string;
  handler: () => Promise<void>;
  enabled: boolean;
  timeout: number;
  retries: number;
  alertOnFailure: boolean;
  dependencies?: string[];
}

class EnterpriseCronManager {
  private jobs: Map<string, cron.ScheduledTask> = new Map();
  private jobConfigs: Map<string, CronJobConfig> = new Map();
  private runningJobs: Set<string> = new Set();
  private jobStats: Map<string, {
    runs: number;
    successes: number;
    failures: number;
    lastRun: Date;
    avgDuration: number;
  }> = new Map();

  constructor() {
    this.initializeJobs();
    this.setupGracefulShutdown();
  }

  private initializeJobs(): void {
    const jobs: CronJobConfig[] = [
      // Content Management Jobs
      {
        name: 'content-cleanup',
        schedule: '0 2 * * *', // Daily at 2 AM
        handler: this.cleanupExpiredContent.bind(this),
        enabled: true,
        timeout: 300000, // 5 minutes
        retries: 3,
        alertOnFailure: true,
      },
      {
        name: 'content-optimization',
        schedule: '0 3 * * 0', // Weekly on Sunday at 3 AM
        handler: this.optimizeAllContent.bind(this),
        enabled: true,
        timeout: 1800000, // 30 minutes
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'seo-audit',
        schedule: '0 4 * * 1', // Weekly on Monday at 4 AM
        handler: this.runSEOAudit.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 3,
        alertOnFailure: true,
      },

      // Analytics & Reporting Jobs
      {
        name: 'daily-analytics',
        schedule: '0 1 * * *', // Daily at 1 AM
        handler: this.generateDailyReports.bind(this),
        enabled: true,
        timeout: 300000, // 5 minutes
        retries: 3,
        alertOnFailure: true,
      },
      {
        name: 'weekly-performance-report',
        schedule: '0 6 * * 1', // Weekly on Monday at 6 AM
        handler: this.generateWeeklyPerformanceReport.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'user-behavior-analysis',
        schedule: '0 5 * * *', // Daily at 5 AM
        handler: this.analyzeUserBehavior.bind(this),
        enabled: true,
        timeout: 900000, // 15 minutes
        retries: 3,
        alertOnFailure: true,
      },

      // Security & Compliance Jobs
      {
        name: 'security-scan',
        schedule: '0 2 * * *', // Daily at 2 AM
        handler: this.runSecurityScan.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 3,
        alertOnFailure: true,
      },
      {
        name: 'vulnerability-check',
        schedule: '0 3 * * 2', // Weekly on Tuesday at 3 AM
        handler: this.checkVulnerabilities.bind(this),
        enabled: true,
        timeout: 1200000, // 20 minutes
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'compliance-audit',
        schedule: '0 4 1 * *', // Monthly on 1st at 4 AM
        handler: this.runComplianceAudit.bind(this),
        enabled: true,
        timeout: 1800000, // 30 minutes
        retries: 2,
        alertOnFailure: true,
      },

      // Backup & Maintenance Jobs
      {
        name: 'database-backup',
        schedule: '0 1 * * *', // Daily at 1 AM
        handler: this.createDatabaseBackup.bind(this),
        enabled: true,
        timeout: 1800000, // 30 minutes
        retries: 3,
        alertOnFailure: true,
        dependencies: ['content-cleanup'],
      },
      {
        name: 'media-backup',
        schedule: '0 2 * * 0', // Weekly on Sunday at 2 AM
        handler: this.createMediaBackup.bind(this),
        enabled: true,
        timeout: 3600000, // 1 hour
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'log-rotation',
        schedule: '0 0 * * *', // Daily at midnight
        handler: this.rotateLogs.bind(this),
        enabled: true,
        timeout: 300000, // 5 minutes
        retries: 3,
        alertOnFailure: false,
      },

      // Performance & Optimization Jobs
      {
        name: 'cache-warmup',
        schedule: '0 */6 * * *', // Every 6 hours
        handler: this.warmupCache.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 2,
        alertOnFailure: false,
      },
      {
        name: 'performance-monitoring',
        schedule: '*/15 * * * *', // Every 15 minutes
        handler: this.monitorPerformance.bind(this),
        enabled: true,
        timeout: 60000, // 1 minute
        retries: 1,
        alertOnFailure: false,
      },
      {
        name: 'bundle-analysis',
        schedule: '0 3 * * 0', // Weekly on Sunday at 3 AM
        handler: this.analyzeBundleSize.bind(this),
        enabled: true,
        timeout: 300000, // 5 minutes
        retries: 2,
        alertOnFailure: true,
      },

      // User Engagement Jobs
      {
        name: 'email-digest',
        schedule: '0 8 * * *', // Daily at 8 AM
        handler: this.sendEmailDigest.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 3,
        alertOnFailure: true,
      },
      {
        name: 'inactive-user-cleanup',
        schedule: '0 3 * * 0', // Weekly on Sunday at 3 AM
        handler: this.cleanupInactiveUsers.bind(this),
        enabled: true,
        timeout: 600000, // 10 minutes
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'engagement-campaign',
        schedule: '0 10 * * 1', // Weekly on Monday at 10 AM
        handler: this.runEngagementCampaign.bind(this),
        enabled: true,
        timeout: 900000, // 15 minutes
        retries: 2,
        alertOnFailure: true,
      },

      // AI & Content Generation Jobs
      {
        name: 'ai-content-suggestions',
        schedule: '0 */4 * * *', // Every 4 hours
        handler: this.generateAIContentSuggestions.bind(this),
        enabled: true,
        timeout: 1200000, // 20 minutes
        retries: 2,
        alertOnFailure: false,
      },
      {
        name: 'trending-analysis',
        schedule: '0 6 * * *', // Daily at 6 AM
        handler: this.analyzeTrendingContent.bind(this),
        enabled: true,
        timeout: 900000, // 15 minutes
        retries: 2,
        alertOnFailure: true,
      },
      {
        name: 'personalized-recommendations',
        schedule: '0 2 * * *', // Daily at 2 AM
        handler: this.updatePersonalizedRecommendations.bind(this),
        enabled: true,
        timeout: 1800000, // 30 minutes
        retries: 2,
        alertOnFailure: true,
      },

      // System Health Jobs
      {
        name: 'health-check',
        schedule: '*/5 * * * *', // Every 5 minutes
        handler: this.performHealthCheck.bind(this),
        enabled: true,
        timeout: 30000, // 30 seconds
        retries: 1,
        alertOnFailure: true,
      },
      {
        name: 'resource-monitoring',
        schedule: '*/10 * * * *', // Every 10 minutes
        handler: this.monitorResources.bind(this),
        enabled: true,
        timeout: 60000, // 1 minute
        retries: 1,
        alertOnFailure: true,
      },
      {
        name: 'error-reporting',
        schedule: '0 */2 * * *', // Every 2 hours
        handler: this.reportErrors.bind(this),
        enabled: true,
        timeout: 300000, // 5 minutes
        retries: 2,
        alertOnFailure: true,
      },
    ];

    jobs.forEach(job => {
      this.registerJob(job);
    });
  }

  private registerJob(config: CronJobConfig): void {
    this.jobConfigs.set(config.name, config);

    if (!config.enabled) {
      logger.info(`Cron job ${config.name} is disabled`);
      return;
    }

    const task = cron.schedule(config.schedule, async () => {
      await this.executeJob(config);
    });

    this.jobs.set(config.name, task);
    logger.info(`Registered cron job: ${config.name} with schedule: ${config.schedule}`);
  }

  private async executeJob(config: CronJobConfig): Promise<void> {
    const startTime = Date.now();
    const jobName = config.name;

    // Check if job is already running
    if (this.runningJobs.has(jobName)) {
      logger.warn(`Job ${jobName} is already running, skipping`);
      return;
    }

    // Check dependencies
    if (config.dependencies) {
      for (const dep of config.dependencies) {
        if (this.runningJobs.has(dep)) {
          logger.warn(`Job ${jobName} dependency ${dep} is running, waiting...`);
          await this.waitForDependency(dep);
        }
      }
    }

    this.runningJobs.add(jobName);

    try {
      logger.info(`Starting cron job: ${jobName}`);

      // Execute with timeout
      await Promise.race([
        this.executeWithRetries(config),
        this.timeout(config.timeout),
      ]);

      const duration = Date.now() - startTime;
      this.updateJobStats(jobName, true, duration);

      logger.info(`Completed cron job: ${jobName} in ${duration}ms`);
    } catch (error) {
      const duration = Date.now() - startTime;
      this.updateJobStats(jobName, false, duration);

      logger.error(`Failed cron job: ${jobName}`, error instanceof Error ? error : new Error(String(error)));

      if (config.alertOnFailure) {
        await this.sendFailureAlert(jobName, error instanceof Error ? error : new Error(String(error)));
      }
    } finally {
      this.runningJobs.delete(jobName);
    }
  }

  private async executeWithRetries(config: CronJobConfig): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= config.retries + 1; attempt++) {
      try {
        await config.handler();
        return; // Success
      } catch (error) {
        lastError = error as Error;
        logger.warn(`Job ${config.name} attempt ${attempt} failed:`, { metadata: { error: error instanceof Error ? error.message : String(error) } });

        if (attempt <= config.retries) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000); // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  private async timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Job timed out after ${ms}ms`)), ms);
    });
  }

  private async waitForDependency(dependency: string): Promise<void> {
    while (this.runningJobs.has(dependency)) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  private updateJobStats(jobName: string, success: boolean, duration: number): void {
    const stats = this.jobStats.get(jobName) || {
      runs: 0,
      successes: 0,
      failures: 0,
      lastRun: new Date(),
      avgDuration: 0,
    };

    stats.runs++;
    if (success) {
      stats.successes++;
    } else {
      stats.failures++;
    }
    stats.lastRun = new Date();
    stats.avgDuration = (stats.avgDuration * (stats.runs - 1) + duration) / stats.runs;

    this.jobStats.set(jobName, stats);
  }

  // =============================================================================
  // CONTENT MANAGEMENT JOBS
  // =============================================================================

  private async cleanupExpiredContent(): Promise<void> {
    logger.info('Starting expired content cleanup');

    const expiredContent = await cms.findExpiredContent();
    for (const content of expiredContent) {
      await cms.archiveContent(content.id);
    }

    logger.info(`Cleaned up ${expiredContent.length} expired content items`);
  }

  private async optimizeAllContent(): Promise<void> {
    logger.info('Starting content optimization');

    const content = await cms.getAllContent({ status: 'published' });
    for (const item of content) {
      await cms.optimizeContent(item.id);
    }

    logger.info(`Optimized ${content.length} content items`);
  }

  private async runSEOAudit(): Promise<void> {
    logger.info('Starting SEO audit');

    const audit = await cms.runSEOAudit();
    await analytics.saveSEOAudit(audit);

    // Send report to admins
    await email.sendSEOAuditReport(audit);

    logger.info('SEO audit completed');
  }

  // =============================================================================
  // ANALYTICS & REPORTING JOBS
  // =============================================================================

  private async generateDailyReports(): Promise<void> {
    logger.info('Generating daily reports');

    const reports = await analytics.generateDailyReports();
    await email.sendDailyReports(reports);

    logger.info(`Generated ${reports.length} daily reports`);
  }

  private async generateWeeklyPerformanceReport(): Promise<void> {
    logger.info('Generating weekly performance report');

    const report = await analytics.generateWeeklyPerformanceReport();
    await email.sendPerformanceReport(report);

    logger.info('Weekly performance report generated');
  }

  private async analyzeUserBehavior(): Promise<void> {
    logger.info('Analyzing user behavior');

    const insights = await analytics.analyzeUserBehavior();
    await analytics.saveBehaviorInsights(insights);

    logger.info('User behavior analysis completed');
  }

  // =============================================================================
  // SECURITY & COMPLIANCE JOBS
  // =============================================================================

  private async runSecurityScan(): Promise<void> {
    logger.info('Running security scan');

    const scan = await security.runSecurityScan();
    await security.saveScanResults(scan);

    if (scan.criticalIssues.length > 0) {
      await email.sendSecurityAlert(scan);
    }

    logger.info('Security scan completed');
  }

  private async checkVulnerabilities(): Promise<void> {
    logger.info('Checking for vulnerabilities');

    const vulnerabilities = await security.checkVulnerabilities();
    await security.saveVulnerabilityReport(vulnerabilities);

    if (vulnerabilities.critical.length > 0) {
      await email.sendVulnerabilityAlert(vulnerabilities);
    }

    logger.info('Vulnerability check completed');
  }

  private async runComplianceAudit(): Promise<void> {
    logger.info('Running compliance audit');

    const audit = await security.runComplianceAudit();
    await security.saveComplianceReport(audit);

    logger.info('Compliance audit completed');
  }

  // =============================================================================
  // BACKUP & MAINTENANCE JOBS
  // =============================================================================

  private async createDatabaseBackup(): Promise<void> {
    logger.info('Creating database backup');

    const backupResult = await backupService.createDatabaseBackup();
    await backupService.verifyBackup(backupResult.id);

    logger.info(`Database backup created: ${backupResult.id}`);
  }

  private async createMediaBackup(): Promise<void> {
    logger.info('Creating media backup');

    const mediaBackup = await backupService.createMediaBackup();
    await backupService.verifyBackup(mediaBackup.id);

    logger.info(`Media backup created: ${mediaBackup.id}`);
  }

  private async rotateLogs(): Promise<void> {
    logger.info('Rotating logs');

    await backupService.rotateLogs();

    logger.info('Log rotation completed');
  }

  // =============================================================================
  // PERFORMANCE & OPTIMIZATION JOBS
  // =============================================================================

  private async warmupCache(): Promise<void> {
    logger.info('Warming up cache');

    await performance.warmupCache();

    logger.info('Cache warmup completed');
  }

  private async monitorPerformance(): Promise<void> {
    const metrics = await performance.collectMetrics();

    if (metrics.responseTime > 1000 || metrics.errorRate > 0.05) {
      await email.sendPerformanceAlert(metrics);
    }
  }

  private async analyzeBundleSize(): Promise<void> {
    logger.info('Analyzing bundle size');

    const analysis = await performance.analyzeBundleSize();
    await performance.saveBundleAnalysis(analysis);

    if (analysis.size > 500000) { // 500KB threshold
      await email.sendBundleSizeAlert(analysis);
    }

    logger.info('Bundle size analysis completed');
  }

  // =============================================================================
  // USER ENGAGEMENT JOBS
  // =============================================================================

  private async sendEmailDigest(): Promise<void> {
    logger.info('Sending email digest');

    await email.sendDailyDigest();

    logger.info('Email digest sent');
  }

  private async cleanupInactiveUsers(): Promise<void> {
    logger.info('Cleaning up inactive users');

    const inactiveUsers = await cms.findInactiveUsers(90); // 90 days
    for (const user of inactiveUsers) {
      await cms.deactivateUser(user.id);
    }

    logger.info(`Cleaned up ${inactiveUsers.length} inactive users`);
  }

  private async runEngagementCampaign(): Promise<void> {
    logger.info('Running engagement campaign');

    await cms.runEngagementCampaign();

    logger.info('Engagement campaign completed');
  }

  // =============================================================================
  // AI & CONTENT GENERATION JOBS
  // =============================================================================

  private async generateAIContentSuggestions(): Promise<void> {
    logger.info('Generating AI content suggestions');

    const suggestions = await cms.generateContentSuggestions();
    await cms.saveContentSuggestions(suggestions);

    logger.info(`Generated ${suggestions.length} AI content suggestions`);
  }

  private async analyzeTrendingContent(): Promise<void> {
    logger.info('Analyzing trending content');

    const trends = await analytics.analyzeTrendingContent();
    await analytics.saveTrendingAnalysis(trends);

    logger.info('Trending content analysis completed');
  }

  private async updatePersonalizedRecommendations(): Promise<void> {
    logger.info('Updating personalized recommendations');

    await cms.updatePersonalizedRecommendations();

    logger.info('Personalized recommendations updated');
  }

  // =============================================================================
  // SYSTEM HEALTH JOBS
  // =============================================================================

  private async performHealthCheck(): Promise<void> {
    const health = await performance.healthCheck();

    if (!health.healthy) {
      await email.sendHealthAlert(health);
    }
  }

  private async monitorResources(): Promise<void> {
    const resources = await performance.monitorResources();

    if (resources.cpu > 80 || resources.memory > 80) {
      await email.sendResourceAlert(resources);
    }
  }

  private async reportErrors(): Promise<void> {
    const errors = await analytics.getRecentErrors();

    if (errors.length > 0) {
      await email.sendErrorReport(errors);
    }
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  private async sendFailureAlert(jobName: string, error: Error): Promise<void> {
    await email.sendJobFailureAlert(jobName, error);
  }

  private setupGracefulShutdown(): void {
    const shutdown = () => {
      logger.info('Shutting down cron jobs...');

      this.jobs.forEach((job, name) => {
        job.stop();
        logger.info(`Stopped cron job: ${name}`);
      });

      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }

  // =============================================================================
  // PUBLIC API
  // =============================================================================

  public startJob(jobName: string): void {
    const job = this.jobs.get(jobName);
    if (job) {
      job.start();
      logger.info(`Started cron job: ${jobName}`);
    }
  }

  public stopJob(jobName: string): void {
    const job = this.jobs.get(jobName);
    if (job) {
      job.stop();
      logger.info(`Stopped cron job: ${jobName}`);
    }
  }

  public getJobStats(): Record<string, any> {
    const stats: Record<string, any> = {};

    this.jobStats.forEach((value, key) => {
      stats[key] = value;
    });

    return stats;
  }

  public getRunningJobs(): string[] {
    return Array.from(this.runningJobs);
  }

  public enableJob(jobName: string): void {
    const config = this.jobConfigs.get(jobName);
    if (config) {
      config.enabled = true;
      this.registerJob(config);
    }
  }

  public disableJob(jobName: string): void {
    const job = this.jobs.get(jobName);
    if (job) {
      job.stop();
      this.jobs.delete(jobName);
    }

    const config = this.jobConfigs.get(jobName);
    if (config) {
      config.enabled = false;
    }
  }
}

// =============================================================================
// GLOBAL CRON MANAGER INSTANCE
// =============================================================================

export const cronManager = new EnterpriseCronManager();

// =============================================================================
// CRON JOB EXPORTS
// =============================================================================

export { EnterpriseCronManager };
export type { CronJobConfig };
