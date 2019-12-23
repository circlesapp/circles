<template>
	<div>
		<div class="clubs__list">
			<div class="clubs__list__item"></div>
			<div v-for="club in clubs" :key="club._id" class="clubs__list__item">
				<div class="clubs__list__item__header">
					<img :src="getImgPath(club.imgPath)" alt="club_logo" />
					<h3>{{ club.name }}</h3>
				</div>
				<div class="clubs__list__item__divider"></div>
				<router-link :to="`/${club.name}/page/timeline`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i> 페이지</router-link>
				<div class="clubs__list__item__indent"></div>
				<router-link :to="`/${club.name}/community/${communityPermissionRoute}`" v-if="isAdmin" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i> 커뮤니티</router-link>
				<router-link :to="`/${club.name}`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i> 사이트</router-link>
			</div>
		</div>
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
			else return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		}
	},
	computed: {
		getUserInformation(): any {
			return this.$store.state.userInformation;
		},
		getUserImage() {
			if (this.$store.state.userInformation.imgPath) return this.$store.state.mainPath + this.$store.state.userInformation.imgPath;
			else return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getClub() {
			return this.$store.state.club;
		},
		isShowMenuRoute(): boolean {
			return (
				["login", "register", "passwordchange", "page404", "community/editor", "site"].indexOf(this.$route.name || "") == -1 && !(this.$route.name == "home" && !this.getUserInformation.name)
			);
		},
		getRank() {
			if (this.$store.state.club.name) {
				try {
					return this.$store.state.club.ranks.find((x: any) => this.$store.state.club.members.find((x: any) => x.user == this.$store.state.userInformation._id).rank == x.id).name;
				} catch (e) {
					return "-";
				}
			} else {
				return "-";
			}
		},
		isAdmin(): number {
			let acceptPermissions = [32, 42];
			if (this.$store.state.club.ranks && this.$store.state.userInformation._id) {
				let user = this.$store.state.club.members.find((member: any) => {
					return member.user == this.$store.state.userInformation._id;
				});
				if (user) {
					let rank = this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank);
					if (rank.isAdmin) {
						return 1000;
					} else {
						return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).permission.find((permission: string) => acceptPermissions.indexOf(parseInt(permission)) != -1);
					}
				} else return 0;
			} else return 0;
		},
		communityPermissionRoute(): string {
			return this.isAdmin == 1000 ? "editclub" : this.isAdmin == 32 ? "application" : this.isAdmin == 42 ? "calendar" : "";
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
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;

	border-radius: 20px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	background-color: white;

	margin: 20px;
	padding: 20px;
}
.darkTheme .clubs__list__item {
	background-color: #282828;
}
.clubs__list__item__header {
	display: flex;
	justify-content: center;
	align-items: center;
}
.clubs__list__item img {
	width: 40px;
	height: 40px;
	border-radius: 100%;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);

	background-color: #f8fbff;
}
.clubs__list__item h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	font-weight: normal;
	color: #202841;

	margin-left: 10px;
}
.darkTheme .clubs__list__item h3 {
	color: white;
}
.clubs__list__item__divider {
	width: 80%;
	height: 1px;
	border-bottom: 1px solid #9cb1cd;
}
.clubs__list__item__link {
	color: #9cb1cd;
	text-decoration: none;
}
.clubs__list__item__link:hover {
}
.clubs__list__item__indent {
	margin-left: 10px;
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
