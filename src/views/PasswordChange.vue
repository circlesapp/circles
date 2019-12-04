<template>
	<div class="passwordchange">
		<div class="passwordchange__wrapper">
			<h1 class="passwordchange__title">circles.</h1>
			<h2 class="passwordchange__text">
				비밀번호 재설정
				<span>Password Reset</span>
			</h2>
			<div class="passwordchange__inputwrapper">
				<h3>이메일 주소</h3>
				<input type="email" placeholder="이메일 주소를 입력하세요." />
			</div>
			<div class="passwordchange__wrapper">
				<p class="passwordchange__content">
					가입시 입력한 이메일로
					<br />비밀번호 재설정이 가능합니다
				</p>
				<button class="passwordchange__button">검증</button>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "PasswordChange"
});
</script>

<style>
.passwordchange {
	display: flex;
	justify-content: center;
	color: #273142;
}
.passwordchange__wrapper {
	width: 100%;
	max-width: 640px;
	padding: 10px 40px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.passwordchange__title {
	font-size: 50px;
	margin: 20px;
	font-family: "AvenirBlack";
	text-align: center;
}
.passwordchange__text {
	font-family: "NanumSquareL";
	font-size: 38px;
	margin: 10% 0;

	display: flex;
	align-items: flex-end;
}
.passwordchange__text span {
	font-size: 20px;
	margin-left: 4%;
	margin-bottom: 1%;
}
.passwordchange__inputwrapper {
	padding: 10px;
}
.passwordchange__inputwrapper h3 {
	font-family: "NanumSquareL";
	font-size: 24px;
	margin-left: 10px;
}
.passwordchange__inputwrapper input {
	width: 100%;

	padding: 15px;
	margin: 20px 0;

	background: none;
	border: none;
	outline: none;

	font-family: "NanumSquareR", sans-serif;
	font-size: 24px;
	color: #273142;

	border: solid 1px #eeeeee;
	border-radius: 8px;
}
.passwordchange__inputwrapper input[type="password"] {
	font: large Verdana, sans-serif;
	padding: 22px 20px;
}
.passwordchange__inputwrapper input::placeholder {
	font-family: "NanumSquareR", sans-serif;
	font-size: 24px;
	color: #999999;
}

.passwordchange__button {
	width: 60%;
	margin: 10% auto;
	padding: 5px;

	border: none;
	border-radius: 100px;
	background: #273142;
	color: white;
	font-size: 30px;
	font-family: "NanumSquareL";
}
.passwordchange__content {
	font-family: "NanumSquareL";
	font-size: 23px;
	text-align: center;
}
</style>