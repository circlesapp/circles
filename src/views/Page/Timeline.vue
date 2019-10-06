<template>
	<div class="timeline">
		<Post></Post>
		<Post></Post>
		<Post></Post>
		<Post></Post>
		<Post></Post>
		<Post></Post>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "../../components/Post.vue";
export default Vue.extend({
	components: {
		Post
	}
});
</script>

<style>
.timeline{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>