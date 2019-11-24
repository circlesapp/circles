importScripts("/precache-manifest.18ec261bb26fbba9f761977b26c403e8.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log(self);
// FIXME: 이벤트 작동 안함
self.addEventListener("push", function(event) {
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

