import Vue from "vue";
import Router from "vue-router";
import VueAnalytics from "vue-analytics";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Search from "./views/Search.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PasswordChange from "./views/PasswordChange.vue";
import Sitemap from "./views/Sitemap.vue";
import Page from "./views/Page.vue";
import Site from "./views/Site.vue";
import Community from "./views/Community.vue";
import Timeline from "./views/Page/Timeline.vue";
import Awards from "./views/Page/Awards.vue";
import Members from "./views/Page/Members.vue";
import Budgets from "./views/Page/Budgets.vue";
import Applicant from "./views/Page/Applicant.vue";
import ApplicantMain from "./views/Page/Applicant/Applicant.vue";
import Application from "./views/Page/Applicant/Application.vue";
import Recorder from "./views/Page/Applicant/Recorder.vue";
import Result from "./views/Page/Applicant/Result.vue";
import Editor from "./views/Community/Editor.vue";
import EditClub from "./views/Community/EditClub.vue";
import AttendanceSheet from "./views/Community/AttendanceSheet.vue";
import Calendar from "./views/Community/Calendar.vue";
import CommunityMembers from "./views/Community/Members.vue";
import CommunityApplication from "./views/Community/Application.vue";
import Interview from "./views/Community/Interview.vue";
import Page404 from "./views/Page404.vue";

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
			component: Profile
		},
		{
			path: "/search",
			name: "search",
			component: Search
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
			path: "/sitemap",
			name: "sitemap",
			component: Sitemap
		},
		{
			path: "/:club",
			name: "site",
			component: Site
		},
		{
			path: "/:club/page",
			name: "page",
			component: Page,
			children: [
				{ path: "timeline", name: "page/timeline", component: Timeline },
				{ path: "awards", name: "page/awards", component: Awards },
				{ path: "members", name: "page/members", component: Members },
				{ path: "budgets", name: "page/budgets", component: Budgets },
				{
					path: "applicant",
					component: Applicant,
					children: [
						{ path: "", name: "page/applicant/main", component: ApplicantMain },
						{ path: "application", name: "page/applicant/application", component: Application },
						{ path: "recorder", name: "page/applicant/recorder", component: Recorder },
						{ path: "result", name: "page/applicant/result", component: Result }
					]
				}
			]
		},
		{
			path: "/:club/community",
			name: "community",
			component: Community,
			children: [
				{ path: "editor", name: "community/editor", component: Editor },
				{ path: "editclub", name: "community/editclub", component: EditClub },
				{ path: "attendanceSheet", name: "community/attendanceSheet", component: AttendanceSheet },
				{ path: "calendar", name: "community/calendar", component: Calendar },
				{ path: "members", name: "community/members", component: CommunityMembers },
				{ path: "application", name: "community/application", component: CommunityApplication },
				{ path: "interview", name: "community/interview", component: Interview }
			]
		},
		{
			path: "/*",
			name: "page404",
			component: Page404
		}
	]
});

Vue.use(VueAnalytics, {
	id: "UA-117534654-3",
	router
});

export default router;
