self.addEventListener("push", e => {
	console.log(e);
	var options = {
		body: "circles. 서비스를 이용해주셔서 감사합니다.",
		icon: "logo_192.png",
		vibrate: [100, 50, 100]
	};
	navigator.serviceWorker.getRegistration().then(function(reg) {
		console.log(reg);
		e.waitUntil(reg.showNotification("circles.", options));
	});
});
