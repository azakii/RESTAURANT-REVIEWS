let staticCacheName = 'restaurant-static-v';

// let randomNumber = Math.floor(Math.random() * 10);
// let cacheID = randomNumber;
// staticCacheName += cacheID

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./css/resposive.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/sw_register.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'					
			]);
		})
	);
});

self.addEventListener('activate', (event)  => {
	console.log(staticCacheName);
	event.waitUntil(
		caches.keys()
		.then((cacheNames) =>  {
			return Promise.all(
				cacheNames.filter((cacheName) => {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != staticCacheName;
				}).map((cacheName) =>  {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
	  caches.match(event.request).then((resp) => {
		return resp || fetch(event.request).then((response) => {
		  let responseClone = response.clone();
		  caches.open('staticCacheName').then((cache) => {
			cache.put(event.request, responseClone);
		  });
  
		  return response;
		});
	  }).catch(() => {
		return caches.match('./img/error.png');
	  })
	);
  });
  
