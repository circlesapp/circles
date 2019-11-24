if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);

	// FIXME: 이벤트 작동 안함
	addEventListener("push", function(event) {
		console.log(event);
		var options = {
			body: "circles. 서비스를 이용해주셔서 감사합니다.",
			icon: "logo_192.png",
			vibrate: [100, 50, 100]
		};
		navigator.serviceWorker.getRegistration().then(function(reg) {
			console.log(reg);
			event.waitUntil(reg.showNotification("circles.", options));
		});
	});
} else {
	console.log(`Workbox didn't load`);
}
