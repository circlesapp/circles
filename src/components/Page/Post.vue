<template>
	<div class="post">
		<h3 class="post__title">
			<img
				:src="data.owner.imgPath || 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg'"
			/>
			<p>
				<span class="clubname">{{data.owner.name}}</span>
				님이
				<span v-if="data.imgPath.length">사진 {{data.imgPath.length}}장을 업로드했습니다.</span>
				<span>글을 업로드했습니다.</span>
				<br />
				<span class="moment">{{data.timeString}}</span>
			</p>
			<i class="material-icons post__menu">more_horiz</i>
		</h3>
		<article class="post__content">{{data.content}}</article>
		<article class="post__image" v-if="data.imgPath.length">
			<div class="post__image__mainImage">
				<img :src="getMainPath+data.imgPath[0]" alt />
			</div>
			<div class="post__image__sublist" v-if="data.imgPath.length > 2">
				<div class="post__image__subImage">
					<img :src="getMainPath+data.imgPath[1]" alt />
				</div>
				<div class="post__image__subImage">
					<img :src="getMainPath+data.imgPath[1]" alt />
				</div>
			</div>
		</article>
		<div class="post__action">
			<p class="post__action__heart">
				<i class="material-icons">favorite</i>
				{{data.likes.length}}
			</p>
			<p class="post__action__comment">
				<i class="material-icons">insert_comment</i>
				{{data.comments.length}}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	},
	computed: {
		getMainPath(): string {
			return this.$store.state.mainPath;
		}
	}
});
</script>

<style>
.post {
	width: 100%;
	max-width: 760px;
	height: auto;

	padding: 25px;
	margin: 25px;

	background-color: white;
	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
}
.post__title {
	position: relative;

	display: flex;
	align-items: center;

	font-size: 14px;
	font-weight: normal;
}
.post__title .clubname {
	font-weight: 600;
}
.post__title .moment {
	font-size: 10px;
	font-weight: 600;
	color: #919eab;
}
.post__title img {
	width: 40px;
	height: 40px;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	border-radius: 100%;
	margin-right: 2%;
}

.post__menu {
	cursor: pointer;
	position: absolute;
	right: 0;
	color: #919eab;
}

.post__content {
	margin: 25px 0;
	font-size: 14px;
	line-height: 1.43;
}
.post__image {
	display: flex;
	height: 400px;
}
.post__image__mainImage {
	flex: 2;
	height: 100%;
	margin-right: 10px;

	background-color: #f8fbff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.post__image__sublist {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.post__image__subImage {
	flex: 1;
	width: 100%;

	background-color: #f8fbff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.post__image__subImage:nth-child(1) {
	margin-bottom: 10px;
}
.post__image img {
	height: 100%;
}
.post__action {
	display: flex;

	display: flex;

	margin-top: 25px;
}
.post__action p {
	display: flex;
	align-items: center;
	margin-right: 30px;

	font-size: 14px;
	font-weight: 500;

	color: #202841;
}
.post__action__heart i {
	color: #ff4475;
	font-size: 25px;
	margin-right: 10px;
}
.post__action__comment i {
	color: #538fff;
	font-size: 25px;
	margin-right: 10px;
}
</style>