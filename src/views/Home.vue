<template>
	<div class="home">
		<h1 class="home__title">clubs.</h1>
		<p class="home__content">
			Clubs는 빠르고 편리한 동아리 웹사이트 빌더 &amp; 동아리 관리 솔루션
			<span>
				으로,
				자체 에디터와 빌더를 활용하여 직접 손쉽게 여러분이 원하는 동아리 홍보 웹사이트, 지원 페이지,
				그리고 동아리 부원만이 사용할 수 있는 내부 커뮤니티를 제작할 수 있습니다.
			</span>
		</p>
		<button class="home__start">시작하기</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
.home {
	width: 100%;
	height: 100%;

	background-color: #538fff;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 90px;
}
.home__title {
	font-family: "NanumSquareEB";
	font-weight: 900;
	font-size: 100px;
}
.home__content {
	width: 60%;

	word-break: keep-all;
	font-size: 30px;
	text-align: center;

	margin: 80px 0;
	margin-bottom: 110px;
}
.home__start {
	cursor: pointer;
	font-family: "NanumSquareEB";
	border: none;
	background-color: white;
	color: #538fff;
	font-size: 35px;
	padding: 15px 136px;
	border-radius: 100px;
	outline: none;

    transition: 0.5s;
}
.home__start:hover {
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.5);
    background-color: #538fff;
    color: white;
}
.home__start:active{
	box-shadow: none;
}

@media screen and (max-width: 768px) {
	.home__content {
		width: 80%;
		margin: 10% 0;
		margin-bottom: 20%;
	}
	.home__content > span {
		display: none;
	}
	.home__start {
		padding: 10px 20%;
	}
}
</style>