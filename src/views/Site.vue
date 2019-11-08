<template>
	<div class="page__main">
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
</template>

<script lang="ts">
import Vue from "vue";

import InformationLayout from "../components/Editor/Functional/InformationLayout.vue";
import MembersLayout from "../components/Editor/Functional/MembersLayout.vue";
import ApplyButtonLayout from "../components/Editor/Functional/ApplyButtonLayout.vue";

export default Vue.extend({
	components: {
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
		this.isLoading = true;
		this.$store
			.dispatch("GET_CLUB", this.$route.params.club)
			.then(club => {
				if (!club) this.$router.push("/");
				this.componentList = club.page;
				this.isLoading = false;
			})
			.catch(err => {
				this.$router.push("/");
				this.isLoading = false;
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
	max-width: 1280px;
}
</style>