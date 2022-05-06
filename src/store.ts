import axios from 'axios';
import { createStore, StoreOptions } from 'vuex';
import { useGtag } from 'vue-gtag-next';
import { Club, User } from './types';

const { event } = useGtag();

interface LoadingData {
  name: string;
  message: string;
}

export interface RootState {
  userToken: string;
  userInformation: User;
  club: Club;
  mainPath: string;
  loadingStack: LoadingData[];
  pageLoadingStack: LoadingData[];
  showNoticeTimer: any;
  showNotice: boolean;
  noticeContent: any;
  darkTheme: boolean;
  slimMode: boolean;
}

const store: StoreOptions<RootState> = {
  state: {
    userToken: ``,
    userInformation: {
      _id: '',
      clubs: [],
      email: '',
      password: '',
      name: '',
      message: '',
      applicants: [],
      alarms: [],
      imgPath: '',
      pushSubscription: null,
      isWithdraw: false,
    },
    club: {} as any,
    mainPath: `https://circles.hyunwoo.dev/api/`,
    loadingStack: [],
    pageLoadingStack: [],
    showNoticeTimer: 0,
    showNotice: false,
    noticeContent: ``,
    darkTheme: false,
    slimMode: false,
  },
  mutations: {
    setUserToken(state, data) {
      state.userToken = data;
      event('setUserToken', {
        event_category: 'mutation',
        event_label: state.userToken,
      });
    },
    setUserInformation(state, data) {
      state.userInformation = data;
      event('setUserInformation', {
        event_category: 'mutation',
        event_label: state.userInformation,
      });
    },
    setClub(state, data) {
      state.club = data;
      event('setClub', {
        event_category: 'mutation',
        event_label: state.club,
      });
    },
    pushLoading(state, data: LoadingData) {
      state.loadingStack.push(data);
    },
    clearLoading(state, data: string) {
      let idx = state.loadingStack.findIndex(
        (loadingData: LoadingData) => loadingData.name == data
      );
      if (idx != -1) state.loadingStack.splice(idx, 1);
    },
    pushPageLoading(state, data: LoadingData) {
      state.pageLoadingStack.push(data);
    },
    clearPageLoading(state, data: string) {
      let idx = state.pageLoadingStack.findIndex(
        (pageLoadingData: LoadingData) => pageLoadingData.name == data
      );
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
    },
  },
  actions: {
    SEARCH_SCHOOL({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .get(`https://www.schoolcodekr.ml/api`, {
            params: {
              q: data,
            },
          })
          .then(school => {
            resolve(school.data.school_infos);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    LOGIN({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/login`, data)
          .then(user => {
            commit(`setUserToken`, user.data.data);
            event('auth/login', {
              event_category: 'action',
              event_label: user.data.data,
            });
            resolve(user.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    WITHDRAWACCOUNT({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/withdrawAccount`, data)
          .then(user => {
            commit(`setUserToken`, user.data.data);
            event('auth/withdrawAccount', {
              event_category: 'action',
              event_label: user.data.data,
            });
            resolve(user.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    CHANGE_INFORMATION({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/changeInformation`, data, {
            headers: {
              Authorization: state.userToken,
            },
          })
          .then(user => {
            commit(`setUserInformation`, user.data.data);
            event('auth/changeInformation', {
              event_category: 'action',
              event_label: user.data.data,
            });
            resolve(user.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    CHANGE_PASSWORD({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/changePassword`, data)
          .then(user => {
            commit(`setUserToken`, user.data.data);
            event('auth/changePassword', {
              event_category: 'action',
              event_label: user.data.data,
            });
            resolve(user.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    SEND_REGISTER_EMAIL({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/requestRegisterdByEmail`, data)
          .then(user => {
            commit(`setUserToken`, user.data.data);
            event('auth/requestRegisterdByEmail', {
              event_category: 'action',
              event_label: user.data.data,
            });
            resolve(user.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    SEND_CHANGEPASSWORD_EMAIL({ commit, state }, data) {
      return new Promise<any>((resolve, reject) => {
        axios
          .post(`${state.mainPath}auth/requestChangePassworddByEmail`, data)
          .then(user => {
            commit(`setUserToken`, user.data.data);
            event('auth/requestChangePassworddByEmail', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
            event('auth/register', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(user => {
            event('auth/changeProfileImage', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(user => {
            event('auth/getAlarm', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(user => {
            event('auth/removeAlarm', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(user => {
            event('auth/removeAllAlarm', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(user => {
            event('admin/changeClubImage', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
            event('club/getAllClubs', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: data.token,
            },
          })
          .then(user => {
            commit(`setUserInformation`, user.data.data);
            event('auth/getProfile', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              name: data,
            },
          })
          .then(user => {
            commit(`setClub`, user.data.data);
            event('club/getClubInformation', {
              event_category: 'action',
              event_label: user.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(posts => {
            event('post/getPublicPosts', {
              event_category: 'action',
              event_label: posts.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(post => {
            event('post/write', {
              event_category: 'action',
              event_label: post.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(post => {
            event('post/delete', {
              event_category: 'action',
              event_label: post.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(post => {
            event('post/modification', {
              event_category: 'action',
              event_label: post.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(result => {
            event('post/toggleLike', {
              event_category: 'action',
              event_label: result.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(result => {
            event('post/getPublicPostComments', {
              event_category: 'action',
              event_label: result.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(result => {
            event('post/comment/write', {
              event_category: 'action',
              event_label: result.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(result => {
            event('post/comment/delete', {
              event_category: 'action',
              event_label: result.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('applicant/getMyApplicant', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applications => {
            event('applicant/getClubApplications', {
              event_category: 'action',
              event_label: applications.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('applicant/apply', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('applicant/accept', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('applicant/reject', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('applicant/modification', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applications => {
            event('calendar/getPublicCalendars', {
              event_category: 'action',
              event_label: applications.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('calendar/write', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(applicant => {
            event('calendar/delete', {
              event_category: 'action',
              event_label: applicant.data.data,
            });
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
            event('award/getPublicAwards', {
              event_category: 'action',
              event_label: awards.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(award => {
            event('award/write', {
              event_category: 'action',
              event_label: award.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(award => {
            event('award/delete', {
              event_category: 'action',
              event_label: award.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(budget => {
            event('budget/write', {
              event_category: 'action',
              event_label: budget.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(budget => {
            event('budget/delete', {
              event_category: 'action',
              event_label: budget.data.data,
            });
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
            event('member/getPublicMembers', {
              event_category: 'action',
              event_label: members.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(members => {
            event('member/getDetailMembers', {
              event_category: 'action',
              event_label: members.data.data,
            });
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
            event('budget/getPublicBudgets', {
              event_category: 'action',
              event_label: budgets.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(club => {
            commit('setClub', club.data.data);
            event('admin/modification', {
              event_category: 'action',
              event_label: club.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(club => {
            event('club/create', {
              event_category: 'action',
              event_label: club.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(club => {
            event('admin/closure', {
              event_category: 'action',
              event_label: club.data.data,
            });
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
              Authorization: state.userToken,
            },
          })
          .then(club => {
            event('admin/fireMember', {
              event_category: 'action',
              event_label: club.data.data,
            });
            resolve(club.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
};

export default createStore(store);
