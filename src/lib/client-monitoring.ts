import { reportLovableError } from "./lovable-error-reporting";

// Browser-side monitoring: surfaces uncaught errors, unhandled promise
// rejections, and failed network requests (including ERR_CONNECTION_RESET)
// in the console AND forwards them to Lovable's error reporting pipeline.

let installed = false;

export function installClientMonitoring() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    console.error("[client-error]", event.message, event.error ?? event);
    reportLovableError(event.error ?? new Error(event.message), {
      kind: "window.onerror",
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("[unhandled-rejection]", event.reason);
    const err = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    reportLovableError(err, { kind: "unhandledrejection" });
  });

  // Wrap fetch so we log every request + capture network failures
  // (ERR_CONNECTION_RESET, DNS errors, offline, CORS, aborts).
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    const started = performance.now();
    try {
      const res = await originalFetch(input, init);
      const ms = Math.round(performance.now() - started);
      const tag = res.ok ? "fetch" : "fetch-bad";
      console.log(`[${tag}] ${method} ${url} -> ${res.status} ${ms}ms`);
      if (!res.ok && res.status >= 500) {
        reportLovableError(new Error(`HTTP ${res.status} on ${method} ${url}`), {
          kind: "fetch-http-error",
          status: res.status,
          url,
          method,
        });
      }
      return res;
    } catch (error) {
      const ms = Math.round(performance.now() - started);
      console.error(`[fetch-fail] ${method} ${url} after ${ms}ms`, error);
      reportLovableError(error instanceof Error ? error : new Error(String(error)), {
        kind: "fetch-network-error",
        url,
        method,
        ms,
      });
      throw error;
    }
  };

  console.log("[monitoring] client error + fetch logging installed");
}
