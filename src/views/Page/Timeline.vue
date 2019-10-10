<template>
	<div class="timeline">
		<transition-group name="timeline" tag="div" class="timeline__wrapper">
			<Post
				class="timeline__post"
				v-for="post in posts"
				:key="post._id"
				:data="post"
				@isChange="reload"
			></Post>
		</transition-group>
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
			console.log("reload");
			this.$store
				.dispatch("GET_CLUB_POSTS")
				.then(posts => {
					this.posts = posts;
				})
				.catch(err => {});
		}
	}
});
</script>

<style>
.timeline-enter,
.timeline-leave-to {
	opacity: 0;
    transform: translateX(20%);
}
.timeline-leave-active {
	position: absolute;
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
	transition: all 1s;
	display: inline-block;
}
@media screen and (max-width: 768px) {
	.timeline {
		padding: 0 25px;
	}
}
</style>