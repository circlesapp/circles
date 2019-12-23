import Vue from "vue";
import Router from "vue-router";
import VueAnalytics from "vue-analytics";
import Home from "@/views/Home.vue";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import("./views/Profile.vue")
		},
		{
			path: "/search",
			name: "search",
			component: () => import("./views/Search.vue")
		},
		{
			path: "/login",
			name: "login",
			component: () => import("./views/Login.vue")
		},
		{
			path: "/register",
			name: "register",
			component: () => import("./views/Register.vue")
		},
		{
			path: "/passwordchange",
			name: "passwordchange",
			component: () => import("./views/PasswordChange.vue")
		},
		{
			path: "/sitemap",
			name: "sitemap",
			component: () => import("./views/Sitemap.vue")
		},
		{
			path: "/:club",
			name: "site",
			component: () => import("./views/Site.vue")
		},
		{
			path: "/:club/page",
			name: "page",
			component: () => import("./views/Page.vue"),
			children: [
				{ path: "timeline", name: "page/timeline", component: () => import("./views/Page/Timeline.vue") },
				{ path: "awards", name: "page/awards", component: () => import("./views/Page/Awards.vue") },
				{ path: "members", name: "page/members", component: () => import("./views/Page/Members.vue") },
				{ path: "budgets", name: "page/budgets", component: () => import("./views/Page/Budgets.vue") },
				{
					path: "applicant",
					component: () => import("./views/Page/Applicant.vue"),
					children: [
						{ path: "", name: "page/applicant/main", component: () => import("./views/Page/Applicant/Applicant.vue") },
						{ path: "application", name: "page/applicant/application", component: () => import("./views/Page/Applicant/Application.vue") },
						{ path: "recorder", name: "page/applicant/recorder", component: () => import("./views/Page/Applicant/Recorder.vue") },
						{ path: "result", name: "page/applicant/result", component: () => import("./views/Page/Applicant/Result.vue") }
					]
				}
			]
		},
		{
			path: "/:club/community",
			name: "community",
			component: () => import("./views/Community.vue"),
			children: [
				{ path: "editor", name: "community/editor", component: () => import("./views/Community/Editor.vue") },
				{ path: "editclub", name: "community/editclub", component: () => import("./views/Community/EditClub.vue") },
				{ path: "attendanceSheet", name: "community/attendanceSheet", component: () => import("./views/Community/AttendanceSheet.vue") },
				{ path: "calendar", name: "community/calendar", component: () => import("./views/Community/Calendar.vue") },
				{ path: "members", name: "community/members", component: () => import("./views/Community/Members.vue") },
				{ path: "application", name: "community/application", component: () => import("./views/Community/Application.vue") },
				{ path: "interview", name: "community/interview", component: () => import("./views/Community/Interview.vue") }
			]
		},
		{
			path: "/*",
			name: "page404",
			component: () => import("./views/Page404.vue")
		}
	]
});

Vue.use(VueAnalytics, {
	id: "UA-117534654-3",
	router
});

export default router;
