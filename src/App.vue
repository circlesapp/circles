<template>
	<div id="app" :class="{ darkTheme: $store.state.darkTheme, slimMode: $store.state.slimMode }">
		<transition name="menu-animation">
			<div class="menu" v-if="isShowMenuRoute">
				<header class="menu__left">
					<i class="menu__menubutton mdi mdi-menu" @click="toggleMenu"></i>
					<router-link tag="h1" class="menu__left__title" to="/">circles.</router-link>
					<nav class="menu__left__list" :class="{ 'menu__left__list-show': showMenu }" @click="toggleMenu">
						<div class="menu__left__list__circles">
							<img src="./assets/circles_logo.png" alt="circles_logo" />
							<router-link tag="h1" to="/">circles.</router-link>
						</div>
						<div class="menu__left__list__profile" v-if="getUserInformation.name" style="color:black;">
							<div class="information__wrapper">
								<img :src="getUserImage" alt="user_profile" />
								<div>
									<h3 class="name">{{ getUserInformation.name }}</h3>
									<p class="clubs">{{ getClub.name }} {{ getRank }}</p>
								</div>
							</div>
							<div class="menu__right__list__item menu__right__darktheme menu__moblieprofile__dark" @click="$store.state.darkTheme = !$store.state.darkTheme">
								<div class="menu__right__darktheme__left">
									<i class="mdi mdi-theme-light-dark"></i>
									<span class="menu__right__list__item__text">다크 테마</span>
								</div>
								<SwitchButton v-model="$store.state.darkTheme"></SwitchButton>
							</div>
							<div class="menu__right__list__item menu__right__slimmode menu__moblieprofile__dark" @click="$store.state.slimMode = !$store.state.slimMode">
								<div class="menu__right__slimmode__left">
									<i class="mdi mdi-unfold-less-horizontal"></i>
									<span class="menu__right__list__item__text">슬림 모드</span>
								</div>
								<SwitchButton v-model="$store.state.slimMode"></SwitchButton>
							</div>
						</div>
						<router-link to="/" class="menu__left__list__item" :class="{ 'menu__left__list__item-active': idx == 0 }">메인</router-link>
						<router-link :to="`/${getClub.name}/page/timeline`" class="menu__left__list__item" v-if="getClub.name" :class="{ 'menu__left__list__item-active': idx == 1 }"
							>페이지</router-link
						>
						<router-link v-if="isAdmin" :to="`/${getClub.name}/community/${communityPermissionRoute}`" class="menu__left__list__item" :class="{ 'menu__left__list__item-active': idx == 2 }"
							>커뮤니티</router-link
						>
						<router-link v-if="getClub.name" :to="`/${getClub.name}`" class="menu__left__list__item" :class="{ 'menu__left__list__item-active': idx == 3 }">사이트</router-link>
						<div class="menu__left__list__item menu__left__list__item__pwa" @click="showPWA" v-if="deferredPrompt">앱 설치</div>
						<router-link v-if="!getUserInformation.name" to="/login" class="menu__left__list__item btn__login menu__left__list__item__pwa">로그인</router-link>
						<div v-if="getUserInformation.name" class="menu__left__list__item btn__logout menu__left__list__item__pwa" @click="logout">로그아웃</div>
						<div class="menu__left__list__bar" ref="bar" :style="`left:${barPositionX};${idx == -1 ? 'display:none;' : ''}`"></div>
					</nav>
				</header>
				<transition name="fade">
					<div class="menu__right__fixed">
						<router-link to="/search" class="menu__right__search">
							<i class="mdi mdi-magnify"></i>
						</router-link>
						<div class="menu__right__alarm__wrapper" @click="toggleAlarm" v-if="getUserInformation.name">
							<span class="menu__right__alarm__count" v-if="getUserInformation.alarms.length > 0">{{ getUserInformation.alarms.length }}</span>
							<i class="menu__right__alarm mdi mdi-bell-outline"></i>
						</div>
						<transition name="fade">
							<div class="menu__right__alarm__popup" v-if="showAlarm">
								<TopLoadingBar class="menu__right__alarm__popup__loading" v-if="isAlarmLoading"></TopLoadingBar>
								<div class="menu__right__alarm__popup__item" v-for="alarm in getUserInformation.alarms" :key="alarm.createAt">
									<p>
										<span class="date">{{ alarm.timeString }}</span>
										<br />
										<span v-html="alarm.message"></span>
									</p>
									<i class="clear mdi mdi-close" @click="deleteAlarm(alarm.id)"></i>
								</div>
							</div>
						</transition>
						<div class="menu__right" v-if="getUserInformation.name">
							<img :src="getUserImage" @click="toggleProfile" alt="user_profile" />
							<transition name="fade">
								<div class="menu__right__profile" v-if="showProfile">
									<div class="menu__right__profile__information">
										<div class="information__wrapper">
											<img :src="getUserImage" alt="user_profile" />
											<div>
												<h3 class="name">{{ getUserInformation.name }}</h3>
												<p class="email">{{ getUserInformation.email }}</p>
											</div>
										</div>
									</div>
									<div class="menu__right__list" v-if="getRank !== '-' && isAdmin">
										<router-link class="menu__right__list__link" v-if="getRank !== '-'" :to="`/${getClub.name}/page/timeline`">
											<div class="menu__right__list__item">
												<i class="mdi mdi-account-group"></i>
												<span class="menu__right__list__item__text">{{ getClub.name || "-" }}</span>
											</div>
										</router-link>
										<router-link class="menu__right__list__link" v-if="isAdmin" :to="`/${getClub.name}/community/members`">
											<div class="menu__right__list__item">
												<i class="mdi mdi-shield-star"></i>
												<span class="menu__right__list__item__text">{{ getRank }}</span>
											</div>
										</router-link>
									</div>
									<div class="menu__right__list menu__right__list__last">
										<div class="menu__right__list__item menu__right__darktheme" @click="$store.state.darkTheme = !$store.state.darkTheme">
											<div class="menu__right__darktheme__left">
												<i class="mdi mdi-theme-light-dark"></i>
												<span class="menu__right__list__item__text">다크 테마</span>
											</div>
											<SwitchButton v-model="$store.state.darkTheme"></SwitchButton>
										</div>
										<div class="menu__right__list__item menu__right__slimmode" @click="$store.state.slimMode = !$store.state.slimMode">
											<div class="menu__right__slimmode__left">
												<i class="mdi mdi-unfold-less-horizontal"></i>
												<span class="menu__right__list__item__text">슬림 모드</span>
											</div>
											<SwitchButton v-model="$store.state.slimMode"></SwitchButton>
										</div>
										<div class="menu__right__list__item menu__right__profile__logout" @click="$router.push('/profile')">
											<i class="mdi mdi-account-edit"></i>
											<span class="menu__right__list__item__text">프로필 편집</span>
										</div>
										<div class="menu__right__list__item menu__right__profile__logout" @click="logout">
											<i class="mdi mdi-logout-variant"></i>
											<span class="menu__right__list__item__text">로그아웃</span>
										</div>
									</div>
								</div>
							</transition>
						</div>
					</div>
				</transition>
			</div>
		</transition>
		<section class="content" @click="closeAll">
			<transition :name="routerAnimation">
				<router-view class="content__router" />
			</transition>
		</section>
		<transition name="loadingAnimation">
			<LoadingBar v-if="isLoading"></LoadingBar>
		</transition>
		<Offline v-if="isOffline" @isUpdated="isOffline = false" />
		<transition name="loadingAnimation">
			<NoticeBar v-if="isNoticeOn" @isUpdated="closeNotice" />
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import SwitchButton from "./components/SwitchButton.vue";
import Offline from "./components/Offline.vue";
import NoticeBar from "./components/NoticeBar.vue";
import LoadingBar from "./components/LoadingBar.vue";
import TopLoadingBar from "./components/TopLoadingBar.vue";
export default Vue.extend({
	name: "App",
	components: {
		SwitchButton,
		Offline,
		NoticeBar,
		LoadingBar,
		TopLoadingBar
	},
	data() {
		return {
			isOffline: false,
			showMenu: false,
			showProfile: false,
			showAlarm: false,
			deferredPrompt: null as any,
			routerAnimation: "",

			isMounteRequired: false,
			idx: 0,
			barPositionX: "",

			isAlarmLoading: false
		};
	},
	created() {
		let darkTheme = localStorage.getItem("circles.darkTheme");
		this.$store.state.darkTheme = darkTheme == "true";
		this.loginCheck();
	},
	mounted() {
		let startX = 0;
		let endX = 0;
		addEventListener("touchstart", (e: TouchEvent) => {
			startX = e.touches[0].clientX;
			endX = e.touches[0].clientX;
		});
		addEventListener("touchmove", (e: TouchEvent) => {
			endX = e.touches[0].clientX;
		});
		addEventListener("touchend", (e: TouchEvent) => {
			let gap = endX - startX;
			if (gap < -200) {
				this.showMenu = false;
			}
			if (gap > 200) {
				this.showMenu = true;
			}
		});
		addEventListener("offline", () => {
			this.isOffline = true;
		});
		addEventListener("online", () => {
			this.isOffline = false;
		});

		let route: any = this.$route;
		this.idx = ["home", "page", "community"].indexOf(route.name.split("/")[0]);
		this.setBarPosition();

		window.addEventListener("beforeinstallprompt", (e: any) => {
			e.preventDefault();
			this.deferredPrompt = e;
			e.prompt();
		});

		let routeList = [this.$route.name] as any[];
		this.$router.beforeEach((to, from, next) => {
			this.$store.state.loadingStack = [];
			if (routeList.length > 1 && to.name == routeList[routeList.length - 2]) {
				this.routerAnimation = "routerdown-animation";
				routeList.splice(routeList.length - 1, 1);
				setTimeout(function() {
					next();
				}, 15);
				return;
			} else {
				this.routerAnimation = "routerup-animation";
				routeList.push(to.name);
				next();
			}
		});
	},

	watch: {
		$route(next, prev) {
			this.idx = ["home", "page", "community"].indexOf(next.name.split("/")[0]);
			if (this.idx != -1) {
				if (this.$refs.bar as HTMLDivElement) {
					this.setBarPosition();
				}
			}
		},
		"$store.state.darkTheme"(next, prev) {
			localStorage.setItem("circles.darkTheme", next);
		}
	},
	methods: {
		closeNotice() {
			this.$store.commit("closeNotice");
		},
		setBarPosition() {
			if (this.isShowMenuRoute) this.barPositionX = 120 * this.idx + "px";
		},
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		toggleProfile() {
			this.showAlarm = false;
			this.showProfile = !this.showProfile;
		},
		toggleAlarm() {
			this.showProfile = false;
			this.showAlarm = !this.showAlarm;
			if (this.showAlarm) {
				this.isAlarmLoading = true;
				this.$store.dispatch("GET_ALARM").then(alarms => {
					this.getUserInformation.alarms = alarms;
					this.isAlarmLoading = false;
				});
			}
		},
		closeAll() {
			this.showMenu = false;
			this.showProfile = false;
			this.showAlarm = false;
		},
		getDate(date: Date): string {
			return new Date(date).toISOString().slice(0, 10);
		},
		deleteAlarm(id: number) {
			this.isAlarmLoading = true;
			this.$store.dispatch("REMOVE_ALARM", { id }).then(alarms => {
				this.isAlarmLoading = false;
				this.getUserInformation.alarms = alarms;
			});
		},
		showPWA() {
			this.deferredPrompt.prompt();
		},
		loginCheck() {
			let token = localStorage.getItem("circles.loginToken");
			let pushSubscription = localStorage.getItem("circles.pushSubscription");
			if (token) {
				this.$store.commit("pushLoading", {
					name: "GET_USER_PROFILE",
					message: "로그인 중"
				});
				this.$store
					.dispatch("GET_USER_PROFILE", { token, pushSubscription })
					.then(user => {
						this.$store.state.userToken = token;
						this.$store.commit("clearLoading", "GET_USER_PROFILE");
					})
					.catch(err => {
						this.$store.state.userToken = "";
						this.$store.commit("clearLoading", "GET_USER_PROFILE");
					});
			}
		},
		logout() {
			localStorage.removeItem("circles.loginToken");
			this.showProfile = false;
			this.$store.state.userToken = "";
			this.$store.state.userInformation = {};
			this.$router.replace("/");
		}
	},
	computed: {
		isNoticeOn() {
			return this.$store.state.showNotice;
		},
		isLoading() {
			return this.$store.state.loadingStack.length > 0;
		},
		getBar() {
			return this.$refs.bar;
		},
		getUserInformation(): any {
			return this.$store.state.userInformation;
		},
		getUserImage() {
			if (this.$store.state.userInformation.imgPath) return this.$store.state.mainPath + this.$store.state.userInformation.imgPath;
			else return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getClub() {
			return this.$store.state.club;
		},
		isShowMenuRoute(): boolean {
			return (
				["login", "register", "passwordchange", "page404", "community/editor", "site"].indexOf(this.$route.name || "") == -1 && !(this.$route.name == "home" && !this.getUserInformation.name)
			);
		},
		getRank() {
			if (this.$store.state.club.name) {
				try {
					return this.$store.state.club.ranks.find((x: any) => this.$store.state.club.members.find((x: any) => x.user == this.$store.state.userInformation._id).rank == x.id).name;
				} catch (e) {
					return "-";
				}
			} else {
				return "-";
			}
		},
		isAdmin(): number {
			let acceptPermissions = [32, 42];
			if (this.$store.state.club.ranks && this.$store.state.userInformation._id) {
				let user = this.$store.state.club.members.find((member: any) => {
					return member.user == this.$store.state.userInformation._id;
				});
				if (user) {
					let rank = this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank);
					if (rank.isAdmin) {
						return 1000;
					} else {
						return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).permission.find((permission: string) => acceptPermissions.indexOf(parseInt(permission)) != -1);
					}
				} else return 0;
			} else return 0;
		},
		communityPermissionRoute(): string {
			return this.isAdmin == 1000 ? "editclub" : this.isAdmin == 32 ? "application" : this.isAdmin == 42 ? "calendar" : "";
		}
	}
});
</script>

