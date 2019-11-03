import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userToken: ``,
		userInformation: {},
		club: {} as any,
		mainPath: `http://localhost:3000/`
	},
	mutations: {
		setUserToken(state, data) {
			console.log(data);
			state.userToken = data;
		},
		setUserInformation(state, data) {
			state.userInformation = data;
		},
		setClub(state, data) {
			state.club = data;
		}
	},
	actions: {
		LOGIN({ commit, state }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/login`, data)
					.then(user => {
						commit(`setUserToken`, user.data.data);
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
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_USER_PROFILE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post(`${state.mainPath}auth/getProfile`, null, {
						headers: {
							Authorization: data
						}
					})
					.then(user => {
						commit(`setUserInformation`, user.data.data);
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
					.get(`${state.mainPath}club/${state.club.name}/post/getPublicPosts`)
					.then(posts => {
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
					.then(applicant => {
						resolve(applicant.data.data);
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
					.then(applicant => {
						resolve(applicant.data.data);
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
					.then(applicant => {
						resolve(applicant.data.data);
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
						resolve(applicant.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		APPLICANT({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				console.log(state.userToken);
				axios
					.post(`${state.mainPath}club/${state.club.name}/applicant/apply`, data, {
						headers: {
							Authorization: state.userToken
						}
					})
					.then(applicant => {
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
						resolve(award.data.data);
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
						resolve(budgets.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	}
});
