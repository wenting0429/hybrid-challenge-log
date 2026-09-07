const CACHE_NAME = "hybrid-challenge-log-v4-recovery-20260907";

const APP_SHELL = [
  "/",
  "/index.html",
  "/config.js",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/exercise-media.js"
];

async function cacheAvailableShell() {
  const cache = await caches.open(CACHE_NAME);

  // One missing optional file should not prevent
  // the new service worker from installing.
  await Promise.allSettled(
    APP_SHELL.map(async url => {
      const response = await fetch(url, { cache: "no-store" });

      if (response && response.ok) {
        await cache.put(url, response.clone());
      }
    })
  );
}

self.addEventListener("install", event => {
  event.waitUntil(cacheAvailableShell());
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // Do not intercept Supabase or other external services.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Always prefer the newest deployed HTML.
  if (
    request.mode === "navigate" ||
    url.pathname === "/" ||
    url.pathname === "/index.html"
  ) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(async response => {
          if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);

            await cache.put(
              "/index.html",
              response.clone()
            );
          }

          return response;
        })
        .catch(async () => {
          return (
            (await caches.match("/index.html")) ||
            (await caches.match("/"))
          );
        })
    );

    return;
  }

  // Files that may change during app updates:
  // always try the network first.
  if (
    url.pathname === "/config.js" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/exercise-media.js" ||
    url.pathname.startsWith("/animations/")
  ) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(async response => {
          if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);

            await cache.put(
              request,
              response.clone()
            );
          }

          return response;
        })
        .catch(() => caches.match(request))
    );

    return;
  }

  // Other same-origin static files:
  // use cache first, then network.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(request).then(async response => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);

          await cache.put(
            request,
            response.clone()
          );
        }

        return response;
      });
    })
  );
});
