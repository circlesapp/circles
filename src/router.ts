import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PasswordChange from "./views/PasswordChange.vue";
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
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/register",
			name: "register",
			component: Register
		},
		{
			path: "/passwordchange",
			name: "passwordchange",
			component: PasswordChange
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
