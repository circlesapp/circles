import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userToken: "",
		userInformation: {},
		club: {} as any,
		mainPath: "http://localhost:3000/"
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
		LOGIN({ commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post("http://localhost:3000/auth/login", data)
					.then(user => {
						commit("setUserToken", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		REGISTER({ commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post("http://localhost:3000/auth/register", data)
					.then(user => {
						commit("setUserToken", user.data.data);
						resolve(user.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_MY_APPLICANT({ state, commit }) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`http://localhost:3000/club/${state.club.name}/applicant/getMyApplicant`, {
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
					.post(`http://localhost:3000/club/${state.club.name}/applicant/apply`, data, {
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
				console.log(state.userToken);
				axios
					.post(`http://localhost:3000/club/${state.club.name}/applicant/modification`, data, {
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
		GET_USER_PROFILE({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.post("http://localhost:3000/auth/getProfile", null, {
						headers: {
							Authorization: data
						}
					})
					.then(user => {
						commit("setUserInformation", user.data.data);
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
					.get("http://localhost:3000/club/getClubInformation", {
						params: {
							name: data
						}
					})
					.then(user => {
						commit("setClub", user.data.data);
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
					.get(`http://localhost:3000/club/${state.club.name}/post/getPublicPosts`)
					.then(posts => {
						resolve(posts.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_AWARDS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`http://localhost:3000/club/${state.club.name}/award/getPublicAwards`)
					.then(awards => {
						resolve(awards.data.data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		GET_CLUB_MEMBERS({ state, commit }, data) {
			return new Promise<any>((resolve, reject) => {
				axios
					.get(`http://localhost:3000/club/${state.club.name}/member/getPublicMembers`)
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
					.get(`http://localhost:3000/club/${state.club.name}/budget/getPublicBudgets`)
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
