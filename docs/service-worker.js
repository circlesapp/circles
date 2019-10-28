importScripts("/FrontEnd/precache-manifest.f1cdf8f6bd150dcbebbc0dcf350bdbbb.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
	console.log(`Workbox didn't load`);
}

