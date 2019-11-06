<template>
	<div id="app">
		<transition name="menu-animation">
			<div class="menu" v-if="isShowMenuRoute">
				<header class="menu__left">
					<i class="menu__menubutton mdi mdi-menu" @click="toggleMenu"></i>
					<router-link tag="h1" class="menu__left__title" to="/">circles.</router-link>
					<nav class="menu__left__list" :class="{'menu__left__list-show':showMenu}" @click="toggleMenu">
						<div class="menu__left__list__circles">
							<img src="./assets/circles_logo.png" alt />
							<router-link tag="h1" to="/">circles.</router-link>
						</div>
						<div class="menu__left__list__profile" v-if="getUserInformation.name" style="color:black;">
							<div class="information__wrapper">
								<img :src="getUserImage" alt />
								<div>
									<h3 class="name">{{getUserInformation.name}}</h3>
									<p class="clubs">{{getClub.name}} {{getRank}}</p>
								</div>
							</div>
						</div>
						<router-link
							to="/"
							class="menu__left__list__item"
							:class="{'menu__left__list__item-active':idx == 0}"
						>메인</router-link>
						<router-link
							:to="`/${getClub.name}/page/timeline`"
							class="menu__left__list__item"
							v-if="getClub.name"
							:class="{'menu__left__list__item-active':idx == 1}"
						>페이지</router-link>
						<router-link
							v-if="isAdmin"
							:to="`/${getClub.name}/community/members`"
							class="menu__left__list__item"
							:class="{'menu__left__list__item-active':idx == 2}"
						>커뮤니티</router-link>
						<div
							class="menu__left__list__item menu__left__list__item__pwa"
							@click="showPWA"
							v-if="deferredPrompt"
						>앱 설치</div>
						<div class="menu__left__list__bar" ref="bar"></div>
					</nav>
				</header>
				<transition name="fade">
					<div class="menu__right" v-if="getUserInformation.name && isShowProfile">
						<img :src="getUserImage" @click="toggleProfile" />
						<transition name="fade">
							<div class="menu__right__profile" v-if="showProfile">
								<div class="menu__right__profile__information">
									<div class="information__wrapper">
										<img :src="getUserImage" alt />
										<div>
											<h3 class="name">{{getUserInformation.name}}</h3>
											<p class="email">{{getUserInformation.email}}</p>
										</div>
									</div>
								</div>
								<div class="menu__right__list">
									<router-link
										class="menu__right__list__link"
										v-if="getClub.name"
										:to="`/${getClub.name}/page/timeline`"
									>
										<div class="menu__right__list__item">
											<i class="mdi mdi-account-group"></i>
											<span class="menu__right__list__item__text">
												{{getClub.name || '-'}}
											</span>
										</div>
									</router-link>
									<router-link
										v-if="isAdmin"
										:to="`/${getClub.name}/community/members`"
										class="menu__right__list__link"
									>
										<div class="menu__right__list__item">
											<i class="mdi mdi-shield-star"></i>
											<span class="menu__right__list__item__text">
												{{getRank}}
											</span>
										</div>
									</router-link>
								</div>
								<div class="menu__right__list menu__right__list__last">
									<div class="menu__right__list__item menu__right__darktheme" @click="darkTheme = !darkTheme">
										<div class="menu__right__darktheme__left">
											<i class="mdi mdi-theme-light-dark"></i>
											<span class="menu__right__list__item__text">
												다크 테마
											</span>
										</div>
										<div class="menu__right__darktheme__slider__wrapper">
											<input v-model="darkTheme" type="checkbox">
											<span class="menu__right__darktheme__slider"></span>
										</div>
									</div>
									<div class="menu__right__list__item menu__right__profile__logout" @click="logout">
										<i class="mdi mdi-logout-variant"></i>
										<span class="menu__right__list__item__text">
											로그아웃
										</span>
									</div>
								</div> <!-- .menu__right__list -->
							</div>
						</transition>
					</div>
					<router-link to="/search" class="menu__right__search" v-else>
						<i class="mdi mdi-magnify"></i>
					</router-link>
				</transition>
			</div>
		</transition>
		<section class="content">
			<transition :name="routerAnimation">
				<router-view class="content__router" />
			</transition>
		</section>
		<LoadingBar v-if="isLoading"></LoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingBar from "./components/LoadingBar.vue";
