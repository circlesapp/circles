<template>
	<div class="login">
		<div class="login__wrapper">
			<h1 class="login__title">circles.</h1>
			<h2 class="login__text">
				로그인
				<span>Login</span>
			</h2>
			<div class="login__inputwrapper">
				<h3>이메일</h3>
				<input type="email" placeholder="이메일을 입력하세요." />
			</div>
			<div class="login__inputwrapper">
				<h3>비밀번호</h3>
				<input type="password" placeholder="비밀번호를 입력하세요." />
			</div>
			<button class="login__button">로그인</button>
			<router-link to="/register" class="login__option">계정 만들기 ></router-link>
			<router-link to="/passwordchange" class="login__option"  style="margin-bottom:10%;">비밀번호 재설정 ></router-link>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
.login {
	display: flex;
	justify-content: center;
	color: #273142;
}
.login__wrapper {
	width: 100%;
	max-width: 640px;
	padding: 10px 40px;

	display: flex;
	flex-direction: column;
    justify-content: space-between;
}

.login__title {
	font-size: 50px;
	margin: 20px;
	font-family: "AvenirBlack";
	text-align: center;
}
.login__text {
	font-family: "NanumSquareL";
	font-size: 38px;
	margin: 5% 0;
    margin-bottom: 10%;

	display: flex;
	align-items: flex-end;
}
.login__text span {
	font-size: 20px;
	margin-left: 4%;
    margin-bottom: 1%;
}
.login__inputwrapper {
	padding: 10px;
}
.login__inputwrapper h3 {
	font-family: "NanumSquareL";
	font-size: 24px;
    margin-left: 10px;
}
.login__inputwrapper input {
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
.login__inputwrapper input[type="password"] {
	font: large Verdana, sans-serif;
    padding: 22px 20px;
}
.login__inputwrapper input::placeholder {
	font-family: "NanumSquareR", sans-serif;
	font-size: 24px;
	color: #999999;
}

.login__button {
	width: 60%;
	margin: 10% auto;
	padding: 5px;

	border-radius: 100px;
	background: #273142;
	color: white;
	font-size: 30px;
	font-family: "NanumSquareL";
}
.login__option {
	font-family: "NanumSquareL";
	color: #737c8c;
	font-size: 24px;
	text-align: center;
	margin: 1.5%;
}
</style>