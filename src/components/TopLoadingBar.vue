<template>
	<div class="toploading"></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.toploading {
	width: 100%;
	height: 5px;

	background-color: rgba(83, 143, 255, 0.2);
	overflow: hidden;
}
.toploading::before {
	position: absolute;
	bottom: 0;
	left: 0;
	content: "";
	height: 5px;
	width: 30%;
	animation: loading 2s infinite;
	background-color: #538fff;

	border-radius: 10px;
}
@keyframes loading {
	0% {
		left: -30%;
	}
	100% {
		left: 100%;
	}
}
</style>