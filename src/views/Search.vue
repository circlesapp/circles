<template>
	<div class="search">
		<div class="search__main">
			<h2>동아리 검색</h2>
			<p>원하는 동아리를 찾아보세요.</p>
		</div>
		<div class="search__input">
			<i class="mdi mdi-magnify"></i>
			<input type="search" v-model="search" />
		</div>
		<transition-group name="clubs" class="search__list" tag="div">
			<router-link
				:to="`/${club.name}/page/timeline`"
				class="search__list__item"
				v-for="club in filterClub"
				:key="club._id"
			>
				<img :src="getImgPath(club.imgPath)" alt="club_logo" />
				<h3>{{club.name}}</h3>
				<h4>{{club.school || "-"}}</h4>
				<p>{{club.introduction || "-"}}</p>
			</router-link>
		</transition-group>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			clubs: [] as any[],
			filterClub: [] as any[],
			searchTimer: 0 as number,
			search: ""
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
				this.filterClub = clubs;
			})
			.catch(err => {});
	},
	methods: {
		getImgPath(imgPath: string) {
			if (imgPath) return this.$store.state.mainPath + imgPath;
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		}
	},
	watch: {
		search() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
			}
			this.searchTimer = setTimeout(() => {
				this.filterClub = this.clubs.filter(
					(club: any) =>
						club.name
							.toLowerCase()
							.indexOf(this.search.toLowerCase()) != -1 ||
						club.school
							.toLowerCase()
							.indexOf(this.search.toLowerCase()) != -1
				);
			}, 300);
		}
	}
});
</script>

<style>
.clubs-move {
	transition: 0.5s;
}
.clubs-enter-active,
.clubs-leave-active {
	transition: 0.5s;
}
.clubs-leave-active {
	position: absolute;
}
.clubs-enter,
.clubs-leave-to {
	transform: translateY(100vh) scale(0);
	opacity: 0;
}
.clubs-enter-to,
.clubs-leave {
	opacity: 1;
}

.search__main {
	height: 300px;
	background-color: #538fff;
	color: white;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding-bottom: 50px;
}
.darkTheme .search__main {
	background-color: #282828;
}
.search__main h2 {
	font-family: NanumSquareEB;
	font-size: 50px;
	margin-bottom: 10px;
}
.search__main p {
	font-family: NanumSquareL;
	font-size: 30px;
}

.search__input {
	font-size: 40px;
	font-weight: 300;

	max-width: 1000px;
	border-radius: 100px;

	background-color: white;
	margin: 0 auto;
	position: relative;
	top: -50px;

	display: flex;
	align-items: center;
}
.darkTheme .search__input {
	background-color: #656565;
}
.search__input input {
	width: 100%;

	border: none;
	background: none;
	outline: none;
	font-size: 36px;
	font-weight: 300;
	padding-left: 10px;
}
.darkTheme .search__input input {
	color: white;
}
.search__input i {
	font-size: 1.5em;
	padding: 0 20px;
	padding-top: 5px;
}
.search__list {
	padding: 0 40px;
	width: 100%;
	text-align: center;
}
.search__list__item {
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
.darkTheme .search__list__item {
	background-color: #282828;
}
.search__list__item h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	font-weight: normal;
	color: #202841;

	margin-top: 20px;
}
.darkTheme .search__list__item h3 {
	color: white;
}
.search__list__item h4 {
	font-family: NanumSquareB;
	font-size: 26px;
	font-weight: normal;
	color: #919eab;

	white-space: nowrap;
	text-overflow: ellipsis;
	width: 80%;
	overflow-x: hidden;
}
.search__list__item p {
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
.darkTheme .search__list__item p {
	color: #919eab;
}
.search__list__item img {
	width: 170px;
	height: 170px;
	border-radius: 100%;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);

	background-color: #f8fbff;
}
@media screen and (max-width: 768px) {
	.search__list {
		padding: 20px 0;
	}
	.search__list__item {
		width: 90%;
	}
}
</style>