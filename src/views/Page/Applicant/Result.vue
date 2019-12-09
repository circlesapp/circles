<template>
	<div class="result">
		<div class="result__item">
			<div>
				<p>20611</p>
				<h3>박종훈</h3>
			</div>
			<div class="result__item__information">현재 면접자</div>
		</div>
		<div class="result__item">
			<div>
				<p>20611</p>
				<h3>박종훈</h3>
			</div>
			<div class="result__item__information">현재 면접자</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.result {
	padding: 20px;
	width: 100%;
	height: fit-content;
	display: flex;
	flex-wrap: wrap;
}
.result__item {
	margin: 20px;
	flex: 1;
	flex-basis: 40%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);

	padding: 40px 50px;
	color: #9cb2cd;
	background-color: white;
}
.result__item h3 {
	font-family: "NanumSquareB";
	font-size: 69px;
}
.result__item p {
	font-family: "NanumSquareL";
	font-size: 40px;
}
.result__item__information {
	align-self: flex-start;
	font-family: "NanumSquareL";
	font-size: 40px;
}
.darkmode .result__item {
	background-color: #282828;
}
@media screen and (max-width: 1200px) {
	.result__item {
		flex-basis: 100%;
	}
}
</style>