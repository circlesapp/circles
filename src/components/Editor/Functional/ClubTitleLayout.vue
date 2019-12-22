<template>
	<div class="clubtitleLayout">
		<div class="clubtitleLayout__imgwrapper">
			<img :src="getImgPath" alt="club_logo" />
		</div>
		<h1>{{ getClub.name }}</h1>
		<router-link :to="{ name: 'page/timeline' }" tag="p">타임라인으로 이동하기</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getImgPath(): string {
			if (this.getClub.imgPath) return this.$store.state.mainPath + this.getClub.imgPath;
			else return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		}
	}
});
</script>

<style>
.clubtitleLayout {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 100px;
	background-color: white;
}
.darkTheme .clubtitleLayout {
	background-color: #282828;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
}
.clubtitleLayout__imgwrapper {
	width: 400px;
	height: 400px;
	border-radius: 100%;
	background-color: #eeeeee;
	overflow: hidden;
}
.darkTheme .clubtitleLayout__imgwrapper {
	background-color: #353535;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
}
.clubtitleLayout__imgwrapper img {
	width: 100%;
}
.clubtitleLayout h1 {
	font-size: 72px;
	margin-top: 20px;
}
.clubtitleLayout p {
	cursor: pointer;
	color: #aaaaaa;
	text-decoration: underline;
	font-size: 24px;
	margin-top: 20px;
}
</style>
