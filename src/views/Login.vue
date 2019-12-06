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
				<input name="email" type="email" placeholder="이메일을 입력하세요." v-model="email" />
			</div>
			<div class="login__inputwrapper">
				<h3>비밀번호</h3>
				<input
					name="password"
					type="password"
					placeholder="비밀번호를 입력하세요."
					@keypress="enterPress"
					v-model="password"
				/>
			</div>
			<p class="login__alert" v-if="errorAlert">
				<i class="mdi mdi-alert-circle"></i>
				{{errorAlert}}
			</p>
			<button class="login__button" @click="login">로그인</button>
			<router-link to="/register" class="login__option">계정 만들기 ></router-link>
			<router-link to="/passwordchange" class="login__option" style="margin-bottom:10%;">비밀번호 재설정 ></router-link>
		</div>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Login",
	data() {
		return {
			email: "",
			password: "",

			errorAlert: ""
		};
	},
	methods: {
		enterPress(e: any) {
			if (e.keyCode == 13) this.login();
		},
		login() {
			this.$store.commit("pushLoading", {
				name: "LOGIN",
				message: "로그인 시도 중"
			});
			this.$store
				.dispatch("LOGIN", {
					email: this.email,
					password: this.password
				})
				.then(token => {
					this.$store
						.dispatch("GET_USER_PROFILE", {
							token,
							pushSubscription: localStorage.getItem(
								"circles.pushSubscription"
							)
						})
						.then(user => {
							localStorage.setItem("circles.loginToken", token);
							this.$store.commit("clearLoading", "LOGIN");
							this.$router.push("/");
						})
						.catch(err => {
							this.$store.commit("clearLoading", "LOGIN");
							this.errorAlert =
								err.response.data.message || "서버 에러";
						});
				})
				.catch(err => {
					this.$store.commit("clearLoading", "LOGIN");
					this.errorAlert = err.response.data.message || "서버 에러";
				});
		}
	}
});
</script>

<style>
.login {
	display: flex;
	justify-content: center;
	color: #273142;
}
.darkmode .login{
    background-color: #282828;
    color: white;
}
.login__wrapper {
	width: 100%;
	max-width: 640px;
	padding: 10px 40px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.login__alert {
	color: #dd4433;
	font-family: NanumSquareL;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login__alert i {
	margin-right: 10px;
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
.darkmode .login__inputwrapper input{
    color: white;
    border: 1px solid #3a3a3a;
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

	border: none;
	border-radius: 100px;
	background: #273142;
	color: white;
	font-size: 30px;
	font-family: "NanumSquareL";
}
.darkmode .login__button{
    background-color: #353535;
}
.login__option {
	font-family: "NanumSquareL";
	color: #737c8c;
	font-size: 24px;
	text-align: center;
	margin: 1.5%;
}
.darkmode .login__option{
    color: white;
}
</style>