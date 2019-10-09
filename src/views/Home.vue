<template>
	<div class="home" v-if="!getUserInformation.name">
		<h1 class="home__title">circles.</h1>
		<p class="home__content">
			circles.는 빠르고 편리한 동아리 웹사이트 빌더 &amp; 동아리 관리 솔루션
			<span>
				으로,
				자체 에디터와 빌더를 활용하여 직접 손쉽게 여러분이 원하는 동아리 홍보 웹사이트, 지원 페이지,
				그리고 동아리 부원만이 사용할 수 있는 내부 커뮤니티를 제작할 수 있습니다.
			</span>
		</p>
		<router-link to="/login" class="home__start">시작하기</router-link>
	</div>
	<div class="home__login" v-else>
		<router-link tag="div" to="/edcan/page/timeline" class="home__login__content">
			<div>
				<i class="material-icons">description</i>
				<h2>동아리 페이지</h2>
			</div>
			<p>
				circle. 에디터를 통해 쉽고 빠르게
				동아리를 홍보하는 페이지를 제작하여
				간편한 홍보 게시물, 수상 실적, 부원 소개,
				채용 공고, 그리고 예산안의 공개 및
				작성이 가능합니다.
			</p>
		</router-link>
		<router-link tag="div" to="/edcan/community" class="home__login__content">
			<div>
				<i class="material-icons">group</i>
				<h2>동아리 커뮤니티</h2>
			</div>
			<p>
				동아리 부원만을 위한 내부 커뮤니티로,
				동아리 전용 클라우드 스토리지, 출결 관리,
				주소록, 캘린더, To-do 리스트 및 과제 관리,
				투표 및 설문조사, 회비 관리, 채용 관리,
				부원간 채팅 등의 기능이 포함되어 있습니다.
			</p>
		</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Home",
	computed: {
		getUserInformation() {
			return this.$store.state.userInformation;
		}
	}
});
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
	text-decoration: none;
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
.home__start:active {
	box-shadow: none;
}

.home__login {
	display: flex;
	flex-wrap: wrap;

	padding: 50px;
}
.home__login__content {
	flex: 1;
	flex-basis: 43%;

	border-radius: 47px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
	background-color: white;

	margin: 50px;
	padding: 50px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	transition: 0.5s;
	cursor: pointer;
}
.home__login__content:hover {
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.1);
}
.home__login__content i {
	font-size: 150px;
	color: #538fff;
}
.home__login__content h2 {
	font-family: "NanumSquareEB";
	font-size: 45px;
}
.home__login__content p {
	font-family: "NanumSquareR";
	font-size: 26px;
	color: #868686;
	word-break: keep-all;
	max-width: 500px;
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
	.home__login {
		padding: 20px;
	}
	.home__login__content {
		flex-basis: 100%;
		margin: 20px;
	}
}
</style>