<style>
@font-face {
	font-family: "AvenirBlack";
	src: url("./assets/Avenir Black.ttf") format("truetype");
	font-display: swap;
}
@font-face {
	font-family: "NanumSquareB";
	src: url("./assets/NanumSquareB.ttf") format("truetype");
	font-display: swap;
}
@font-face {
	font-family: "NanumSquareEB";
	src: url("./assets/NanumSquareEB.ttf") format("truetype");
	font-display: swap;
}
@font-face {
	font-family: "NanumSquareR";
	src: url("./assets/NanumSquareR.ttf") format("truetype");
	font-display: swap;
}
@font-face {
	font-family: "NanumSquareL";
	src: url("./assets/NanumSquareL.ttf") format("truetype");
	font-display: swap;
}
.menu-animation-enter-active,
.menu-animation-leave-active {
	transition: 0.5s;
	overflow: hidden;
}
.menu-animation-enter,
.menu-animation-leave-to {
	height: 0 !important;
}
.menu-animation-leave,
.menu-animation-enter-to {
	height: 90 !important;
}
.routerup-animation-enter-active,
.routerup-animation-leave-active,
.routerdown-animation-enter-active,
.routerdown-animation-leave-active {
	position: absolute;
	top: 0;
	left: 0;
	transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1);
}
.routerup-animation-enter {
	transform: translateY(100%);
}
.routerup-animation-enter-to {
	transform: translateY(0);
}
.routerup-animation-leave {
	transform: translateY(0);
}
.routerup-animation-leave-to {
	transform: translateY(-100%);
}

