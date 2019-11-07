module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/service-worker.js"
		}
	},
	publicPath: "/",
	outputDir: "docs"
};
