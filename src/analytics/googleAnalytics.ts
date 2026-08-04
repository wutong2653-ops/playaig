type DataLayerEntry = IArguments | Record<string, unknown>;

type HistoryMethod = "pushState" | "replaceState";

declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
    gtag: (...args: unknown[]) => void;
    testGA?: () => boolean;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();
const GA4_ID_PATTERN = /^G-[A-Z0-9]+$/;
let isInitialized = false;
let navigationTrackingInstalled = false;
let lastTrackedLocation = "";

function pageLocationKey(): string {
  return `${window.location.pathname}${window.location.search}`;
}

/**
 * Queues one GA4 page_view for the current location. The gtag loader processes
 * queued commands as soon as it has loaded, so this is safe during startup.
 */
export function trackGoogleAnalyticsPageView(): boolean {
  if (!isInitialized || !MEASUREMENT_ID || !window.gtag) {
    return false;
  }

  const locationKey = pageLocationKey();
  if (locationKey === lastTrackedLocation) {
    return false;
  }

  lastTrackedLocation = locationKey;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });

  return true;
}

function installNavigationTracking(): void {
  if (navigationTrackingInstalled) {
    return;
  }

  navigationTrackingInstalled = true;
  (["pushState", "replaceState"] as const).forEach((method: HistoryMethod) => {
    const original = window.history[method];
    window.history[method] = function trackedHistoryChange(
      this: History,
      ...args: Parameters<History[typeof method]>
    ) {
      const result = original.apply(this, args);
      window.queueMicrotask(trackGoogleAnalyticsPageView);
      return result;
    };
  });

  window.addEventListener("popstate", trackGoogleAnalyticsPageView);
}

function loadGoogleTag(): void {
  if (!MEASUREMENT_ID || document.querySelector(`script[data-ga4-id="${MEASUREMENT_ID}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.ga4Id = MEASUREMENT_ID;
  script.dataset.ga4Status = "loading";
  script.addEventListener("load", () => {
    script.dataset.ga4Status = "loaded";
  });
  script.addEventListener("error", () => {
    script.dataset.ga4Status = "error";
    console.error("GA4 tracking script could not be loaded. Check content blocking or network policy.");
  });
  document.head.appendChild(script);
}

function installDebugTest(): void {
  window.testGA = () => {
    if (!isInitialized || !window.gtag) {
      return false;
    }

    window.gtag("event", "debug_test", {
      send_to: MEASUREMENT_ID,
      debug_mode: true,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
    });
    return true;
  };
}

export function initializeGoogleAnalytics(): boolean {
  if (!MEASUREMENT_ID || !GA4_ID_PATTERN.test(MEASUREMENT_ID)) {
    console.warn("GA4 tracking is disabled: VITE_GA4_MEASUREMENT_ID is missing or invalid.");
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    // Google Tag expects the native Arguments object, not an Array created by
    // rest parameters. Its destination router only transports the former.
    // eslint-disable-next-line prefer-rest-params -- required gtag transport contract.
    window.dataLayer.push(arguments);
  };

  if (isInitialized) {
    return true;
  }

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    // Page views are sent explicitly below so SPA navigation can be tracked
    // without duplicate automatic page_view events.
    send_page_view: false,
    debug_mode: import.meta.env.VITE_GA4_DEBUG === "true",
  });
  isInitialized = true;

  loadGoogleTag();
  installNavigationTracking();
  installDebugTest();
  trackGoogleAnalyticsPageView();

  return true;
}