.routerdown-animation-enter {
	transform: translateY(-100%);
}
.routerdown-animation-enter-to {
	transform: translateY(0);
}
.routerdown-animation-leave {
	transform: translateY(0);
}
.routerdown-animation-leave-to {
	transform: translateY(100%);
}
.fade-enter-active,
.fade-leave-active {
	transition: 0.5s;
	position: absolute;
	right: 0;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: translateY(5%);
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
	transform: translateY(0);
}
.loadingAnimation-enter-active,
.loadingAnimation-leave-active {
	transition: 0.3s;
}
.loadingAnimation-enter,
.loadingAnimation-leave-to {
	opacity: 0;
}
.loadingAnimation-enter-to,
.loadingAnimation-leave {
	opacity: 1;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "NanumSquareR";

	line-height: 1.5em;
	letter-spacing: 0.02em;

	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	outline: none;
}
i {
	user-select: none;
}
img {
	text-indent: -999px;
}
::selection {
	background-color: rgba(39, 49, 66, 0.2);
	/* color: #273142; */
}
.darkTheme ::selection {
	background-color: #9cb2cd;
}
input:-webkit-autofill {
	-webkit-text-fill-color: #538fff !important;
	border: 1px solid #538fff !important;
}
.darkTheme input:-webkit-autofill {
	box-shadow: 0 0 0px 1000px #353535 inset;
}
::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}
::-webkit-scrollbar-button {
	display: none;
}
::-webkit-scrollbar-thumb {
	background: rgba(59, 67, 81, 0.2);
}
.darkTheme ::-webkit-scrollbar-thumb {
	background: #656565;
}
::-webkit-scrollbar-track {
	background-color: #f0f0f0;
}
.darkTheme ::-webkit-scrollbar-track {
	background-color: #282828;
}
#app {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	background-color: #f5f7fa;
}
#app.darkTheme {
	color: white;
	background-color: #353535;
}
#app.darkTheme * {
	transition: 0.5s;
}
.menu {
	width: 100%;
	height: 90px;

	background-color: #538fff;
	color: white;

	display: flex;
	justify-content: space-between;
	align-items: center;

	z-index: 1000;

	user-select: none;
	position: relative;
	transition: 0.5s;
}
.darkTheme .menu {
	background-color: #232323;
}
.slimMode .menu {
	height: 55px;
}
.menu__menubutton {
	display: none;

	color: white;
	font-weight: bold;

	border: none;
	background: none;

	padding: 15px;
	font-size: 2em;
}
.menu__left {
	display: flex;
	align-items: center;
	height: 100%;
}
.menu__left__title {
	margin-left: 40px;
	font-family: "AvenirBlack";
	font-weight: 900;
	font-size: 38px;

	cursor: pointer;
}
.slimMode .menu__left__title {
	margin-left: 20px;
}
.menu__left__list {
	position: relative;
	display: flex;
	margin-left: 80px;
	height: 100%;
}
.menu__left__list__item {
	width: 120px;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 18px;
	font-weight: 800;
	color: white;
	text-decoration: none;
}
.menu__left__list .btn__login {
	color: #538fff;
}
.menu__left__list .btn__logout {
	color: #dd4433 !important;
}
.menu__left__list__bar {
	position: absolute;
	bottom: 0;
	left: 0;

	width: 120px;
	height: 5px;

	background-color: white;

	transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1);
}

