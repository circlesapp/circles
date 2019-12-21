<template>
	<div>
		<div class="clubs__list">
			<div v-for="club in clubs" :key="club._id" class="clubs__list__item">
				<img :src="getImgPath(club.imgPath)" alt="club_logo" />
				<h3>{{club.name}}</h3>
			</div>
		</div>
		<!-- :to="`/${club.name}/page/timeline`" -->
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			clubs: [] as any[],
			selectedClub: ""
		};
	},
	created() {
		this.$store.commit("pushLoading", {
			name: "GET_ALL_CLUB",
			message: "로그인 중"
		});
		this.$store
			.dispatch("GET_ALL_CLUB")
			.then(clubs => {
				this.$store.commit("clearLoading", "GET_ALL_CLUB");
				this.clubs = clubs;
			})
			.catch(err => {});
	},
	methods: {
		getImgPath(imgPath: string) {
			if (imgPath) return this.$store.state.mainPath + imgPath;
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		}
	}
});
</script>

<style>
.clubs__list {
	padding: 0 40px;
	width: 100%;
	text-align: center;
}
.clubs__list__item {
	width: 30%;

	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	border-radius: 25px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	background-color: white;

	margin: 20px;
	padding: 40px 0;

	text-decoration: none;
}
.darkmode .clubs__list__item {
	background-color: #282828;
}
.clubs__list__item h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	font-weight: normal;
	color: #202841;

	margin-top: 20px;
}
.darkmode .clubs__list__item h3 {
	color: white;
}
.clubs__list__item h4 {
	font-family: NanumSquareB;
	font-size: 26px;
	font-weight: normal;
	color: #919eab;

	white-space: nowrap;
	text-overflow: ellipsis;
	width: 80%;
	overflow-x: hidden;
}
.clubs__list__item p {
	font-family: NanumSquareR;
	font-size: 27px;
	font-weight: normal;
	color: #202841;

	margin-top: 20px;

	white-space: nowrap;
	text-overflow: ellipsis;
	width: 80%;
	overflow-x: hidden;
}
.darkmode .clubs__list__item p {
	color: #919eab;
}
.clubs__list__item img {
	width: 60px;
	height: 60px;
	border-radius: 100%;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);

	background-color: #f8fbff;
}
@media screen and (max-width: 768px) {
	.clubs__list {
		padding: 20px 0;
	}
	.clubs__list__item {
		width: 90%;
	}
}
</style>
