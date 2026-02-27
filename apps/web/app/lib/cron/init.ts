import { cronManager } from './manager';
import { logger } from './logger';

// =============================================================================
// CRON INITIALIZATION - ENTERPRISE SCHEDULER STARTUP
// Initialize and start all cron jobs with proper error handling
// =============================================================================

async function initializeCronJobs(): Promise<void> {
  try {
    logger.info('Initializing Enterprise Cron Job System');
    
    // Start all enabled jobs
    const jobStats = cronManager.getJobStats();
    const enabledJobs = Object.keys(jobStats);
    
    logger.info(`Starting ${enabledJobs.length} cron jobs`);
    
    for (const jobName of enabledJobs) {
      cronManager.startJob(jobName);
    }
    
    logger.info('Enterprise Cron Job System initialized successfully');
    
    // Log job statistics
    logger.info('Job Statistics:', jobStats);
    
  } catch (error) {
    logger.error('Failed to initialize cron jobs', error instanceof Error ? error : new Error(String(error)));
    process.exit(1);
  }
}

// Start cron jobs if this file is run directly
if (require.main === module) {
  initializeCronJobs();
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Shutting down cron jobs...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Shutting down cron jobs...');
  process.exit(0);
});

export { initializeCronJobs };
