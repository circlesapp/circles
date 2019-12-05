import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const event = require("vue-analytics").event;

Vue.use(Vuex);

interface LoadingData {
	name: string;
	message: string;
}

export default new Vuex.Store({
	state: {
		userToken: ``,
		userInformation: {},
		club: {} as any,
		// mainPath : "http://localhost:3000/"
		mainPath: `https://circlesapp.kr/api/`,
		loadingStack: [] as LoadingData[],
		pageLoadingStack: [] as LoadingData[],
		showNoticeTimer: 0 as number,
		showNotice: false,
		noticeContent: ``
	},
	mutations: {
		setUserToken(state, data) {
			state.userToken = data;
			event("mutation", "setUserToken", "userToken", state.userToken);
		},
		setUserInformation(state, data) {
			state.userInformation = data;
			event("mutation", "setUserInformation", "userInformation", state.userInformation);
		},
		setClub(state, data) {
			state.club = data;
			event("mutation", "setClub", "club", state.club);
		},
		pushLoading(state, data: LoadingData) {
			state.loadingStack.push(data);
		},
		clearLoading(state, data: string) {
			let idx = state.loadingStack.findIndex((loadingData: LoadingData) => loadingData.name == data);
			if (idx != -1) state.loadingStack.splice(idx, 1);
		},
		pushPageLoading(state, data: LoadingData) {
			state.pageLoadingStack.push(data);
		},
		clearPageLoading(state, data: string) {
			let idx = state.pageLoadingStack.findIndex((pageLoadingData: LoadingData) => pageLoadingData.name == data);
			if (idx != -1) state.pageLoadingStack.splice(idx, 1);
		},
		showNotice(state, data: any) {
			clearTimeout(state.showNoticeTimer);
			state.showNoticeTimer = setTimeout(() => {
				state.showNotice = false;
			}, 5000);
			state.showNotice = true;
			state.noticeContent = data;
		},
		closeNotice(state) {
			clearTimeout(state.showNoticeTimer);
			state.showNotice = false;
		}
	},
	actions: {
		LOGIN({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/login`, data)
					.then(user => {
						commit(`setUserToken`, user.data.data);
						event("action", "LOGIN", "login", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		REGISTER({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/register`, data)
					.then(user => {
						commit(`setUserToken`, user.data.data);
						event("action", "REGISTER", "register", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		SET_PROFILE_IMAGE({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/changeProfileImage`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(user => {
						event("action", "SET_PROFILE_IMAGE", "set_profile_image", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_ALARM({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/getAlarm`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(user => {
						event("action", "GET_ALARM", "get_alarm", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		REMOVE_ALARM({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/removeAlarm`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(user => {
						event("action", "REMOVE_ALARM", "remove_alarm", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		REMOVE_ALL_ALARM({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/removeAllAlarm`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(user => {
						event("action", "REMOVE_ALL_ALARM", "remove_all_alarm", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		SET_CLUB_IMAGE({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/admin/changeClubImage`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(user => {
						event("action", "SET_CLUB_IMAGE", "set_club_image", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_ALL_CLUB({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/getAllClubs`)
					.then(user => {
						event("action", "GET_ALL_CLUB", "get_all_club", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_USER_PROFILE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				let pushSubscription = data.pushSubscription;
				let pushSubscriptionJson = null;
				if (pushSubscription) pushSubscriptionJson = JSON.parse(pushSubscription);

				axios
					.post(`${state.mainPath}auth/getProfile`, pushSubscriptionJson, {
						headers: {
							Authorization: data.token
						}
					})
					.then(user => {
						commit(`setUserInformation`, user.data.data);
						event("action", "GET_USER_PROFILE", "get_user_profile", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},

		GET_CLUB({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/getClubInformation`, {
						params: {
							name: data
						}
					})
					.then(user => {
						commit(`setClub`, user.data.data);
						event("action", "GET_CLUB", "get_club", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_POSTS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/post/getPublicPosts`, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(posts => {
						event("action", "GET_CLUB_POSTS", "get_club_posts", posts.data.data);
						resolve(posts.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_WRITE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/write`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(post => {
						event("action", "POST_WRITE", "post_write", post.data.data);
						resolve(post.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/delete`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(post => {
						event("action", "POST_DELETE", "post_delete", post.data.data);
						resolve(post.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_MODIFICATION({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/modification`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(post => {
						event("action", "POST_MODIFICATION", "post_modification", post.data.data);
						resolve(post.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_TOGGLE_LIKE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/toggleLike`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(result => {
						event("action", "POST_TOGGLE_LIKE", "post_toggle_like", result.data.data);
						resolve(result.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_COMMENT({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/getPublicPostComments`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(result => {
						event("action", "POST_COMMENT", "post_comment", result.data.data);
						resolve(result.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_COMMENT_WRITE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/comment/write`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(result => {
						event("action", "POST_COMMENT_WRITE", "post_comment_write", result.data.data);
						resolve(result.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		POST_COMMENT_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/post/comment/delete`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(result => {
						event("action", "POST_COMMENT_DELETE", "post_comment_delete", result.data.data);
						resolve(result.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_MY_APPLICANT({ state, commit }) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/applicant/getMyApplicant`, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "GET_MY_APPLICANT", "get_my_applicant", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_APPLICANT({ state, commit }) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/getClubApplications`, null, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applications => {
						event("action", "GET_CLUB_APPLICANT", "get_club_applicant", applications.data.data);
						resolve(applications.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		APPLICANT({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/apply`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "APPLICANT", "applicant", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		APPLICANT_ACCEPT({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/accept`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "APPLICANT_ACCEPT", "applicant_accept", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		APPLICANT_REJECT({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/reject`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "APPLICANT_REJECT", "applicant_reject", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		APPLICANT_MODIFICATION({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/modification`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "APPLICANT_MODIFICATION", "applicant_modification", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_CALENDAR({ state, commit }) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/calendar/getPublicCalendars`, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applications => {
						event("action", "GET_CLUB_CALENDAR", "get_club_calendar", applications.data.data);
						resolve(applications.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CALENDAR({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/calendar/write`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "CALENDAR", "calendar", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CALENDAR_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/calendar/delete`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
						event("action", "CALENDAR_DELETE", "calendar_delete", applicant.data.data);
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_AWARDS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/award/getPublicAwards`)
					.then(awards => {
						resolve(awards.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		AWARD({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/award/write`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(award => {
						event("action", "AWARD", "award", award.data.data);
						resolve(award.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		AWARD_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/award/delete`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(award => {
						event("action", "AWARD_DELETE", "award_delete", award.data.data);
						resolve(award.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		BUDGET({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/budget/write`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(budget => {
						event("action", "BUDGET", "budget", budget.data.data);
						resolve(budget.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		BUDGET_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/budget/delete`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(budget => {
						event("action", "BUDGET_DELETE", "budget_delete", budget.data.data);
						resolve(budget.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_MEMBERS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/member/getPublicMembers`)
					.then(members => {
						event("action", "GET_CLUB_MEMBERS", "get_club_members", members.data.data);
						resolve(members.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_DETAIL_MEMBERS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/member/getDetailMembers`, null, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(members => {
						event("action", "GET_CLUB_DETAIL_MEMBERS", "get_club_detail_members", members.data.data);
						resolve(members.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_BUDGETS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`${state.mainPath}club/${state.club.name}/budget/getPublicBudgets`)
					.then(budgets => {
						event("action", "GET_CLUB_BUDGETS", "get_club_budgets", budgets.data.data);
						resolve(budgets.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CLUB_MODIFICATION({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/admin/modification`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(club => {
						commit("setClub", club.data.data);
						event("action", "CLUB_MODIFICATION", "club_modificaion", club.data.data);
						resolve(club.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CLUB_CREATE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/create`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(club => {
						event("action", "CLUB_CREATE", "club_create", club.data.data);
						resolve(club.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CLUB_DELETE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/admin/closure`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(club => {
						event("action", "CLUB_DELETE", "club_delete", club.data.data);
						resolve(club.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		CLUB_FIRE_MEMBER({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}club/${state.club.name}/admin/fireMember`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(club => {
						event("action", "CLUB_FIRE_MEMBER", "club_fire_member", club.data.data);
						resolve(club.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	}
});
