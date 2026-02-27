import winston from 'winston';

// =============================================================================
// ENTERPRISE LOGGER - WORLD CLASS LOGGING SYSTEM
// Structured logging with multiple transports, correlation IDs, and performance tracking
// =============================================================================

interface LogContext {
  correlationId?: string;
  userId?: string;
  requestId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  duration?: number;
  type?: 'performance' | 'audit' | 'security';
  metadata?: Record<string, any>;
}

class EnterpriseLogger {
  private logger: winston.Logger;
  private static instance: EnterpriseLogger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, correlationId, userId, component, action, duration, metadata, ...meta }) => {
          return JSON.stringify({
            timestamp,
            level,
            message,
            correlationId,
            userId,
            component,
            action,
            duration,
            metadata,
            ...meta
          });
        })
      ),
      defaultMeta: {
        service: 'studioos-cms',
        version: process.env.APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      transports: [
        // Console transport for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),

        // File transport for production
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),

        new winston.transports.File({
          filename: 'logs/combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),

        // Add external logging services in production
        ...(process.env.NODE_ENV === 'production' ? [
          // Add services like Datadog, Loggly, etc.
        ] : [])
      ],
    });
  }

  public static getInstance(): EnterpriseLogger {
    if (!EnterpriseLogger.instance) {
      EnterpriseLogger.instance = new EnterpriseLogger();
    }
    return EnterpriseLogger.instance;
  }

  private log(level: string, message: string, context?: LogContext): void {
    this.logger.log(level, message, context);
  }

  public debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  public error(message: string, error?: Error | any, context?: LogContext): void {
    const errorContext = {
      ...context,
      ...(error instanceof Error ? {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      } : { error })
    };

    this.log('error', message, errorContext);
  }

  public performance(message: string, duration: number, context?: LogContext): void {
    this.info(message, { ...context, duration, type: 'performance' });
  }

  public audit(message: string, context?: LogContext): void {
    this.info(message, { ...context, type: 'audit' });
  }

  public security(message: string, context?: LogContext): void {
    this.warn(message, { ...context, type: 'security' });
  }

  public createChildLogger(context: LogContext): EnterpriseLogger {
    const child = new EnterpriseLogger();
    child.logger = this.logger.child(context);
    return child;
  }
}

export const logger = EnterpriseLogger.getInstance();
