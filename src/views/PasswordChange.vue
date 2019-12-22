<template>
	<div class="passwordchange">
		<form class="passwordchange__wrapper" action="javascript:void(0);" @submit="changePassword">
			<header>
				<router-link to="/" class="passwordchange__back">
					<i class="mdi mdi-chevron-left"></i>
				</router-link>
				<h1 class="passwordchange__title" style="flex:1">circles.</h1>
			</header>
			<div style="flex:1"></div>
			<h2 class="passwordchange__text">
				비밀번호 재설정
				<span>Password Reset</span>
			</h2>
			<div class="passwordchange__rowwrapper" v-if="!isEmailAuth">
				<div class="passwordchange__inputwrapper">
					<h3>이메일</h3>
					<input
						minlength="4"
						autocomplete="email"
						type="email"
						name="email"
						placeholder="이메일을 입력하세요."
						v-model="email"
						required
						:disabled="isEmailAuth"
					/>
				</div>
				<button class="passwordchange__emailSend" type="button" @click="sendEmail">확인</button>
			</div>
			<div class="passwordchange__inputwrapper" v-if="isEmailAuth">
				<h3>비밀번호</h3>
				<input
					required
					autocomplete="new-password"
					minlength="4"
					maxlength="24"
					type="password"
					name="password"
					placeholder="비밀번호를 입력하세요."
					v-model="password"
				/>
			</div>
			<div class="passwordchange__inputwrapper" v-if="isEmailAuth">
				<h3>비밀번호 확인</h3>
				<input
					required
					autocomplete="new-password"
					minlength="4"
					maxlength="24"
					type="password"
					name="password"
					placeholder="비밀번호를 다시 입력하세요."
					v-model="checkPassword"
					class="checkPassword"
					:class="{'checkPassword-clear': password && checkPassword == password,'checkPassword-declear': checkPassword && checkPassword != password}"
				/>
			</div>
			<div class="passwordchange__wrapper" v-if="isEmailAuth">
				<p class="passwordchange__content">
					가입시 입력한 이메일로
					<br />비밀번호 재설정이 가능합니다
				</p>
				<button class="passwordchange__button" type="submit">비밀번호 변경</button>
			</div>
			<div v-else style="flex:2"></div>
		</form>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "PasswordChange",
	data() {
		return {
			email: "",
			code: "",
			password: "",
			checkPassword: ""
		};
	},
	created() {
		this.email = (this.$route.query.email as string) || "";
		this.code = (this.$route.query.token as string) || "";
	},
	methods: {
		sendEmail() {
			this.$store.commit("pushLoading", {
				name: "SEND_CHANGEPASSWORD_EMAIL",
				message: "이메일 보내는 중"
			});
			this.$store
				.dispatch("SEND_CHANGEPASSWORD_EMAIL", { email: this.email })
				.then(data => {
					this.$store.commit(
						"clearLoading",
						"SEND_CHANGEPASSWORD_EMAIL"
					);
					this.$store.commit(
						"showNotice",
						`${this.email} 메일함을 확인해주세요.`
					);
					this.$router.push("/");
				})
				.catch(err => console.log(err));
		},
		changePassword() {
			if (this.isEmailAuth) {
				if (this.password != this.checkPassword) {
				} else {
					this.$store
						.dispatch("CHANGE_PASSWORD", {
							email: this.email,
							code: this.code,
							newPassword: this.password
						})
						.then(data => {
							this.$store.commit(
								"showNotice",
								"비밀번호 변경에 성공하였습니다."
							);
							this.$router.replace({ name: "login" });
						});
				}
			}
		}
	},
	computed: {
		isEmailAuth() {
			return this.$route.query.token && this.$route.query.email;
		}
	}
});
</script>

<style>
.passwordchange {
	display: flex;
	justify-content: center;
	color: #273142;
}
.passwordchange__rowwrapper {
	width: 100%;
	display: flex;
}
.passwordchange__rowwrapper > div {
	flex: 1;
}
.darkTheme .passwordchange {
	background-color: #282828;
	color: white;
}
.passwordchange__wrapper {
	width: 100%;
	max-width: 640px;
	padding: 10px 40px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.passwordchange header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.passwordchange__back {
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: NanumSquareB;
	font-size: 26px;
	border: none;
	border-radius: 50%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	background-color: #3a3a3a;
	color: white;
	padding: 4px 10px;

	cursor: pointer;
	transition: 0.2s;
}
.passwordchange__back:hover {
	background-color: #3a3a3acc;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
}
.passwordchange__back:active {
	background-color: #538fff;
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
.darkTheme .passwordchange__inputwrapper input {
	color: white;
	border: 1px solid #3a3a3a;
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
.passwordchange__inputwrapper input:focus {
	transition: 0.2s linear;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
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
.darkTheme .passwordchange__button {
	background-color: #353535;
}
.passwordchange__content {
	font-family: "NanumSquareL";
	font-size: 23px;
	text-align: center;
}

.passwordchange__emailSend {
	position: relative;
	top: 66px;

	border: none;
	border-radius: 5px;
	background: none;
	background-color: #3a3a3a;

	width: 150px;
	height: fit-content;
	padding: 18px 10px;

	font-family: "NanumSquareL";
	font-size: 20px;
	color: white;

	cursor: pointer;
	transition: 0.2s;
}
.passwordchange__emailSend:hover {
	background-color: #273142;
}
.passwordchange__emailSend:active {
	background-color: #538fff;
}

.checkPassword {
	transition: 0.2s;
}
.checkPassword-clear {
	border: 1px solid #538fff !important;
}
.checkPassword-declear {
	border: 1px solid #dd4433 !important;
}

@media screen and (max-width: 768px) {
	.passwordchange__rowwrapper {
		flex-direction: column;
	}
	.passwordchange__emailSend {
		top: 0;
		width: calc(100% - 20px);
		align-self: center;
	}
}
</style>