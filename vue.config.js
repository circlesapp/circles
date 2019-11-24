module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw.js",
			skipWaiting: true
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
