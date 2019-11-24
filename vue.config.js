module.exports = {
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw.js"
		}
	},
	//publicPath: "/",
	outputDir: "docs"
};
