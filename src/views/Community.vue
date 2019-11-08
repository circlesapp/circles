<template>
	<div class="community">
		<transition name="submenuAnimation">
			<div class="submenu" v-if="$route.name != 'community/editor'">
				<div class="submenu__list">
					<router-link :to="{name:'community/editor'}" class="submenu__list__item">사이트 편집</router-link>
					<router-link :to="{name:'community/members'}" class="submenu__list__item">맴버관리</router-link>
					<router-link :to="{name:'community/application'}" class="submenu__list__item">채용관리</router-link>
					<router-link :to="{name:'community/calendar'}" class="submenu__list__item">캘린더</router-link>
				</div>
			</div>
		</transition>

		<div class="community__content">
			<transition name="routerfade-animation">
				<router-view v-if="!isLoading"></router-view>
			</transition>
		</div>
		<LoadingBar v-if="isLoading"></LoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingBar from "../components/LoadingBar.vue";
export default Vue.extend({
	name: "Community",
	components: {
		LoadingBar
	},
	data() {
		return {
			isLoading: true
		};
	},
	created() {
		if (this.getToken) this.getMembers();
	},
	watch: {
		getToken() {
			this.getMembers();
		}
	},
	methods: {
		getMembers() {
			this.$store
				.dispatch("GET_CLUB", this.$route.params.club)
				.then(club => {
					if (!club) this.$router.push("/");
					this.isLoading = false;
				})
				.catch(err => {
					this.$router.push("/");
					this.isLoading = false;
				});
		}
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getToken() {
			return this.$store.state.userToken;
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
.submenuAnimation-leave-active{
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
	overflow: scroll;

	position: relative;
}
.submenu {
	width: 100%;
	height: 90px;

	background-color: white;
	box-shadow: inset 0 1px 0 0 #d7e3f1;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transition: 0.5s;
	overflow: hidden;
	overflow-x: auto;
}
.submenu__list {
	height: 100%;
	margin-left: calc(120px + 8em);
	display: flex;
}
.submenu__list__item {
	cursor: pointer;

	width: 120px;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 14px;
	font-weight: 800;

	color: #9cb2cd;
	text-decoration: none;
}
.submenu__list__item:hover {
	background-color: #9cb2cd;
	color: white;
}
@media screen and (max-width: 768px) {
	.submenu__list {
		margin: 0;
	}
}
</style>