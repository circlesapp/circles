if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
	self.addEventListener("install", e => {
		self.skipWaiting();
	});
	self.addEventListener("push", function(event) {
		console.log(event);
		var options = {
			body: "circles. 서비스를 이용해주셔서 감사합니다.",
			icon: "logo_192.png",
			vibrate: [100, 50, 100]
		};
		event.waitUntil(registration.showNotification("circles.", options));
	});
} else {
	console.log(`Workbox didn't load`);
}
