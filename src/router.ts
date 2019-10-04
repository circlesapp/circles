import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Page from "./views/Page.vue";
import Community from "./views/Community.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/page",
			name: "page",
			component: Page
		},
		{
			path: "/community",
			name: "community",
			component: Community
		}
	]
});
