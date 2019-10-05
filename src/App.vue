<template>
	<div id="app">
		<div class="menu" v-if="currentOption != -1">
			<header class="menu__left">
				<i class="menu__menubutton material-icons" @click="toggleMenu">menu</i>
				<h1 class="menu__left__title">circles.</h1>
				<nav class="menu__left__list" :class="{'menu__left__list-show':showMenu}" @click="toggleMenu">
					<router-link
						to="/"
						class="menu__left__list__item"
						:class="{'menu__left__list__item-active':currentOption == 0}"
					>메인</router-link>
					<router-link
						to="/page"
						class="menu__left__list__item"
						:class="{'menu__left__list__item-active':currentOption == 1}"
					>페이지</router-link>
					<router-link
						to="/community"
						class="menu__left__list__item"
						:class="{'menu__left__list__item-active':currentOption == 2}"
					>커뮤니티</router-link>
					<div class="menu__left__list__item menu__left__list__item__pwa" @click="showPWA">앱 설치</div>
					<div class="menu__left__list__bar" ref="bar"></div>
				</nav>
			</header>
			<div class="menu__right"></div>
		</div>
		<div class="submenu" v-if="currentOption != 0 && currentOption != -1">
			<div class="submenu__list">
				<div class="submenu__list__item">타임라인</div>
				<div class="submenu__list__item">수상실적</div>
				<div class="submenu__list__item">부원소개</div>
				<div class="submenu__list__item">예산공지</div>
				<div class="submenu__list__item">설문조사</div>
				<div class="submenu__list__item">채용</div>
			</div>
		</div>
		<section class="content">
			<transition name="router-animation">
				<router-view class="content__router" />
			</transition>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			menuOption: ["home", "page", "community"],
			currentOption: 0,
			showMenu: false,
			deferredPrompt: null as any
		};
	},
	mounted() {
		window.addEventListener("beforeinstallprompt", (e: any) => {
			e.preventDefault();
			this.deferredPrompt = e;
			e.prompt();
		});
		this.currentOption = this.menuOption.indexOf(
			this.$route.name!
		) as number;
		(this.$refs.bar as HTMLDivElement).style.left = `${this.currentOption *
			120}px`;
	},
	watch: {
		$route(next, prev) {
			this.currentOption = this.menuOption.indexOf(next.name) as number;
			(this.$refs.bar as HTMLDivElement).style.left = `${this
				.currentOption * 120}px`;
		}
	},
	methods: {
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		showPWA() {
			this.deferredPrompt.prompt();
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
.router-animation-enter-active,
.router-animation-leave-active {
	position: absolute;
	top: 0;
	left: 0;
	transition: 1s;
}
.router-animation-enter {
	transform: translateY(100%);
}
.router-animation-enter-to {
	transform: translateY(0);
}
.router-animation-leave {
	transform: translateY(0);
}
.router-animation-leave-to {
	transform: translateY(-100%);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "NanumSquareR";

	line-height: 1.5em;
	letter-spacing: 0.02em;

	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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

.submenu {
	width: 100%;
	height: 0;

	background-color: white;
	color: #9cb2cd;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
	opacity: 0;
}
.submenu-show {
	opacity: 1;
	height: 90px;
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
.menu__left__list__item__pwa {
	display: none;
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
	overflow-y: scroll;
}
@media screen and (max-width: 768px) {
	.menu__left {
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
		height: auto;
		width: 100%;

		text-align: center;

		padding: 10px;
		color: #538fff;
		transition: 0.5s;
	}
	.menu__left__list__item__pwa {
		display: block;
	}
	.menu__left__list__item-active {
		color: white;
		background-color: #538fff;
	}
	.menu__menubutton {
		display: block;
	}
}
</style>
