<template>
	<div class="community">
		<div class="submenu">
			<div class="submenu__list">
				<router-link to="drive" class="submenu__list__item">스토리지</router-link>
				<router-link to="attendance" class="submenu__list__item">출결관리</router-link>
				<router-link to="members" class="submenu__list__item">부원관리</router-link>
				<router-link to="calender" class="submenu__list__item">캘린더</router-link>
				<router-link to="todo" class="submenu__list__item">To-Do 리스트</router-link>
				<router-link to="assignment" class="submenu__list__item">과제관리</router-link>
				<router-link to="budgets" class="submenu__list__item">예산관리</router-link>
				<router-link to="application" class="submenu__list__item">채용관리</router-link>
				<router-link to="shortener" class="submenu__list__item">Circles<br>Shortener</router-link>
				<router-link to="site" class="submenu__list__item">사이트관리</router-link>
			</div>
		</div>
		<div class="community__content">
			<transition name="routerfade-animation">
				<router-view v-if="!isLoading"></router-view>
			</transition>
		</div>
		<LoadingBar v-if="isLoading"></LoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingBar from "../components/LoadingBar.vue";
export default Vue.extend({
    name : "Community",
	components: {
		LoadingBar
	},
	data() {
		return {
			isLoading: true
		};
	},
	created() {
		this.$store
			.dispatch("GET_CLUB", this.$route.params.club)
			.then(club => {
				if (!club) this.$router.push("/");
				this.isLoading = false;
			})
			.catch(err => {
				this.$router.push("/");
				this.isLoading = false;
			});
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		}
	}
});
</script>

<style>
.routerfade-animation-enter-active,
.routerfade-animation-leave-active {
	transition: 0.5s;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.routerfade-animation-enter {
	opacity: 0;
	transform: scale(0.95);
}
.routerfade-animation-enter-to {
	opacity: 1;
	transform: scale(1);
}
.routerfade-animation-leave {
	opacity: 1;
	transform: scale(1);
}
.routerfade-animation-leave-to {
	opacity: 0;
	transform: scale(1.05);
}

.community {
	display: flex;
	flex-direction: column;
}
.community__content {
	flex: 1;
	overflow: scroll;

	position: relative;
}
.submenu {
	width: 100%;
	height: 90px;

	background-color: white;
	box-shadow: inset 0 1px 0 0 #d7e3f1;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
	overflow-x: scroll;
}
.submenu__list {
	height: 100%;
	margin-left: calc(9.6vw + 8em);
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

	color: #9cb2cd;
	text-decoration: none;
}
.submenu__list__item:hover {
	background-color: #9cb2cd;
	color: white;
}
@media screen and (max-width: 768px) {
	.submenu__list {
		margin: 0;
	}
}
</style>