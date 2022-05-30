const TicTacToeGame = 'Tic-Tac-Toe-Game-v1';
const assets = ['../index.html', '../css/main.css', './App.js', '../images/favicon-32x32.png', '../images/icon-o-outline.svg', '../images/icon-x-outline.svg', '../images/icon-o.svg', '../images/icon-restart.svg', '../images/logo.svg'];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(TicTacToeGame).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
