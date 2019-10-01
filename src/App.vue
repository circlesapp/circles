<template>
	<div id="app">
        <!-- 테스트 용 -->
		<div class="top1">
			<div class="top1__left">clubs.</div>
			<div class="top1__right">
				<div class="top1__right__item" >페이지</div>
				<div class="top1__right__item">드라이브</div>
				<div class="top1__right__item">관리</div>
                <div class="top__right__bottombar"></div>
			</div>
		</div>
		<div class="top2">
			<div class="top2__left"></div>
			<div class="top2__right">
				<div class="top2__right__item">타임라인</div>
				<div class="top2__right__item">수상실적</div>
				<div class="top2__right__item">부원소개</div>
				<div class="top2__right__item">예산 공개 개시판</div>
				<div class="top2__right__item">설문조사</div>
				<div class="top2__right__item">채용</div>
			</div>
		</div>
		<!-- <router-view /> -->
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* 테스트 용 */
@font-face {
	font-family: "AvenirBlack";
	src: url("./assets/Avenir Black.ttf") format("truetype");
}
body {
	background-color: #f5f7fa;
}
.top1 {
	background-color: #538fff;
	height: 94px;

	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.top1__left {
	font-family: "AvenirBlack";
	font-size: 38px;
	color: white;
	font-weight: 900;
	margin-left: 2%;

	width: 250px;
}
.top1__right {
    position: relative;
    height: 100%;
	display: flex;
}
.top__right__bottombar{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 120px;
    background-color: white;
    opacity: 0;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.0);
    bottom: -5px;
}
.top1__right__item {
	width: 120px;
    height: 100%;
	font-size: 14px;
	color: white;

	display: flex;
	justify-content: center;
	align-items: center;
}
.top1__right__item:hover~.top__right__bottombar{
    opacity: 1;
    bottom: 0;
}
.top1__right__item:nth-child(1):hover~.top__right__bottombar{
    left: 0px;
}
.top1__right__item:nth-child(2):hover~.top__right__bottombar{
    left: 120px;
}
.top1__right__item:nth-child(3):hover~.top__right__bottombar{
    left: 240px;
}
.top2 {
	background-color: #ffffff;
	height: 94px;

	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.top2__right {
    height: 100%;
	margin: calc(2% + 250px);
	display: flex;
}
.top2__right__item {
	width: 120px;
    height: 100%;
	font-size: 14px;
	color: #9cb2cd;

	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
