<template>
	<div class="timeline">
		<div class="timeline__wrapper">
			<Post class="timeline__post" v-if="getPermissionCreate" :isCreate="true" @isChange="reload"></Post>
			<transition-group name="timeline">
				<Post
					class="timeline__post"
					v-for="post in posts"
					:key="post._id"
					:data="post"
					@isChange="reload"
				></Post>
			</transition-group>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "../../components/Page/Post.vue";
export default Vue.extend({
	name: "Timeline",
	components: {
		Post
	},
	data() {
		return {
			posts: []
		};
	},
	created() {
		this.reload();
	},
	methods: {
		reload() {
			this.$store
				.dispatch("GET_CLUB_POSTS")
				.then(posts => {
					this.posts = posts;
				})
				.catch(err => {});
		}
	},
	computed: {
		getClub(): any {
			return this.$store.state.club;
		},
		getPermissionCreate(): boolean {
			if (this.getClub.ranks) {
				if (this.getClub.owner == this.$store.state.userInformation._id)
					return true;
				let user = this.getClub.members.find((member: any) => {
					return member.user == this.$store.state.userInformation._id;
				});
				if (user) {
					let permission = this.getClub.ranks
						.find((rank: any) => rank.id == user.rank)
						.permission.map((x: any) => parseInt(x));
					return permission.indexOf(1) != -1;
				} else return false;
			} else return false;
		}
	}
});
</script>

<style>
.timeline-move {
	transition: 0.5s;
}
.timeline-enter-active,
.timeline-leave-active {
	transition: 0.5s;
}
.timeline-leave-active {
	position: absolute !important;
}
.timeline-enter,
.timeline-leave-to {
	transform: scale(0);
	opacity: 0;
}
.timeline-enter-to,
.timeline-leave {
	opacity: 1;
}
.timeline {
	display: flex;
	justify-content: center;
}
.timeline__wrapper {
	position: relative;
	width: 100%;
	max-width: 760px;
	margin-bottom: 25px;
}
.timeline__post {
	display: inline-block;
}
@media screen and (max-width: 768px) {
	.timeline {
		padding: 0 25px;
	}
}
</style>