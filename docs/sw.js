importScripts("/precache-manifest.4bdacac9da03a42205f37e7fe38735aa.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);

	self.addEventListener("push", function(event) {
		var options = {
			body: event.data.text().replace(/(<([^>]+)>)/gi, ""),
			icon: "logo_128.png",
			vibrate: [100, 50, 100]
		};
		event.waitUntil(registration.showNotification("circles.", options));
	});
} else {
	console.log(`Workbox didn't load`);
}

