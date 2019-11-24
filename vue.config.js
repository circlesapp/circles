module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw-dev2.js"
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
