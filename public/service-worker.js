if (workbox) {
	console.log(`Workbox is loaded`);

	self.addEventListener("push", e => {
		console.log("self outline push : ", e);
	});
	addEventListener("push", e => {
		console.log("outline push : ", e);
	});

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
	console.log(`Workbox didn't load`);
}
