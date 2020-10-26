importScripts('js/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/detail.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  }
], {
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "api",
  })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
 new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google font",
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|css|js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'assets'
  })
);