.menu__left__list__item__pwa {
	display: none;
}

.menu__left__list__circles {
	display: none;
	align-items: center;
	color: #273142;

	padding-left: 15px;
	padding-top: 20px;
}
.menu__left__list__circles img {
	width: 120px;
	height: 120px;
}
.menu__left__list__circles h1 {
	font-size: 50px;
	font-family: Avenir;
	font-weight: bold;
	margin-bottom: 20px;
}
.darkTheme .menu__left__list__circles h1 {
	color: white;
}
.menu__left__list__profile {
	display: none;
}
.darkTheme .menu__left__list__profile * {
	color: white;
}
.menu__left__list__profile .information__wrapper {
	display: flex;
	align-items: center;

	padding: 40px;
}
.menu__left__list__profile .information__wrapper img {
	width: 70px;
	height: 70px;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	background-color: white;
	border-radius: 100%;
	margin-right: 20px;
}
.menu__left__list__profile .information__wrapper .name {
	font-family: NanumSquareEB;
	font-size: 24px;
}
.menu__left__list__profile .information__wrapper .clubs {
	font-family: NanumSquareL;
	font-size: 20px;
}

.menu__right__fixed {
	display: flex;
	align-items: center;
	margin-left: 20px;
}
.menu__right__alarm__wrapper {
	display: flex;
	flex-direction: column;

	position: relative;

	cursor: pointer;
}
.menu__right__alarm {
	font-size: 36px;
}
.menu__right__alarm__count {
	position: absolute;
	right: -5px;
	top: 0;

	font-size: 14px;
	width: 1.5em;
	height: 1.5em;
	border-radius: 100%;

	background-color: #f55246;
	color: white;

	display: flex;
	justify-content: center;
	align-items: center;
}
.menu__right__alarm__popup {
	position: fixed;

	right: 70px;
	top: 70px;

	width: 350px;
	height: 400px;

	border-radius: 4px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);
	background-color: white;

	overflow-y: auto;
}
.darkTheme .menu__right__alarm__popup {
	background-color: #282828;
}
.menu__right__alarm__popup__loading {
	position: absolute;
	width: 100%;
	left: 0;
	z-index: 100;
}
.menu__right__alarm__popup__item {
	position: relative;
	padding: 20px;
	padding-right: 40px;
	transition: 0.2s;
}

