<template>
	<div class="register">
		<form class="register__wrapper" action="javascript:void(0);" @submit="register">
			<header>
				<router-link to="/login" class="register__back"><i class="mdi mdi-chevron-left"></i></router-link>
				<h1 class="register__title" style="flex:1">circles.</h1>
			</header>
			<div v-if="!isEmailAuth" style="flex:1"></div>
			<h2 class="register__text">
				계정 만들기
				<span>Register</span>
			</h2>
			<div class="register__inputwrapper" v-if="isEmailAuth">
				<h3>이용약관</h3>
				<Terms class="register__textarea" />
			</div>
			<div class="register__rowwrapper" style="flex:1">
				<div class="register__inputwrapper">
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
				<button class="register__emailSend" type="button" @click="sendEmail" v-if="!isEmailAuth">확인</button>
			</div>
			<div class="register__inputwrapper" v-if="isEmailAuth">
				<h3>성명</h3>
				<input
					minlength="2"
					maxlength="10"
					autocomplete="username"
					type="text"
					name="name"
					placeholder="성명을 입력하세요."
					v-model="name"
					required
				/>
			</div>
			<div class="register__rowwrapper" v-if="isEmailAuth">
				<div class="register__inputwrapper">
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
				<div class="register__inputwrapper">
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
			</div>
			<div class="register__inputwrapper" v-if="isEmailAuth">
				<h3>프로필 사진</h3>
				<label class="register__inputwrapper__file">
					<input type="file" name="img" accept="image/*" @change="onChangeFile" />
					<div class="circles__createpopup__content__image__button">
						<i class="mdi mdi-image-plus"></i>
					</div>
					<div class="circles__createpopup__content__image__imagenames">
						<span class="imagename">{{ profileImage ? profileImage.name : "사진 없음"}}</span>
					</div>
				</label>
			</div>
			<div class="register__error" v-if="errorAlert">
				<i class="mdi mdi-alert-circle"></i>
				{{errorAlert}}
			</div>
			<button class="register__button" v-if="isEmailAuth">계정 만들기</button>
			<div v-if="!isEmailAuth" style="flex:2"></div>
		</form>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
import Terms from "../components/Terms.vue";
export default Vue.extend({
    name: "Register",
    components: {
        Terms
    },
    data() {
        return {
            email: "" as string,
            password: "",
            checkPassword: "",
            name: "",
            code: "",
            profileImage: null as any,

            errorAlert: ""
        };
    },
    created() {
        this.email = (this.$route.query.email as string) || "";
        this.code = (this.$route.query.token as string) || "";
    },
    methods: {
        sendEmail() {
            this.$store.commit("pushLoading", {
                name: "SEND_REGISTER_EMAIL",
                message: "이메일 보내는 중"
            });
            this.$store
                .dispatch("SEND_REGISTER_EMAIL", { email: this.email })
                .then(data => {
                    this.$store.commit("clearLoading", "SEND_REGISTER_EMAIL");
                    this.$store.commit(
                        "showNotice",
                        `${this.email} 메일함을 확인해주세요.`
                    );
                })
                .catch(err => console.log(err));
        },
        encodeBase64ImageFile(image: File): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                if (!image) return resolve("");
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (event: any) => {
                    resolve(event.target.result);
                };
                reader.onerror = error => {
                    reject(error);
                };
            });
        },
        onChangeFile(e: any) {
            this.profileImage = e.target.files[0];
        },
        register() {
            if (this.isEmailAuth) {
                if (this.password != this.checkPassword) {
                    this.errorAlert = "비밀번호가 일치하지 않습니다.";
                } else {
                    this.$store.commit("pushLoading", {
                        name: "REGISTER",
                        message: "회원가입 하는 중"
                    });
                    this.encodeBase64ImageFile(this.profileImage)
                        .then(img => {
                            this.$store
                                .dispatch("REGISTER", {
                                    email: this.email,
                                    password: this.password,
                                    name: this.name,
                                    code: this.code
                                })
                                .then(token => {
                                    this.$store.commit(
                                        "showNotice",
                                        "회원가입에 성공하였습니다."
                                    );
                                    if (img) {
                                        this.$store
                                            .dispatch("SET_PROFILE_IMAGE", {
                                                img
                                            })
                                            .then(() => {
                                                this.$store.commit(
                                                    "clearLoading",
                                                    "REGISTER"
                                                );
                                                this.$router.replace("/login");
                                            })
                                            .catch(err => {
                                                this.$store.commit(
                                                    "clearLoading",
                                                    "REGISTER"
                                                );
                                                this.errorAlert =
                                                    err.response.data.message;
                                            });
                                    } else {
                                        this.$store.commit(
                                            "clearLoading",
                                            "REGISTER"
                                        );
                                        this.$router.replace("/login");
                                    }
                                })
                                .catch(err => {
                                    this.$store.commit(
                                        "clearLoading",
                                        "REGISTER"
                                    );
                                    this.errorAlert = err.response.data.message;
                                });
                        })
                        .catch(err => {
                            this.$store.commit("clearLoading", "REGISTER");
                            this.errorAlert = err.response.data.message;
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
.register {
    display: flex;
    justify-content: center;
    color: #273142;
}
.darkmode .register {
    background-color: #282828;
    color: white;
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

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.register__back {
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
.register__back:hover {
    background-color: #3a3a3acc;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
}
.register__back:active {
    background-color: #538fff;
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
    margin: 2% 0 10% 0;

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

    border: 1px solid #eeeeee;
    border-radius: 8px;
}
.register__inputwrapper input:disabled {
    cursor: not-allowed;
    background-color: #eeeeee;
}
.darkmode .register__inputwrapper input:disabled {
    background-color: #444;
}
.darkmode .register__inputwrapper input {
    color: white;
    border: 1px solid #3a3a3a;
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
.register__inputwrapper input:focus {
    transition: 0.2s linear;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.register__textarea {
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
}
.darkmode .register__textarea {
    color: white;
    border: 1px solid #3a3a3a;
}

.register__button {
    width: 40%;
    margin: 10% auto;
    padding: 5px;

    border: none;
    border-radius: 100px;
    background: #273142;
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    font-size: 30px;
    font-family: "NanumSquareL";

    transition: 0.2s;
    cursor: pointer;
}
.register__button:hover {
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
}
.darkmode .register__button {
    background-color: #353535;
}

.register__error {
    text-align: center;
    color: #dd4433;

    margin: 10px 0;
}
.register__inputwrapper__file {
    display: flex;
    align-items: center;

    padding: 30px 0;
    padding-left: 10px;
    font-size: 24px;
}
.register__inputwrapper__file input {
    display: none;
}

.register__emailSend {
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
.register__emailSend:hover {
    background-color: #273142;
}
.register__emailSend:active {
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
    .register__rowwrapper {
        flex-direction: column;
    }
    .register__emailSend {
        top: 0;
        width: calc(100% - 20px);
        align-self: center;
    }
}
</style>