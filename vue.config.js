module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw-dev3.js"
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
