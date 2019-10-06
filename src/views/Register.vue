<template>
	<div class="register">
		<div class="register__wrapper">
			<h1 class="register__title">circles.</h1>
			<h2 class="register__text">
				회원가입
				<span>Join</span>
			</h2>
			<div class="register__inputwrapper">
				<h3>이용약관</h3>
				<p class="register__textarea">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, molestias doloremque consequatur id dicta dolores enim mollitia aliquid, odit nobis suscipit qui quibusdam cum ea voluptate natus temporibus deleniti perspiciatis.</p>
			</div>
			<div class="register__rowwrapper">
				<div class="register__inputwrapper">
					<h3>이름</h3>
					<input type="text" placeholder="이름을 입력하세요." />
				</div>
				<div class="register__inputwrapper" style="margin-left:20px;">
					<h3>이메일</h3>
					<input type="email" placeholder="이메일을 입력하세요." />
				</div>
			</div>
			<div class="register__inputwrapper">
				<h3>비밀번호</h3>
				<input type="password" placeholder="비밀번호를 입력하세요." />
			</div>
			<button class="register__button">회원가입</button>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
.register {
	display: flex;
	justify-content: center;
	color: #273142;
}
.register__wrapper {
	width: 100%;
	max-width: 1000px;
	padding: 10px 40px;

	display: flex;
	flex-direction: column;
    justify-content: space-between;
}
.register__rowwrapper {
	width: 100%;
	display: flex;
}
.register__rowwrapper > div {
	flex: 1;
}

.register__title {
	font-size: 50px;
	margin: 20px;
	font-family: "AvenirBlack";
	text-align: center;
}
.register__text {
	font-family: "NanumSquareL";
	font-size: 38px;
	margin: 2% 0;

	display: flex;
	align-items: flex-end;
}
.register__text span {
	font-size: 20px;
    	margin-left: 4%;
    margin-bottom: 1%;
}
.register__inputwrapper {
	padding: 10px;
}
.register__inputwrapper h3 {
    margin-left: 10px;
	font-family: "NanumSquareL";
	font-size: 24px;
}
.register__inputwrapper input {
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
.register__inputwrapper input[type="password"] {
	font: large Verdana, sans-serif;
    padding: 22px 20px;
}
.register__inputwrapper input::placeholder {
	font-family: "NanumSquareR", sans-serif;
	font-size: 24px;
	color: #999999;
}

.register__textarea{
    padding: 20px;
	margin: 20px 0;
    border: 1px solid #eeeeee;
    border-radius: 8px;
}

.register__button {
	width: 30%;
	margin: 5% auto;
	padding: 5px;

	border-radius: 100px;
	background: #273142;
	color: white;
	font-size: 30px;
	font-family: "NanumSquareL";
}
</style>