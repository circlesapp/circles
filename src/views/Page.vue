<template>
	<div class="page">
		<div class="submenu">
			<div class="submenu__list">
				<div class="submenu__list__item">타임라인</div>
				<div class="submenu__list__item">수상실적</div>
				<div class="submenu__list__item">부원소개</div>
				<div class="submenu__list__item">예산공지</div>
				<div class="submenu__list__item">설문조사</div>
				<div class="submenu__list__item">채용</div>
			</div>
		</div>
		<div class="page__content">
			<router-view v-if="!isLoading"></router-view>
		</div>
		<LoadingBar v-if="isLoading"></LoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingBar from "../components/LoadingBar.vue";
export default Vue.extend({
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
				this.isLoading = false;
				this.$router.push("/");
			});
	}
});
</script>

<style>
.page {
	display: flex;
	flex-direction: column;
}
.page__content {
	flex: 1;
	overflow: scroll;
}
.submenu {
	width: 100%;
	height: 90px;

	background-color: white;
	color: #9cb2cd;
	box-shadow: inset 0 1px 0 0 #d7e3f1;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
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
}
.submenu__list__item:hover {
	background-color: #9cb2cd;
	color: white;
}
</style>