<template>
	<div class="timeline">
		<Post v-for="post in posts" :key="post._id" :data="post"></Post>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "../../components/Post.vue";
export default Vue.extend({
	components: {
		Post
	},
	data() {
		return {
			posts: []
		};
	},
	created() {
		this.$store
			.dispatch("GET_CLUB_POSTS")
			.then(posts => {
				this.posts = posts;
			})
			.catch(err => {});
	}
});
</script>

<style>
.timeline {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>