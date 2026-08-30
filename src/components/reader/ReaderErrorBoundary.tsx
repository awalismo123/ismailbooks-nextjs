"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ReaderErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ReaderErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-red-900">
          <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Khalad ayaa dhacay.</h2>
          <p className="text-sm text-center max-w-md opacity-80 mb-6">
            Cillad lama filaan ah ayaa ku timid akhriska buugga. Fadlan dib u load geli bogga.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Dib u load
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
