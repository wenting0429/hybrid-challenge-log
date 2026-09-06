const CACHE_NAME = "hybrid-challenge-log-v3-daily-admin";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/exercise-media.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
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

  // 不攔截 Supabase 或其他外部服務
  if (url.origin !== self.location.origin) return;

  // 頁面導覽：優先抓最新版
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();

          caches
            .open(CACHE_NAME)
            .then(cache => cache.put("/index.html", copy));

          return response;
        })
        .catch(() => caches.match("/index.html"))
    );

    return;
  }

  // 動作資料與動畫：優先抓網路最新版
  if (
    url.pathname === "/exercise-media.js" ||
    url.pathname.startsWith("/animations/")
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches
              .open(CACHE_NAME)
              .then(cache => cache.put(request, copy));
          }

          return response;
        })
        .catch(() => caches.match(request))
    );

    return;
  }

  // 其他同網域靜態檔案：先讀 cache，沒有再抓網路
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        const copy = response.clone();

        caches
          .open(CACHE_NAME)
          .then(cache => cache.put(request, copy));

        return response;
      });
    })
  );
});
