import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/** Tunnistaa vanhentuneen koodipalan lataus­virheen (uusi deploy). */
function isStaleChunkError(error: Error | null): boolean {
  const msg = error?.message || "";
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported|Failed to fetch/i.test(
    msg
  );
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

    // Jos virhe johtuu vanhentuneesta koodipalasta (uusi versio julkaistu),
    // ladataan sivu kerran automaattisesti uudelleen — käyttäjä ei näe virhettä.
    if (isStaleChunkError(error)) {
      const KEY = "ld-chunk-reload-ts";
      const last = Number(sessionStorage.getItem(KEY) || "0");
      const now = Date.now();
      if (now - last > 10000) {
        sessionStorage.setItem(KEY, String(now));
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Vanhentunut chunk → näytetään neutraali lataustila uudelleenlatauksen ajaksi
      if (isStaleChunkError(this.state.error)) {
        return <div className="min-h-screen bg-black" />;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">&#x1F3AF;</div>
            <h1 className="text-2xl font-bold text-white mb-4">Jokin meni pieleen</h1>
            <p className="text-gray-400 mb-8">
              Pahoittelut! Sivulla tapahtui odottamaton virhe. Yritä ladata sivu uudelleen.
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
