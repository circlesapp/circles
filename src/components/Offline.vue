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
	width: 26px;
	height: 26px;
	background: url("../assets/logo.svg") no-repeat center;
	background-size: 100%;
	margin-right: 6px;
}
.offline__logo span {
	color: #273142;
	font-family: AvenirBlack;
	font-size: 1.2em;
}
.darkTheme .offline__logo span {
	color: white;
}
</style>
