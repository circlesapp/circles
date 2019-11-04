<template>
	<div class="home" v-if="!getUserInformation.name">
		<h1 class="home__title">circles.</h1>
		<p class="home__content">
			circles.는 빠르고 편리한 동아리 웹사이트 빌더 &amp; 동아리 관리 솔루션
			<span>
				으로,
				자체 에디터와 빌더를 활용하여 직접 손쉽게 여러분이 원하는 동아리 홍보 웹사이트, 지원 페이지,
				그리고 동아리 부원만이 사용할 수 있는 내부 커뮤니티를 제작할 수 있습니다.
			</span>
		</p>
		<router-link to="/login" class="home__start">시작하기</router-link>
	</div>
	<div class="home__login" v-else>
		<div class="home__login__profile">
			<div>
				<h1>{{getUserInformation.name}}</h1>
				<p>{{getClub.name}} {{getRank}}</p>
			</div>
			<transition name="clubselect">
				<div class="home__login__profile__selectclub" v-if="isClubSelectShow">
					<input
						@keydown="userInputKeyPress"
						v-model="searchClub"
						type="text"
						class="home__login__profile__selectclub__search"
					/>
					<div class="home__login__profile__selectclub__list">
						<div
							class="home__login__profile__selectclub__list__item"
							:class="{'home__login__profile__selectclub__list__item-active':idx == targetCurrentIndex,'home__login__profile__selectclub__list__item-current':club._id == getClub._id}"
							v-for="(club,idx) in getClubs"
							:key="club._id"
							@click="selectClub(idx)"
						>
							<img :src="getImgPath(club.imgPath)" alt />
							{{club.name}}
						</div>
					</div>
				</div>
			</transition>

			<img :src="getImgPath(getClub.imgPath)" @click="isClubSelectShow=!isClubSelectShow" />
		</div>
		<div class="home__login__list"></div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Home",
	data() {
		return {
			searchClub: "",
			targetCurrentIndex: 0,
			isClubSelectShow: false
		};
	},
	methods: {
		getImgPath(imgPath: string) {
			if (imgPath) return this.$store.state.mainPath + imgPath;
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		userInputKeyPress(e: any) {
			if (this.targetCurrentIndex >= this.getClubs.length)
				this.targetCurrentIndex = this.getClubs.length;
			switch (e.keyCode) {
				case 13:
					this.selectClub(this.targetCurrentIndex);
					break;
				case 38:
					if (this.targetCurrentIndex > 0) this.targetCurrentIndex--;
					break;
				case 40:
					if (this.targetCurrentIndex < this.getClubs.length - 1)
						this.targetCurrentIndex++;
					break;
			}
		},
		selectClub(idx: number) {
			let club = this.getClubs[idx];
			this.$store
				.dispatch("GET_CLUB", club.name)
				.then(club => {
					if (!club) this.$router.push("/");
				})
				.catch(err => {
					this.$router.push("/");
				});
		}
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getUserInformation() {
			return this.$store.state.userInformation;
		},
		getRank() {
			if (this.$store.state.club.name) {
				try {
					return this.$store.state.club.ranks.find(
						(x: any) =>
							this.$store.state.club.members.find(
								(x: any) =>
									x.user ==
									this.$store.state.userInformation._id
							).rank == x.id
					).name;
				} catch (e) {
					return "-";
				}
			} else {
				return "-";
			}
		},
		getUserImage() {
			if (this.$store.state.userInformation.imgPath)
				return (
					this.$store.state.mainPath +
					this.$store.state.userInformation.imgPath
				);
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getClubs(): any[] {
			return this.getUserInformation.clubs.filter(
				(club: any) => club.name.indexOf(this.searchClub) != -1
			);
		}
	}
});
</script>

<style>
.clubselect-enter-active,
.clubselect-leave-active {
	transition: 0.5s;
}
.clubselect-enter,
.clubselect-leave-to {
	height: 0px !important;
}
.clubselect-enter-to,
.clubselect-leave {
	height: 400px !important;
}

.home {
	width: 100%;
	height: 100%;

	background-color: #538fff;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 90px;
}
.home__title {
	font-family: "NanumSquareEB";
	font-weight: 900;
	font-size: 100px;
}
.home__content {
	width: 60%;

	word-break: keep-all;
	font-size: 30px;
	text-align: center;

	margin: 80px 0;
	margin-bottom: 110px;
}
.home__start {
	cursor: pointer;
	font-family: "NanumSquareEB";
	text-decoration: none;
	border: none;
	background-color: white;
	color: #538fff;
	font-size: 35px;
	padding: 15px 136px;
	border-radius: 100px;
	outline: none;

	transition: 0.5s;
}
.home__start:hover {
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.5);
	background-color: #538fff;
	color: white;
}
.home__start:active {
	box-shadow: none;
}

.home__login__profile {
	height: 250px;
	background-color: #538fff;
	color: white;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 60px;
	padding-bottom: 60px;
	position: relative;
}
.home__login__profile h1 {
	font-family: NanumSquareEB;
	font-size: 50px;
}
.home__login__profile p {
	font-family: NanumSquareL;
	font-size: 30px;
}
.home__login__profile img {
	cursor: pointer;
    
	width: 120px;
	height: 120px;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	background-color: white;
	border-radius: 100%;
}
.home__login__list {
	position: relative;
	top: -60px;
	height: 100%;
	background-color: white;
	border-radius: 25px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	margin: 0 60px;
}

.home__login__profile__selectclub {
	position: absolute;
	right: 70px;
	top: 170px;
	height: 400px;

	background-color: white;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	z-index: 2000;
	border-radius: 25px;

	overflow: hidden;
}
.home__login__profile__selectclub__search {
	outline: none;
	border: none;
	background: none;
	font-family: "NanumSquareR";
	font-size: 24px;
	padding: 15px;
	border: solid 1px #eeeeee;

	width: 100%;
}
.home__login__profile__selectclub__list {
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 100px;
}
.home__login__profile__selectclub__list__item {
	display: flex;
	align-items: center;
	padding: 15px;
	font-size: 24px;
	color: #273142;

	cursor: pointer;
}
.home__login__profile__selectclub__list__item img {
	height: 1.5em;
	width: 1.5em;
	margin-right: 10px;
}
.home__login__profile__selectclub__list__item-active {
	background-color: #eeeeee;
}
.home__login__profile__selectclub__list__item-current {
	background-color: #538fff;
	color: white;
}
@media screen and (max-width: 768px) {
	.home__content {
		width: 80%;
		margin: 10% 0;
		margin-bottom: 20%;
	}
	.home__content > span {
		display: none;
	}
	.home__start {
		padding: 10px 20%;
	}
}
</style>