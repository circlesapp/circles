importScripts("/FrontEnd/precache-manifest.cf2b5054802f4e5fac636d4307059f57.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
	console.log(`Workbox didn't load`);
}