.menu__right__alarm__popup__item:nth-child(2n) {
	background-color: #fafafa;
}
.darkTheme .menu__right__alarm__popup__item:nth-child(2n) {
	background-color: #232323;
}
.menu__right__alarm__popup__item p {
	font-size: 16px;
	color: #333333;
}
.darkTheme .menu__right__alarm__popup__item p {
	color: white;
}
.menu__right__alarm__popup__item .date {
	font-size: 14px;
	color: #666666;
}
.darkTheme .menu__right__alarm__popup__item .date {
	color: #afaeae;
}
.menu__right__alarm__popup__item .clear {
	position: absolute;
	right: 20px;
	top: 0;
	height: 100%;
	width: 20px;

	display: flex;
	align-items: center;

	color: #f55246;
	cursor: pointer;
}

.menu__right {
	margin-left: 20px;
	margin-right: 20px;
}
.slimMode .menu__right {
	margin-right: 10px;
}
.menu__right > img {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	background-color: #f5f7fa;
	cursor: pointer;
}
.menu__right__profile {
	position: fixed;
	right: 10px;
	top: 70px;
	width: 300px;
	border-radius: 4px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);
	background-color: white;
	color: #273142;
	z-index: 3000;
}
.darkTheme .menu__right__profile {
	color: white;
	background-color: #282828;
}
.menu__right__profile__information {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-bottom: 1px solid #afaeae;
}
.menu__right__profile__information .information__wrapper {
	display: flex;
	align-items: center;
}
.menu__right__profile__information img {
	width: 49px;
	height: 49px;
	margin-right: 30px;
	border-radius: 100%;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
}
.menu__right__profile__information .name {
	font-family: "NanumSquareEB";
	font-size: 20px;
}
.menu__right__profile__information .email {
	font-family: "NanumSquareL";
	font-size: 16px;
}

