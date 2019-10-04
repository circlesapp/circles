module.exports = {
	pwa: {
		name: "club.",
		themeColor: "#538fff",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "public/service-worker.js"
		}
	},
	publicPath: process.env.NODE_ENV === "production" ? "/FrontEnd/" : "/",
	outputDir: "docs"
};
