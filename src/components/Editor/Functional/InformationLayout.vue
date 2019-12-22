<template>
	<div class="informationLayout" @contextmenu="$emit('contextmenu', $event)">
		<h2>동아리 소개</h2>
		<p>{{ getClub.introduction }}</p>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	computed: {
		getClub() {
			return this.$store.state.club;
		}
	}
});
</script>

<style scoped>
.informationLayout {
	background-color: white;
	padding: 40px;
}
.darkTheme .informationLayout {
	background-color: #282828;
}
.informationLayout h2 {
	font-family: NanumSquareB;
	font-size: 28px;
	margin-bottom: 10px;
}
.informationLayout p {
	font-family: NanumSquareL;
	font-size: 28px;
}
</style>
