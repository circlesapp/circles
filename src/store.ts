import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userToken: "",
		userInformation: null
	},
	mutations: {
		setUserToken(state, data) {
			state.userToken = data;
		},
		setUserInformation(state, data) {
			state.userInformation = data;
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
		}
	}
});
