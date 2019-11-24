if (workbox) {
	console.log(`Workbox is loaded`);

	workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
	console.log(`Workbox didn't load`);
}
self.addEventListener("push", e => {
	console.log("outline push : ", e);
});
