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
				<p v-if="getRank != '-'">{{`${getClub.name} ${getRank}`}}</p>
			</div>
			<!-- // TODO: 로그아웃, 동아리 생성 버튼, 홍보페이지 어떻게가지? -->
			<img :src="getImgPath(getClub.imgPath)" v-if="getRank != '-'" />
		</div>
		<div class="home__login__list">
			<div
				class="home__login__list__applicant"
				:class="{'home__login__list__applicant-disable':getUserInformation.applicants.length == 0}"
			>
				<h2>신청한 동아리</h2>
				<span class="time"></span>
				<ul>
					<router-link
						tag="li"
						:to="`/${applicant.club.name}/page/applicant/application`"
						class="home__login__list__applicant__item"
						v-for="applicant in getUserInformation.applicants"
						:key="applicant._id"
					>
						<span>{{applicant.club.name}}</span>
						<span class="date">{{new Date(applicant.createAt).toLocaleDateString()}}</span>
					</router-link>
				</ul>
			</div>
			<div
				class="home__login__profile__selectclub"
				:class="{'home__login__profile__selectclub-disable':getUserInformation.applicants.length == 0}"
			>
				<div class="home__login__profile__selectclub__header">
					<h2>가입한 동아리</h2>
					<button @click="isShowCirclesCreatePopup=true">
						<i class="mdi mdi-plus"></i>
					</button>
				</div>
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
		</div>
		<CirclesCreatePopup v-if="isShowCirclesCreatePopup" @isUpdated="reload" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import CirclesCreatePopup from "../components/CirclesCreatePopup.vue";
export default Vue.extend({
	name: "Home",
	components: {
		CirclesCreatePopup
	},
	data() {
		return {
			searchClub: "",
			isShowCirclesCreatePopup: false,
			targetCurrentIndex: 0
		};
	},
	methods: {
		getImgPath(imgPath: string) {
			if (imgPath) return this.$store.state.mainPath + imgPath;
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		reload() {
			this.isShowCirclesCreatePopup = false;
			this.$store
				.dispatch("GET_USER_PROFILE", this.$store.state.userToken)
				.then(user => {})
				.catch(err => {});
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
			this.targetCurrentIndex = idx;
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
	width: 120px;
	height: 120px;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	background-color: white;
	border-radius: 100%;
}

.home__login__list {
	display: flex;

	position: relative;
	top: -60px;
	height: calc(100vh - 350px);
	background-color: white;
	border-radius: 25px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	margin: 0 60px;
	padding: 50px;
}

.home__login__profile__selectclub {
	flex: 1;

	display: flex;
	flex-direction: column;

	margin-left: 60px;
}
.home__login__profile__selectclub__header {
	display: flex;
	justify-content: space-between;
}
.home__login__profile__selectclub h2 {
	font-family: NanumSquareB;
	font-size: 30px;
}
.home__login__profile__selectclub__header button {
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: NanumSquareB;
	font-size: 26px;
	border: none;
	border-radius: 50%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	background-color: #538fff;
	color: white;
	padding: 4px 10px;

	cursor: pointer;
	transition: 0.2s;
}
.home__login__profile__selectclub__header button:hover {
	background-color: #538fffe1;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
}
.home__login__profile__selectclub__search {
	margin-top: 20px;
	margin-bottom: 10px;

	outline: none;
	border: none;
	background: none;
	font-family: "NanumSquareR";
	font-size: 20px;
	padding: 15px;
	border: solid 1px #eeeeee;

	width: 100%;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
}
.home__login__profile__selectclub__list {
	flex: 1;
	overflow-y: auto;

	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.05);
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

.home__login__list__applicant {
	flex: 1;
}
.home__login__list__applicant h2 {
	font-family: NanumSquareB;
	font-size: 30px;
}
.home__login__list__applicant ul {
	list-style: none;
	margin-top: 20px;
	font-size: 30px;
}
.home__login__list__applicant__item {
	display: flex;
	justify-content: space-between;
	width: 100%;

	cursor: pointer;
}
.home__login__list__applicant__item span {
	font-family: NanumSquareR;
}
.home__login__list__applicant__item .date {
	font-family: NanumSquareL;
	color: #757575;
}
@media screen and (max-width: 768px) {
	.home__login__list {
		margin: 0 20px;
		flex-direction: column;
		height: auto;
		padding: 40px;
	}
	.home__login__profile__selectclub {
		margin-left: 0;
		margin-top: 60px;
	}
	.home__login__profile__selectclub__list {
		max-height: 400px;
		overflow-y: auto;
	}
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
	.home__login__profile__selectclub-disable {
		margin-top: 0px;
	}
	.home__login__list__applicant-disable {
		display: none;
	}
}
</style>