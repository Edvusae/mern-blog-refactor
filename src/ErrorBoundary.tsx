import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // TODO: Send to error logging service in production
    // Example: Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md rounded-lg border border-destructive/50 bg-card p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <h1 className="mb-2 font-heading text-2xl font-bold">
              Oops! Something went wrong
            </h1>
            <p className="mb-6 text-muted-foreground">
              We're sorry for the inconvenience. The error has been logged and we'll look into it.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 rounded-md bg-muted p-4 text-left">
                <p className="mb-2 text-sm font-semibold">Error Details:</p>
                <code className="text-xs text-destructive">
                  {this.state.error.message}
                </code>
              </div>
            )}
            <div className="flex gap-3">
              <Button onClick={this.handleReset} className="flex-1">
                Go to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;