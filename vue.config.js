module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw-dev5.js"
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
