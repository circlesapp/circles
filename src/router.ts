import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PasswordChange from "./views/PasswordChange.vue";
import Page from "./views/Page.vue";
import Timeline from "./views/Page/Timeline.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "topbar/home",
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
			path: "/:club/page",
            name: "club",
            component: Page,
			children: [{ path: "timeline", component: Timeline }]
		}
	]
});
