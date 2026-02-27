'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryState, ApiError } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Bug } from 'lucide-react';
import { toast } from 'sonner';
import { captureException } from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    const errorId = this.generateErrorId();
    const enhancedError = this.enhanceError(error, errorInfo, errorId);

    console.error('ErrorBoundary caught an error:', enhancedError);

    // Send to Sentry if available
    if (typeof window !== 'undefined') {
      captureException(enhancedError, {
        tags: {
          component: 'ErrorBoundary',
          errorId,
        },
        extra: {
          errorInfo,
          userAgent: navigator.userAgent,
          url: window.location.href,
        },
      });
    }

    // Show user-friendly notification
    toast.error('Something went wrong', {
      description: 'We\'ve been notified and will fix this soon.',
      action: {
        label: 'Report Issue',
        onClick: () => this.handleReportIssue(enhancedError, errorInfo),
      },
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(enhancedError, errorInfo);
    }
  }

  private generateErrorId(): string {
    return 'err_' + Math.random().toString(36).substr(2, 9);
  }

  private enhanceError(error: Error, errorInfo: ErrorInfo, errorId: string): Error {
    const enhancedError = new Error(error.message);
    enhancedError.name = error.name;
    enhancedError.stack = error.stack;
    
    // Add additional context
    (enhancedError as any).errorId = errorId;
    (enhancedError as any).componentStack = errorInfo.componentStack;
    (enhancedError as any).timestamp = new Date().toISOString();
    
    if (typeof window !== 'undefined') {
      (enhancedError as any).userAgent = navigator.userAgent;
      (enhancedError as any).url = window.location.href;
      (enhancedError as any).viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    return enhancedError;
  }

  private handleReportIssue(error: Error, errorInfo: ErrorInfo) {
    const errorDetails = {
      errorId: (error as any).errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: (error as any).timestamp,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Log detailed error information
    console.group('🐛 Detailed Error Report');
    console.error('Error ID:', errorDetails.errorId);
    console.error('Message:', errorDetails.message);
    console.error('Stack:', errorDetails.stack);
    console.error('Component Stack:', errorDetails.componentStack);
    console.error('Timestamp:', errorDetails.timestamp);
    console.error('User Agent:', errorDetails.userAgent);
    console.error('URL:', errorDetails.url);
    console.groupEnd();

    // Copy error details to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2)).then(() => {
      toast.success('Error details copied to clipboard');
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
    });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Bug className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Don't worry, we've been notified
              and will get this fixed as soon as possible.
            </p>

            <div className="space-y-3">
              <Button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                variant="outline"
                onClick={this.handleReload}
                className="w-full"
              >
                Reload Page
              </Button>

              <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                <AlertCircle className="w-3 h-3 mr-1" />
                Error ID: {(this.state.error as any)?.errorId || 'Unknown'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// API Error Boundary for API calls
export class ApiErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('API ErrorBoundary caught an error:', error, errorInfo);
    
    // Show toast notification for API errors
    toast.error('API Error', {
      description: error.message || 'An error occurred while communicating with the server.',
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">API Error:</span>
            <span>{this.state.error?.message || 'Unable to load data'}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Network Error Boundary for network issues
export class NetworkErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Network ErrorBoundary caught an error:', error, errorInfo);
    
    // Check if it's a network error
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      toast.error('Network Error', {
        description: 'Please check your internet connection and try again.',
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-800">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Network Error:</span>
            <span>Please check your connection</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export error handling utilities
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<Props>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `WithErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Error recovery utilities
export const errorRecovery = {
  retryWithBackoff: async <T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> => {
    let lastError: Error;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (i === maxRetries) {
          throw lastError;
        }
        
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  },

  handleValidationError: (error: ApiError) => {
    if (error.code === 'VALIDATION_ERROR') {
      toast.error('Validation Error', {
        description: error.message,
      });
      return true;
    }
    return false;
  },

  handleAuthError: (error: ApiError) => {
    if (error.code === 'UNAUTHORIZED' || error.code === 'FORBIDDEN') {
      // Redirect to login or show auth error
      toast.error('Authentication Required', {
        description: 'Please log in to continue.',
      });
      return true;
    }
    return false;
  },
};