.menu__right__list {
	padding: 8px 0;
	border-bottom: 1px solid #afaeae;
}
.menu__right__list__last {
	border: 0;
}
.menu__right__list__link {
	color: #3b4351;
	text-decoration: none;
}
.darkTheme .menu__right__list__link {
	color: white;
}
.menu__right__list__item {
	display: flex;
	align-items: center;
	height: 40px;
	padding: 0 16px;
	cursor: pointer;
}
.menu__right__list__item:hover {
	background: rgba(0, 0, 0, 0.08);
}
.menu__right__list__item i {
	margin-right: 16px;
	font-size: 24px;
	color: #666;
}
.menu__right__list__item__text {
	font-family: "NanumSquareL";
	font-size: 18px;
}
.menu__right__darktheme,
.menu__right__slimmode {
	justify-content: space-between;
}
.menu__right__darktheme__left,
.menu__right__slimmode__left {
	display: inline-flex;
	justify-content: flex-start;
	align-items: center;
}
.menu__moblieprofile__dark {
	padding: 40px;
	font-size: 24px;
}
.darkTheme .menu__moblieprofile__dark,
.darkTheme .menu__moblieprofile__dark i {
	color: white;
}

.menu__right__search {
	font-size: 40px;
	color: white;
	text-decoration: none;
	margin-right: 20px;
}

.submenu {
	width: 100%;
	height: 90px;

	background-color: white;
	color: #9cb2cd;

	display: flex;
	justify-content: space-between;
	align-items: center;

	overflow: hidden;

	position: relative;
}
.darkTheme .submenu {
	background-color: #282828;
}
.slimMode .submenu {
	height: 55px;
}
.submenu__list {
	width: 100%;
	height: 100%;
	margin-left: calc(120px + 8em);

	overflow-x: auto;
	white-space: nowrap;
}
.submenu__list__item {
	cursor: pointer;

	width: 120px;
	height: 100%;

	display: inline-flex;
	justify-content: center;
	align-items: center;

	font-size: 14px;
	font-weight: 800;

	color: #9cb2cd;
	text-decoration: none;
}

.submenu__list__item:hover {
	background-color: #9cb2cd;
	color: white;
}
.content {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.content__router {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
@media screen and (max-width: 768px) {
	.menu__right {
		display: none;
	}
	.menu__left__title {
		margin-left: 10px;
	}
	.menu__left__list {
		position: fixed;
		margin: 0;
		top: 0;
		left: -80vw;

		width: 80vw;
		height: 100vh;
		background-color: white;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);

		flex-direction: column;
	}
	.darkTheme .menu__left__list {
		background-color: #232323;
	}
	.menu__left__list-show {
		left: 0;
	}
	.menu__left__list__item {
		display: block;

		height: auto;
		width: 100%;

		padding: 20px 40px;
		color: #273142;
		font-size: 24px;

		text-align: left;
	}
	.darkTheme .menu__left__list__item {
		color: white;
	}
	.menu__left__list__item__pwa {
		display: block;
	}
	.menu__left__list__profile {
		display: block;
	}

	.menu__menubutton {
		display: block;
	}

	.menu__left__list__circles {
		display: flex;
	}
	.menu__right__fixed {
		margin-right: 20px;
	}

	.menu__right__alarm__popup {
		right: 20px;
	}
}
@media all and (display-mode: standalone) {
	.menu__left__list__item__pwa {
		display: none;
	}
}
</style>
