import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

// --- Auto-recovery uudelle deploylle ------------------------------------
// Kun uusi versio julkaistaan, vanhan välilehden lataamat koodipalat
// (hashatut chunkit, esim. Wholesale-XXXX.js) eivät enää ole olemassa.
// Tällöin lazy-ladattu sivu epäonnistuu: "Failed to fetch dynamically
// imported module". Ladataan sivu silloin automaattisesti uudelleen, jolloin
// selain hakee tuoreen index.html:n + uudet chunkit. Throttle estää
// loputtoman uudelleenlataus-silmukan jos pala on aidosti rikki.
function reloadOnceForStaleChunk() {
  const KEY = "ld-chunk-reload-ts";
  const last = Number(sessionStorage.getItem(KEY) || "0");
  const now = Date.now();
  if (now - last > 10000) {
    sessionStorage.setItem(KEY, String(now));
    window.location.reload();
    return true;
  }
  return false;
}

// Vite emittoi tämän tapahtuman kun dynaaminen import epäonnistuu.
window.addEventListener("vite:preloadError", (event) => {
  if (reloadOnceForStaleChunk()) {
    event.preventDefault();
  }
});

// Varmistus: jotkin chunk-virheet tulevat tavallisina rejektioina.
window.addEventListener("unhandledrejection", (event) => {
  const msg = String(event?.reason?.message || event?.reason || "");
  if (
    /dynamically imported module|Importing a module script failed|error loading dynamically imported/i.test(
      msg
    )
  ) {
    if (reloadOnceForStaleChunk()) {
      event.preventDefault();
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
