module.exports = {
	outputDir: "docs"
	pwa: {
		name: "circles.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/sw.js"
		}
	},
};
