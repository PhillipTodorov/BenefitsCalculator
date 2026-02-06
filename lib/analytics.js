export function trackEvent(name, payload = {}) {
  // Placeholder for future analytics integration.
  // Can be wired to Google Analytics, Plausible, or Vercel Analytics.
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, payload);
  }
}
