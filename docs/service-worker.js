importScripts("/FrontEnd/precache-manifest.d91a927a1b9b60ae83fd76c81508f397.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
	console.log(`Workbox didn't load`);
}

