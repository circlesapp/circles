<template>
	<div class="page__main" v-if="componentList.length > 0">
		<div class="page__main__wrapper">
			<component
				class="page__main__component"
				v-for="(component) in getComponentList"
				:key="component.id"
				:is="component.component"
				ref="component"
			>{{component}}</component>
		</div>
	</div>
	<div class="page__notfound" v-else-if="!isLoading">
		빈 페이지 입니다.
		<router-link class="link" to="/">돌아가기</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import ClubTitleLayout from "../components/Editor/Functional/ClubTitleLayout.vue";
import InformationLayout from "../components/Editor/Functional/InformationLayout.vue";
import MembersLayout from "../components/Editor/Functional/MembersLayout.vue";
import ApplyButtonLayout from "../components/Editor/Functional/ApplyButtonLayout.vue";

export default Vue.extend({
	components: {
		ClubTitleLayout,
		InformationLayout,
		MembersLayout,
		ApplyButtonLayout
	},
	data() {
		return {
			componentList: [] as any,
			isLoading: false
		};
	},
	created() {
		this.$store.commit("pushLoading", {
			name: "GET_CLUB_PAGE",
			message: "동아리 페이지 불러오는 중"
		});
		this.isLoading = true;
		this.$store
			.dispatch("GET_CLUB", this.$route.params.club)
			.then(club => {
				if (!club) this.$router.push("/");
				this.componentList = club.page;
				this.isLoading = false;
				this.$store.commit("clearLoading", "GET_CLUB_PAGE");
			})
			.catch(err => {
				this.isLoading = false;
				this.$store.commit("clearLoading", "GET_CLUB_PAGE");
				this.$router.push("/");
			});
	},
	computed: {
		getComponentList(): any[] {
			return this.$store.state.club.page;
		}
	}
});
</script>

<style>
.page__main {
	display: flex;
	justify-content: center;

	width: 100%;
}
.page__main__wrapper {
	width: 100%;
	max-width: 1280px;
}
.page__notfound {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	font-family: NanumSquareEB;
	font-size: 48px;
	color: #cccccc;
}
.page__notfound .link {
	font-family: NanumSquareEB;
	font-size: 40px;
	color: #bbbbbb;
}
.page__main__component {
	width: 100%;
	margin-top: 10px;
}
</style>