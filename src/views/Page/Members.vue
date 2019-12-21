<template>
	<div class="members">
		<MemberBox v-for="user in members" class="mbmbers__item" :key="user._id" :data="user"></MemberBox>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import MemberBox from "../../components/Page/MemberBox.vue";
export default Vue.extend({
	name: "Members",
	components: {
		MemberBox
	},
	data() {
		return {
			members: []
		};
	},
	created() {
		this.$store.commit("pushPageLoading", {
			name: "GET_CLUB_MEMBERS",
			message: "동아리 멤버 불러오는 중"
		});
		this.$store
			.dispatch("GET_CLUB_MEMBERS")
			.then(members => {
				this.$store.commit("clearPageLoading", "GET_CLUB_MEMBERS");
				this.members = members;
			})
			.catch(err => {});
	}
});
</script>


<style>
.members {
	display: flex;
	flex-wrap: wrap;
}
.mbmbers__item {
	flex: 1;
	flex-basis: 30%;
}
@media screen and (max-width: 768px) {
	.mbmbers__item {
		flex-basis: 100%;
	}
}
</style>