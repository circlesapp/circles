<template>
	<div class="page">
		<div class="submenu">
			<div class="submenu__list">
				<router-link :to="{name:'page/timeline'}" class="submenu__list__item">타임라인</router-link>
				<router-link :to="{name:'page/awards'}" class="submenu__list__item">수상실적</router-link>
				<router-link :to="{name:'page/members'}" class="submenu__list__item">부원소개</router-link>
				<router-link :to="{name:'page/budgets'}" class="submenu__list__item">예산공지</router-link>
				<router-link :to="{name:'page/polls'}" class="submenu__list__item">설문조사</router-link>
				<router-link :to="{name:'page/applicant/main'}" class="submenu__list__item">채용</router-link>
			</div>
		</div>
		<div class="page__content" ref="page__content">
			<transition name="routerfade-animation">
				<router-view class="page__content__router" v-if="!isLoading"></router-view>
			</transition>
		</div>
		<LoadingBar v-if="isLoading"></LoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingBar from "../components/LoadingBar.vue";
export default Vue.extend({
	name: "Page",
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
	watch: {
		$route() {
			(this.$refs.page__content as HTMLDivElement).scrollTop = 0;
		}
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
	transition: 0.3s !important;
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

.page {
	display: flex;
	flex-direction: column;
}
.page__content {
	flex: 1;
	overflow-y: scroll;
	position: relative;
}
.submenu {
	width: 100%;
	height: 90px;

	background-color: white;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
	overflow-x: scroll;
}
.submenu__list {
	height: 100%;
	margin-left: calc(120px + 8em);
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