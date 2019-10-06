<template>
	<div class="loading">
		<div class="loading__box"></div>
		<div class="loading__box"></div>
		<div class="loading__box"></div>
		<div class="loading__box"></div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style>
.loading {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;


	z-index: 2000;

	background: rgba(0, 0, 0, 0.4);

	display: flex;
	justify-content: center;
	align-items: center;
}
.loading__box {
	position: absolute;
	background-color: #f5f7fa;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
	width: 15px;
	height: 15px;
	border-radius: 100%;
	animation: rotate 2s infinite;
	opacity: 0;
}
.loading__box:nth-child(0) {
	animation-delay: 0;
}
.loading__box:nth-child(1) {
	animation-delay: 0.5s;
}
.loading__box:nth-child(2) {
	animation-delay: 1s;
}
.loading__box:nth-child(3) {
	animation-delay: 1.5s;
}

@keyframes rotate {
	0% {
		opacity: 1;
		transform: translate3d(-25px, 0, 0);
	}
	25% {
		transform: translate3d(0, -25px, 0);
	}
	50% {
		transform: translate3d(25px, 0, 0);
	}
	75% {
		transform: translate3d(0, 25px, 0);
	}
	100% {
		opacity: 1;
		transform: translate3d(-25px, 0, 0);
	}
}
</style>