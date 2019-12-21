<template>
	<div class="community">
		<transition name="submenuAnimation">
			<div class="submenu" v-if="$route.name != 'community/editor'">
				<div class="submenu__list">
					<router-link :to="{ name: 'community/attendanceSheet' }" class="submenu__list__item" v-if="isAdmin">출석부</router-link>
					<router-link :to="{ name: 'community/calendar' }" class="submenu__list__item" v-if="checkPermission(42)">캘린더</router-link>
					<router-link :to="{ name: 'community/editor' }" class="submenu__list__item" v-if="isAdmin">사이트편집</router-link>
					<router-link :to="{ name: 'community/editclub' }" class="submenu__list__item" v-if="isAdmin">동아리관리</router-link>
					<router-link :to="{ name: 'community/members' }" class="submenu__list__item" v-if="isAdmin">맴버관리</router-link>
					<router-link :to="{ name: 'community/application' }" class="submenu__list__item" v-if="checkPermission(32)">채용관리</router-link>
					<router-link :to="{ name: 'community/interview' }" class="submenu__list__item" v-if="isAdmin">면접관리</router-link>
				</div>
			</div>
		</transition>

		<div class="community__content">
			<transition name="routerfade-animation">
				<router-view v-if="getClub.name"></router-view>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Community",
	data() {
		return {};
	},
	created() {
		if (this.getToken) this.reload();
	},
	watch: {
		getToken() {
			this.reload();
		}
	},
	methods: {
		reload() {
			if (!this.getClub.name || this.getClub.name.toLowerCase() != this.$route.params.club.toLowerCase()) {
				this.$store.commit("pushLoading", {
					name: "GET_CLUB",
					message: "동아리 불러오는 중"
				});
				this.$store
					.dispatch("GET_CLUB", this.$route.params.club)
					.then(club => {
						this.$store.commit("clearLoading", "GET_CLUB");
						if (!club) this.$router.push("/");
					})
					.catch(err => {
						this.$store.commit("clearLoading", "GET_CLUB");
						this.$router.push("/");
					});
			}
		},
		checkPermission(permission: number) {
			if (this.$store.state.club.ranks) {
				let user = this.$store.state.club.members.find((member: any) => {
					return member.user == this.$store.state.userInformation._id;
				});
				if (user)
					return (
						this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin ||
						this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).permission.indexOf("" + permission) != -1
					);
				else return false;
			} else return false;
		}
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getToken() {
			return this.$store.state.userToken;
		},
		isAdmin() {
			if (this.$store.state.club.ranks && this.$store.state.userInformation._id) {
				let user = this.$store.state.club.members.find((member: any) => {
					return member.user == this.$store.state.userInformation._id;
				});
				if (user) {
					return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin;
				} else return false;
			} else return false;
		}
	}
});
</script>

<style>
.submenuAnimation-enter,
.submenuAnimation-leave-to {
	height: 0px !important;
}
.submenuAnimation-enter-to,
.submenuAnimation-leave {
	height: 90px !important;
}
.submenuAnimation-enter-active,
.submenuAnimation-leave-active {
	transition: 0.5s;
}

.routerfade-animation-enter-active,
.routerfade-animation-leave-active {
	transition: 0.5s;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.routerfade-animation-enter {
	opacity: 0;
	transform: scale(0.95);
}
.routerfade-animation-enter-to {
	opacity: 1;
	transform: scale(1);
}
.routerfade-animation-leave {
	opacity: 1;
	transform: scale(1);
}
.routerfade-animation-leave-to {
	opacity: 0;
	transform: scale(1.05);
}

.community {
	display: flex;
	flex-direction: column;
}
.community__content {
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;

	position: relative;
}
.submenu__loading {
	position: absolute;
	left: 0;
	bottom: 0;
}
@media screen and (max-width: 768px) {
	.submenu__list {
		margin: 0;
	}
}
</style>
