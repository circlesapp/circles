<template>
	<div class="applicant__main">
		<router-link tag="div" to="applicant/application" class="applicant__main__item">
			<i class="material-icons">description</i>
			<h2>지원서 작성</h2>
			<p>
				동아리 지원을 위한
				<br />지원서를 작성합니다.
			</p>
		</router-link>
		<router-link tag="div" to="applicant/recorder" class="applicant__main__item">
			<i class="material-icons">record_voice_over</i>
			<h2>페이저 수신기</h2>
			<p>
				대기자 원격 호출을 위한
				<br />페이저 수신기입니다.
			</p>
		</router-link>
		<router-link tag="div" to="applicant/result" class="applicant__main__item">
			<i class="material-icons">assignment_turned_in</i>
			<h2>결과 확인</h2>
			<p>
				지원 결과를 확인하는
				<br />페이지 입니다.
			</p>
		</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
.applicant__main {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 30px;
}
.applicant__main__item {
	flex: 1;
	margin: 30px;
	padding: 80px 20px;
	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	background-color: white;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	transition: 0.5s;
	cursor: pointer;
}
.applicant__main__item:hover {
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.1);
}
.applicant__main__item i {
	font-size: 150px;
	color: #538fff;
}
.applicant__main__item h2 {
	font-family: "NanumSquareEB";
	font-size: 40px;
	margin: 40px 0;
}
.applicant__main__item p {
	font-family: "NanumSquareR";
	font-size: 24px;
	color: #868686;
	word-break: keep-all;
	max-width: 500px;
	text-align: center;
}
@media screen and (max-width: 1279px) {
	.applicant__main__item {
		flex-basis: 100%;
	}
}
</style>