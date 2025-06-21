const CACHE_NAME = 'risk02-v1.0.0';
const urlsToCache = [
  'https://tcc-ai.github.io/Risk02/',
  'https://tcc-ai.github.io/Risk02/index.html',
  'https://tcc-ai.github.io/Risk02/style.css',
  'https://tcc-ai.github.io/Risk02/script.js',
  'https://tcc-ai.github.io/Risk02/manifest.json'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ 快取已開啟');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ 快取失敗:', error);
      })
  );
});

// 攔截網路請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果快取中有，就回傳快取版本
        if (response) {
          return response;
        }
        // 否則從網路取得
        return fetch(event.request);
      })
  );
});

// 更新 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
