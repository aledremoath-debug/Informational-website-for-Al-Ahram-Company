const CACHE_NAME = 'al-ahram-cache-v17'; // Increment version
const urlsToCache = [
    './',
    './index.html',
    './services.html',
    './about.html',
    './contact.html',
    './css/style.css',
    './css/tech-enhancements.css',
    './css/technologies.css',
    './css/responsive-fixed.css',
    './js/main.js',
    './manifest.json',
    './icons/icon.svg',
    './images/hero-premium.png'
];

// Add image assets to cache
const imageAssets = [
    './images3/A_hyper-realistic_industrial_scene_of_a_powerful_w-1767032910113.webp',
    './images3/A_photorealistic_depiction_of_a_dramatic_laser_cut-1767032925979.webp',
    './images3/A_CNC_bending_machine_Ermaksan_3100_standing_pro-1767034490452.webp',
    './images3/A_powerful_industrial_plate_rolling_machine_in_a_f-1767034143051.webp',
    './images3/A_photorealistic_image_of_industrial_shearing_usin-1767032957267.webp',
    './images3/A_dynamic_industrial_scene_focused_on_a_powerful_h-1767034479176.webp',
    './images3/A_photorealistic_depiction_of_a_metal_bending_mach-1767032970844.webp',
    './images3/An_industrial_scene_depicting_the_rolling_and_asse-1767034160779.webp',
    './images3/An_artistic_representation_of_winding_rockets_feat-1767034510787.webp'
];

const allAssets = [...urlsToCache, ...imageAssets];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Pre-caching Core Assets');
                return cache.addAll(allAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('SW: Clearing Old Cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event (Stale-While-Revalidate Strategy)
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    // Skip tracking for external resources or non-GET requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
                // Return cache immediately if available, then update in background
                return response || fetchPromise;
            });
        })
    );
});
