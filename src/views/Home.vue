<template>
	<div class="home" v-if="!getUserInformation.name">
		<div class="home__wrapper">
			<div class="home__left">
				<p class="home__title">
					<span>빠르고 편리하게</span>
					<br />동아리를 관리하고
					<br />홍보해보세요
				</p>
				<div class="home__content">
					circles.는 빠르고 편리한 동아리 웹사이트 빌더 &amp; 동아리 관리 솔루션
					<span>
						으로,
						자체 에디터와 빌더를 활용하여 직접 손쉽게 여러분이 원하는 동아리 홍보 웹사이트, 지원 페이지,
						그리고 동아리 부원만이 사용할 수 있는 내부 커뮤니티를 제작할 수 있습니다.
					</span>
				</div>
				<router-link tag="button" to="/login" class="home__start">지금 시작하기</router-link>
			</div>
			<div class="home__right">
				<div class="home__circle"></div>
				<div class="home__preview">
					<div class="home__preview__topbar">
						<div class="r"></div>
						<div class="o"></div>
						<div class="g"></div>
					</div>
					<div class="home__preview__content">
						<div class="home__preview__content__left">
							<div style="flex:4"></div>
							<div style="flex:1"></div>
							<div style="flex:1"></div>
						</div>
						<div class="home__preview__content__right">
							<div style="flex:1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="home__functionwrapper">
			<div class="home__function__title">지원 기능</div>
			<div class="home__function__content"></div>
		</div>
	</div>

	<div class="home__login" v-else>
		<div class="home__login__profile">
			<div>
				<h1>{{getUserInformation.name}}</h1>
				<p v-if="getRank != '-'">{{`${getClub.name} ${getRank}`}}</p>
			</div>
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
		<button class="overflow__btn__logout" v-if="getUserInformation.name" @click="logout">
			<i class="mdi mdi-logout-variant"></i>
		</button>
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
	created() {
		if (this.$store.state.userToken) this.reload();
	},
	methods: {
		getImgPath(imgPath: string) {
			if (imgPath) return this.$store.state.mainPath + imgPath;
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		reload() {
			this.isShowCirclesCreatePopup = false;
			this.$store.commit("pushLoading", {
				name: "GET_USER_PROFILE",
				message: "동아리 다시 가져오는 중"
			});
			this.$store
				.dispatch("GET_USER_PROFILE", this.$store.state.userToken)
				.then(user => {
					this.$store.commit("clearLoading", "GET_USER_PROFILE");
				})
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
			this.$store.commit("pushLoading", {
				name: "GET_CLUB",
				message: "동아리 가져오는 중"
			});
			this.$store
				.dispatch("GET_CLUB", club.name)
				.then(club => {
					this.$store.commit("clearLoading", "GET_CLUB");
					if (!club) this.$router.push("/");
				})
				.catch(err => {
					this.$store.commit("clearLoading", "GET_CLUB");
					this.$router.push("/");
				});
		},
		logout() {
			localStorage.removeItem("clubs.loginToken");
			this.$store.state.userToken = "";
			this.$store.state.userInformation = {};
			this.$router.replace("/");
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
	overflow-x: hidden;
	overflow-y: auto;
}
.home__wrapper {
	width: 100vw;
	height: 100vh;

	background-color: #538fff;
	color: white;
	display: flex;
	justify-content: space-between;

	padding: 0 10%;
}
.home__left {
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 1;
}
.home__title {
	font-family: NanumSquareEB;
	font-size: 61px;

	margin-bottom: 80px;
}
.home__title span {
	font-family: NanumSquareL;
}
.home__content {
	font-family: NanumSquareR;
	font-size: 28px;

	margin-bottom: 80px;
	width: 70%;

	word-break: keep-all;
}
.home__start {
	border: none;
	width: fit-content;

	font-family: NanumSquareEB;
	font-size: 34px;

	padding: 10px 60px;
	background-color: white;
	color: #538fff;
	border-radius: 11px;
}

.home__right {
	position: relative;

	width: 30%;
}

.home__circle {
	position: absolute;

	right: -50%;
	top: 30%;

	width: 300px;
	height: 300px;

	border-radius: 100%;

	background-color: #ff4475;
	border: solid 1px #979797;
}

.home__preview {
	padding: 15px;
	position: absolute;
	right: 5%;
	top: 15%;

	width: 500px;
	height: 300px;

	display: flex;
	flex-direction: column;

	border-radius: 11px;
	background-color: white;
}
.home__preview__topbar {
	display: flex;
}
.home__preview__topbar div {
	width: 15px;
	height: 15px;

	margin-right: 10px;

	border-radius: 100%;
}
.home__preview .r {
	background-color: #ff5a52;
}
.home__preview .o {
	background-color: #ffd429;
}
.home__preview .g {
	background-color: #53c32b;
}

.home__preview__content {
	display: flex;
	flex: 1;
	width: 100%;
	margin-top: 20px;
}
.home__preview__content__left,
.home__preview__content__right {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.home__preview__content__left div,
.home__preview__content__right div {
	border-radius: 7px;
	background-color: #f5f8ff;
	margin: 10px;
}

.home__functionwrapper {
	position: relative;

	width: 100%;
	height: 400px;
	background-color: #538fff;

	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 600px;
}
.home__function__title {
	font-family: NanumSquareEB;
	font-size: 61px;
	color: white;
}
.home__function__content {
	position: absolute;
	top: 150px;
	border-radius: 40px;
	box-shadow: 0 2px 83px 0 rgba(0, 0, 0, 0.04);
	background-color: white;
	width: 90%;
	height: 600px;
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
	margin-bottom: 5px;
}
.home__login__list__applicant__item span {
	font-family: NanumSquareR;
}
.home__login__list__applicant__item .date {
	font-family: NanumSquareL;
	color: #757575;
}
@media screen and (max-width: 1680px) {
	.home__content > span {
		display: none;
	}
}
@media screen and (max-width: 1280px) {
	.home__left {
		width: 100%;
	}
	.home__content {
		width: 100%;
	}
	.home__right {
		width: 0;
	}
	.home__circle {
		display: none;
	}
	.home__preview {
        top: 25%;
        width: 300px;
        height: 200px;
	}
}
@media screen and (max-width: 1000px) {
	.home__circle {
        display: none;
	}
    .home__preview{
        display: none;
    }
}
@media screen and (max-width: 768px) {
	.home__circle {
		display: block;
        width: 200px;
        height: 200px;
        top: 20%;
	}
    .home__preview{
        display: none;
    }
	.home__title {
		font-size: 50px;
	}
	.home__start {
		margin: 0 auto;
	}
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
	.home__start {
		padding: 10px 20%;
	}
	.home__login__profile__selectclub-disable {
		margin-top: 0px;
	}
	.home__login__list__applicant-disable {
		display: none;
	}
	.overflow__btn__logout {
		display: none;
	}
}
.overflow__btn__logout {
	position: absolute;
	right: 16px;
	bottom: 16px;
	width: 46px;
	height: 46px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 50%;

	font-size: 20px;
	background: #f55246;
	color: white;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);

	transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
	cursor: pointer;
	z-index: 1999;
}
.overflow__btn__logout:hover {
	background: rgba(245, 82, 70, 0.9);
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
}
@media all and (display-mode: standalone) {
	.overflow__btn__logout {
		display: flex;
	}
}
</style>