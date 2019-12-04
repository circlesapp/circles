<template>
	<div class="loading">
		<svg class="loading__circular" viewBox="25 25 50 50">
			<circle
				class="loading__path"
				cx="50"
				cy="50"
				r="20"
				fill="none"
				stroke-width="2"
				stroke-miterlimit="10"
			/>
		</svg>
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

	width: 100vw;
	height: 100vh;

	z-index: 2000;

	background: rgba(0, 0, 0, 0.4);

	display: flex;
	justify-content: center;
	align-items: center;

	overflow: hidden;
}
.loading__circular {
	animation: rotate 2s linear infinite;
	height: 100px;
	transform-origin: center center;
	width: 100px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.loading__path {
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	animation: dash 1.5s ease-in-out infinite;
	stroke-linecap: round;
	stroke: white;
	stroke-width: 4px;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 89, 200;
		stroke-dashoffset: -35px;
	}
	100% {
		stroke-dasharray: 89, 200;
		stroke-dashoffset: -124px;
	}
}
</style>