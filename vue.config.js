module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw-dev4.js"
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