export default Vue.extend({
	name: "App",
	components: {
		LoadingBar
	},
	data() {
		return {
			showMenu: false,
			showProfile: false,
			deferredPrompt: null as any,
			isLoading: false,
			routerAnimation: "",

			isMounteRequired: false,
			idx: 0,

			darkTheme: false
		};
	},
	created() {
		this.loginCheck();
	},
	mounted() {
		window.addEventListener("beforeinstallprompt", (e: any) => {
			e.preventDefault();
			this.deferredPrompt = e;
			e.prompt();
		});
		let route: any = this.$route;
		this.idx = ["home", "page", "community"].indexOf(
			route.name.split("/")[0]
		);
		this.setBarPosition();

		let routeList = [this.$route.name] as any[];
		this.$router.beforeEach((to, from, next) => {
			if (
				routeList.length > 1 &&
				to.name == routeList[routeList.length - 2]
			) {
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
			this.idx = ["home", "page", "community"].indexOf(
				next.name.split("/")[0]
			);
			this.isMounteRequired = true;
			if (this.idx != -1) {
				if (this.$refs.bar as HTMLDivElement) {
					this.setBarPosition();
				}
			}
		}
	},
	methods: {
		setBarPosition() {
			(this.$refs.bar as HTMLDivElement).style.left =
				120 * this.idx + "px";
		},
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		toggleProfile() {
			this.showProfile = !this.showProfile;
		},
		showPWA() {
			this.deferredPrompt.prompt();
		},
		loginCheck() {
			let token = localStorage.getItem("clubs.loginToken");
			if (token) {
				this.isLoading = true;
				this.$store
					.dispatch("GET_USER_PROFILE", token)
					.then(user => {
						this.$store.state.userToken = token;
						this.isLoading = false;
					})
					.catch(err => {
						this.isLoading = false;
						this.$store.state.userToken = "";
					});
			}
		},
		logout() {
			localStorage.removeItem("clubs.loginToken");
			this.showProfile = false;
			this.$store.state.userToken = "";
			this.$store.state.userInformation = {};
			this.$router.replace("/");
		}
	},
	computed: {
		getUserInformation() {
			return this.$store.state.userInformation;
		},
		getUserImage() {
			if (this.$store.state.userInformation.imgPath)
				return (
					this.$store.state.mainPath +
					this.$store.state.userInformation.imgPath
				);
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getClub() {
			return this.$store.state.club;
		},
		isShowMenuRoute() {
			return (
				["login", "register", "passwordchange", "page404"].indexOf(
					this.$route.name || ""
				) == -1
			);
		},
		getRank() {
			if (this.$store.state.club.name) {
				try {
					return this.$store.state.club.ranks.find(
						(x: any) =>
							this.$store.state.club.members.find(
								(x: any) =>
									x.user ==
									this.$store.state.userInformation._id
							).rank == x.id
					).name;
				} catch (e) {
					return "-";
				}
			} else {
				return "-";
			}
		},
		isAdmin() {
			if (
				this.$store.state.club.ranks &&
				this.$store.state.userInformation._id
			) {
				let user = this.$store.state.club.members.find(
					(member: any) => {
						return (
							member.user == this.$store.state.userInformation._id
						);
					}
				);
				if (user)
					return this.$store.state.club.ranks.find(
						(rank: any) => rank.id == user.rank
					).isAdmin;
				else return false;
			} else return false;
		},
		isShowProfile() {
			return this.$route.name != "home";
		}
	}
});
</script>

<style>
@font-face {
	font-family: "AvenirBlack";
	src: url("./assets/Avenir Black.ttf") format("truetype");
}
@font-face {
	font-family: "NanumSquareB";
	src: url("./assets/NanumSquareB.ttf") format("truetype");
}
@font-face {
	font-family: "NanumSquareEB";
	src: url("./assets/NanumSquareEB.ttf") format("truetype");
}
@font-face {
	font-family: "NanumSquareR";
	src: url("./assets/NanumSquareR.ttf") format("truetype");
}
@font-face {
	font-family: "NanumSquareL";
	src: url("./assets/NanumSquareL.ttf") format("truetype");
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
	transition: 1s;
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
	transform: translateX(10%);
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
	transform: translateX(0);
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
::selection {
	background-color: rgba(39, 49, 66, 0.2);
	/* color: #273142; */
}
::-webkit-scrollbar {
	display: none;
}
#app {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	background-color: #f5f7fa;
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

	position: relative;
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
.menu__left__list__profile {
	display: none;
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
.menu__right {
	cursor: pointer;
	margin-right: 40px;
}
.menu__right > img {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	background-color: #f5f7fa;
}
.menu__right__profile {
	position: fixed;
	right: 10px;
	top: 70px;
	width: 300px;
	max-width: 380px;
	border-radius: 4px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);
	background-color: white;
	color: #273142;
	z-index: 3000;
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
.menu__right__list__item {
	display: flex;
	align-items: center;
	height: 40px;
	padding: 0 16px;
}
.menu__right__list__item:hover {
	background: rgba(0, 0, 0, 0.15);
	cursor: pointer;
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
.menu__right__darktheme {
	justify-content: space-between;
}
.menu__right__darktheme__left {
	display: inline-flex;
	justify-content: start;
	align-items: center;
}
.menu__right__darktheme__slider__wrapper {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 36px;
  	height: 14px;
}
.menu__right__darktheme input {
	width: 0;
	height: 0;
	visibility: hidden;
}
.menu__right__darktheme__slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eaeaea;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 8px;
}
.menu__right__darktheme__slider:before {
  position: absolute;
  top: -3px;
  left: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
  content: "";
  width: 20px;
  height: 20px;
  background-color: #fafafa;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .menu__right__darktheme__slider {
  background-color: #538FFF;
}
input:focus + .menu__right__darktheme__slider {
  box-shadow: 0 0 1px #538FFF;
}
input:checked + .menu__right__darktheme__slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

.menu__right__search {
	margin-right: 40px;
	font-size: 40px;
	color: white;
	text-decoration: none;
}

.submenu {
	width: 100%;
	height: 90px;

	background-color: white;
	color: #9cb2cd;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
}
.submenu__list {
	height: 100%;
	margin-left: calc(9.6vw + 6.75em);
	display: flex;
}
.submenu__list__item {
	cursor: pointer;

	width: 120px;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 14px;
	font-weight: 800;
}

.content {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	transition: 0.5s;
}
.content__router {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	transition: 1s;
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

		transition: 0.5s;
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
		transition: 0.5s;

		text-align: left;
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
}
@media all and (display-mode: standalone) {
	.menu__left__list__item__pwa {
		display: none;
	}
}
</style>
