import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">&#x1F3AF;</div>
            <h1 className="text-2xl font-bold text-white mb-4">Jokin meni pieleen</h1>
            <p className="text-gray-400 mb-8">
              Pahoittelut! Sivulla tapahtui odottamaton virhe. Yrit\u00e4 ladata sivu uudelleen.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Lataa uudelleen
            </button>
            <p className="text-gray-600 text-xs mt-6">
              {this.state.error?.message}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
