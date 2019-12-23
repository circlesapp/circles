<template>
	<div class="offline">
		<div class="offline__content">
			<button class="offline__content__clear" @click="$emit('isUpdated', false)">
				<i class="mdi mdi-close"></i>
			</button>
			<div>
				<h3>인터넷 연결 끊김</h3>
				<h4>인터넷 연결 상태를 확인해보세요.</h4>
			</div>
			<div class="offline__logo">
				<div></div>
				<span>Circles.</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	mounted() {
		addEventListener("keydown", e => {
			if (e.keyCode == 27) this.$emit("isUpdated", false);
		});
	}
});
</script>

<style>
.offline {
	position: fixed;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;

	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	background-color: rgba(0, 0, 0, 0.45);

	overflow: auto;

	z-index: 2000;
}
.offline__content__clear {
	position: absolute;
	top: 40px;
	right: 40px;
	width: 42px;
	height: 42px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 30px;

	border: none;
	border-radius: 50%;
	background-color: white;
	color: rgb(46, 46, 46);

	cursor: pointer;
	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
}
.darkTheme .offline__content__clear {
	background-color: #282828;
	color: white;
}
.offline__content__clear:hover {
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	background-color: white;
}
.darkTheme .offline__content__clear:hover {
	box-shadow: none;
	background-color: white;
	color: #282828;
}
.offline__content {
	background-color: white;
	border-radius: 39px;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: column;

	width: 100%;
	max-width: 600px;

	padding: 100px 30px;
	margin: 10px;

	position: relative;
	text-align: center;
	word-break: keep-all;
}
.darkTheme .offline__content {
	background-color: #282828;
}
.offline__content h3 {
	font-family: NanumSquareB;
	font-size: 27px;
	color: #538fff;
	margin-bottom: 20px;
}
.darkTheme .offline__content h3 {
	color: white;
}
.offline__content h4 {
	font-family: NanumSquareL;
	color: #273142;
	margin-bottom: 20px;
}
.darkTheme .offline__content h4 {
	color: white;
}
.offline__logo {
	position: absolute;
	bottom: 20px;

	display: flex;
	justify-content: center;
	align-items: center;
}
.offline__logo div {
	width: 48px;
	height: 48px;
	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAAEz5JREFUeAHtnXuUVMWdx391u2eYISDDQ5YAIspjQCAJIcZlEwMqr2hyVg0MBFTgJNETjxHyBzAuSXaykTjASWRYlyTEE4wEg6Mim2TdEIxGsyuBPMyeYBTBhCSgCaKAPObZXfutHuacztAzfW/3vd11b3/rnJ7pvrfqV/X7VP1uveuK0JEACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACQRNQAUdAeXnR0A3TiiXUweuEpWcKkmpFqWrRcswUdIXks3HuNO4dhrXjopWB8SRA6KdPdKveq+qeam1wwv/ZiJAA8hEpcjXdOPFfeTk23NR6BegYF+N5PTOMUnnYBQ/hzFsl6oBj6uaN8/kKCeywWgAFmWt3tJrjLS11YroBUhWroW+O43OiajtUlZWr5a2HOzOU6ldpwFYkON6S8VIaWu9DwW/BslxAk5SEobQKGXl96ilzYcDjst68TSAImZRR/v+5RWi9Woko7LASWkSpdZIv/HrS7mfQAMocKnrjE5vedcQaT/3JNr4/9h5rSj/lfxC4r1vUkvP/rUo8Rc5UhpAETJAf7tsikj7ThT+4UWI/sIolRwRid+oPtP26wtvRvtK0O3NaNPLQTu9OVYjuh0jM5YUfqODSQvSlEpbDjqFOQgNoIC5pzc7q0SSjyLKQrf33WiJNCUf7UijG+/R8MMmUIHyUX87Nl90cnuBosszGme+uj3RmKeQUASnARQgm1JtftPssfPJn4kARojiV5dCn4BNoEzZ7+O11GiP6fCGp/Ab7dEcat/ZkXYfYVgoigYQYKakxvk7hjrtGO3xoqvpGCPtKR28hAuZXxpAkBl2ykxyFXmcPx/9TNqNDhF27AMElLkdyxtafg/xNo74eNG6Scp6XRHVZROsAbwUBS9+U2t7Ql/4jcaVHeuUvCgfHr+sAQLIq45Vna2vQHRUHjBJLJ4bF8VVpFHJoACKcR4iU0uaI1P4DQinY5l2HkwsDcoa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DeCVmEv/psAMdWSSo+Rf8fQM3aYak2aTdqNDVAu/yUrWAC4LdD7eFm7Sl7e2yhrUBjWYPrb6oYMCkUSpaDQ7uWzfzJJPnnSGpQF0kijA/4UNekyrSC0M4VatpawAUbqOAk/8NhT8rWYDu817eF0r5NIjDcAlKD+9zWvQI2AAd6I2WARjGO6nbM+ycGIbCsE2GMAmW48u8ayThwA0AA+w/PZap7WzfyNOqNZyG2TfDKPo43ccmeShsJ/B9R144j9sjiu08cS2TOkO4hoNIAiqOci8/Vu67ESzXAVjuBY1wzX4TMX3XjmIujAIXkuEjN6Djzn39Jn+FbLXpiPKL0xw4a7QAArH2lNMS7boitOnZCwyqBqFdhy6ptUwipH4fZFW0hfC+uKN6+a/4Ld58/pp8wZ2+HkHfg6jq30ABvQKfh8w7+Sy6bVEJs10JEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACpUPg/wHommBl32gEfgAAAABJRU5ErkJggg==")
		no-repeat center;
	background-size: 100%;
}
.offline__logo span {
	color: #273142;
	font-family: Avenir;
	font-size: 1.2em;
}
.darkTheme .offline__logo span {
	color: white;
}
</style>
