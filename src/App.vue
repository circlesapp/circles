<template>
	<div id="app">
		<transition name="menu-animation">
			<div class="menu" v-if="isShowMenuRoute">
				<header class="menu__left">
					<i class="menu__menubutton material-icons" @click="toggleMenu">menu</i>
					<h1 class="menu__left__title">circles.</h1>
					<nav class="menu__left__list" :class="{'menu__left__list-show':showMenu}" @click="toggleMenu">
						<div class="menu__left__list__circles">
							<img src="./assets/circles_logo.png" alt />
							<h1>circles.</h1>
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
							:to="`/${getClub.name}/page/community`"
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
									<div class="arrow">></div>
								</div>
								<div class="menu__right__profile__club">{{getClub.name || '-'}}</div>
								<div class="menu__right__profile__rank">
									<div class="left">직위</div>
									<div class="right">{{getRank}}</div>
								</div>
								<div class="menu__right__profile__logout" @click="logout">로그아웃</div>
							</div>
						</transition>
					</div>
					<router-link to="/search" class="menu__right" v-else>
						<i class="material-icons">search</i>
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
			idx: 0
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
				["login", "register", "passwordchange"].indexOf(
					this.$route.name || ""
				) == -1
			);
		},
		getRank() {
			if (this.$store.state.club.name) {
				try {
					return this.$store.state.club.members.find(
						(x: any) =>
							x.user == this.$store.state.userInformation._id
					).rank;
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
						(rank: any) => rank.name == user.rank
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
	background-color: #f5f7fa;
	color: #273142;
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
	margin-left: 2vw;
	font-family: "AvenirBlack";
	font-weight: 900;
	font-size: 38px;
}
.menu__left__list {
	position: relative;
	display: flex;
	margin-left: 7.6vw;
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

.menu__right i{
    margin-right: 30px;
    font-size: 40px;
    color: white;
    text-decoration: none;
}
.menu__right > img {
	width: 34px;
	height: 34px;
	margin-right: 30px;
	border-radius: 100%;
	background-color: #f5f7fa;
}
.menu__right__profile {
	position: fixed;
	right: 10px;
	top: 70px;
	width: 380px;
	border-radius: 4px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);

	padding: 25px;
	background-color: white;
	color: #273142;
	z-index: 3000;
}
.menu__right__profile__information {
	display: flex;
	justify-content: space-between;
	align-items: center;
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
.menu__right__profile__information .arrow {
	font-family: "NanumSquareEB";
	font-size: 20px;
}

.menu__right__profile__club {
	margin-top: 30px;
	text-align: right;
	font-family: "NanumSquareL";
	font-size: 20px;
}
.menu__right__profile__rank {
	display: flex;
	justify-content: space-between;
}
.menu__right__profile__rank .left {
	font-family: "NanumSquareB";
	font-size: 20px;
}
.menu__right__profile__rank .right {
	font-family: "NanumSquareL";
	font-size: 20px;
}
.menu__right__profile__logout {
	cursor: pointer;
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
