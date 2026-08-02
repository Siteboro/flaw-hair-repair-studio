(() => {
  const script = document.currentScript;
  const params = new URLSearchParams(window.location.search);
  const leadId = (params.get("lead") || script?.dataset.defaultLead || "").trim().slice(0, 120);

  if (!leadId || params.get("owner") === "1") return;

  const config = {
    endpoint: "https://app.siteboro.com/api/lead-events",
    siteHost: window.location.hostname,
    siteName: script?.dataset.siteName || document.title,
    siteSlug: script?.dataset.siteSlug || window.location.hostname.split(".")[0],
  };
  const visitorStorageKey = "siteboro-lead-visitor";
  let visitorId = window.localStorage.getItem(visitorStorageKey);

  if (!visitorId) {
    visitorId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(visitorStorageKey, visitorId);
  }

  const send = (type) => {
    const body = JSON.stringify({ ...config, leadId, pageUrl: window.location.href, type, visitorId });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(config.endpoint, new Blob([body], { type: "text/plain" }));
      return;
    }
    void fetch(config.endpoint, { body, keepalive: true, method: "POST", mode: "no-cors" });
  };

  const openedKey = `siteboro-opened:${leadId}:${config.siteSlug}`;
  if (!window.sessionStorage.getItem(openedKey)) {
    window.sessionStorage.setItem(openedKey, "1");
    send("preview_opened");
  }

  document.querySelectorAll("a[href]").forEach((anchor) => {
    try {
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin) {
        url.searchParams.set("lead", leadId);
        anchor.href = url.toString();
      } else if (url.hostname === "app.siteboro.com" && url.pathname.startsWith("/lets-go")) {
        url.searchParams.set("lead", leadId);
        url.searchParams.set("site", config.siteSlug);
        url.searchParams.set("siteHost", config.siteHost);
        url.searchParams.set("siteName", config.siteName);
        url.searchParams.set("visitor", visitorId);
        anchor.href = url.toString();
      }
    } catch {
      // Ignore telephone, email, and malformed links.
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest("a, button") : null;
    if (!target) return;
    const href = target instanceof HTMLAnchorElement ? target.href : "";
    const label = (target.textContent || "").trim().toLowerCase();
    const isPurchaseAction = href.includes("app.siteboro.com/lets-go") || /buy|satın al|beğendiysen|şimdi al|like it/.test(label);
    if (isPurchaseAction) send("buy_clicked");
  }, true);
})();
