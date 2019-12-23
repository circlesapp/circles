<template>
	<div class="profile">
		<div class="profile__title">프로필 편집</div>
		<div class="profile__wrapper">
			<label
				class="profile__imgbox"
				:class="{ 'profile__imgbox-ondrag': isOnDragOver }"
				@drop="onImageDrop"
				@dragover="onImageDropOver"
				@dragleave="isOnDragOver = false"
			>
				<img :src="getProfileImage" alt="profile_logo" />
				<p>
					<b>
						<input type="file" @change="onImageChange" />
						프로필 이미지 수정
					</b>하기
					<br />또는
					<b>드래그 앤 드롭</b>으로 이미지 업로드
				</p>
			</label>
			<div class="profile__content">
				<div class="inputfield">
					<h4>이메일</h4>
					<input v-model="email" class="inputfield__input" type="text" placeholder="이메일" disabled />
				</div>
				<div class="inputfield">
					<h4>이름</h4>
					<input v-model="name" class="inputfield__input" type="text" placeholder="이름을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>상태 메세지</h4>
					<input v-model="message" class="inputfield__input" type="text" placeholder="상태 메세지를 입력하세요" />
				</div>
				<div class="action">
					<div>
						<button class="delete">계정 삭제</button>
						<button class="save" @click="changePassword">비밀번호 변경</button>
					</div>
					<button class="save" @click="save">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			isOnDragOver: false,
			imageFileBase64: "" as string,
			imageFile: {} as File,
			email: "",
			name: "",
			message: ""
		};
	},
	created() {
		this.reload();
	},
	methods: {
		reload() {
			this.email = this.getUserInformation.email;
			this.name = this.getUserInformation.name;
			this.message = this.getUserInformation.message;
		},
		onImageChange(e: any) {
			this.imageFile = e.target.files[0];
		},
		onImageDrop(e: DragEvent) {
			e.preventDefault();

			let file = e.dataTransfer!.files[0];
			if (file) {
				this.imageFile = file;
			}
			this.isOnDragOver = false;
		},
		onImageDropOver(e: DragEvent) {
			this.isOnDragOver = true;
			e.preventDefault();
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
		save() {
			this.$store.commit("pushLoading", {
				name: "CHANGE_INFORMATION",
				message: "프로필 수정 중"
			});
			if (this.imageFileBase64) {
				this.$store.commit("pushLoading", {
					name: "SET_PROFILE_IMAGE",
					message: "동아리 사이트 수정 중"
				});
				this.$store
					.dispatch("SET_PROFILE_IMAGE", {
						img: this.imageFileBase64
					})
					.then((data) => {
                        console.log(data)
						this.$store.commit("clearLoading", "SET_PROFILE_IMAGE");
						this.$store
							.dispatch("CHANGE_INFORMATION", {
								name: this.name,
								message: this.message
							})
							.then(data => {
								this.$store.commit(
									"clearLoading",
									"CHANGE_INFORMATION"
								);
								this.$store.commit(
									"showNotice",
									`프로필 수정 성공`
								);
							});
					})
					.catch(err => {});
			} else {
				this.$store
					.dispatch("CHANGE_INFORMATION", {
						name: this.name,
						message: this.message
					})
					.then(data => {
						this.$store.commit(
							"clearLoading",
							"CHANGE_INFORMATION"
						);
						this.$store.commit("showNotice", `프로필 수정 성공`);
					});
			}
		},
		changePassword() {
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
				})
				.catch(err => console.log(err));
		},
		delete() {
			// TODO: 계정삭제
		}
	},
	watch: {
		getToken() {
			this.reload();
		},
		imageFile() {
			this.encodeBase64ImageFile(this.imageFile).then(
				(imagebase64: string) => {
					this.imageFileBase64 = imagebase64;
				}
			);
		}
	},
	computed: {
		getProfileImage(): string {
			if (this.imageFileBase64) return this.imageFileBase64;
			else if (this.getUserInformation.imgPath)
				return (
					this.$store.state.mainPath + this.getUserInformation.imgPath
				);
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getUserInformation(): any {
			return this.$store.state.userInformation;
		},
		getToken() {
			return this.$store.state.userToken;
		}
	}
});
</script>

<style scoped>
.profile {
	padding: 40px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.profile__title {
	margin-bottom: 20px;
	font-family: NanumSquareEB;
	font-size: 38px;
	font-weight: 800;
}
.profile__wrapper {
	padding: 30px 60px;
	height: 100%;

	display: flex;
	align-items: center;
}
.profile__imgbox {
	position: relative;

	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 100px 0;

	cursor: pointer;
}
.profile__imgbox-ondrag {
	opacity: 0.7;
}
.profile__imgbox-ondrag::after {
	position: absolute;
	content: "";
	width: 100%;
	height: 100%;
	border: 5px dashed rgba(83, 143, 255, 0.4);
	background-color: rgba(82, 142, 255, 0.1);

	color: white;
	font-weight: bold;
	font-size: 40px;

	display: flex;
	justify-content: center;
	align-items: center;
}
.profile__imgbox img {
	width: 200px;
	height: 200px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.15);
	border-radius: 100%;
}
.profile__imgbox p {
	margin-top: 20px;
	font-size: 24px;
	text-align: center;
}
.profile__imgbox p b {
	color: #538fff;
}
.profile__imgbox input[type="file"] {
	display: none;
}
.profile__content {
	padding: 30px;

	flex: 1;
	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	background-color: white;

	height: fit-content;
}
.darkTheme .profile__content {
	background-color: #282828;
}
.profile__content .inputfield {
	padding: 10px;
	flex-basis: 50%;
}
.profile__content .inputfield h4 {
	font-family: NanumSquareL;
	font-size: 24px;
	font-weight: none;
	margin-bottom: 10px;
}
.profile__content .inputfield .inputfield__input {
	border-radius: 8px;
	border: solid 1px #eeeeee;
	padding: 10px 20px;
	font-size: 24px;
	width: 100%;
	position: relative;
}
.darkTheme .profile__content .inputfield .inputfield__input {
	color: white;
	background: none;
	border: solid 1px #3a3a3a;
}
.profile__content .action {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}
.profile__content .action button {
	border: none;

	color: white;

	margin: 10px;
	padding: 10px 50px;
	word-break: keep-all;

	font-size: 20px;

	border-radius: 100px;

	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
	cursor: pointer;
}
.profile__content .action button:hover {
	background-color: #538fffe1;
}
.darkTheme .profile__content .action button {
	background-color: #363636;
}
.darkTheme .profile__content .action button:hover {
	background-color: #474747;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
}
.profile__content .action button.save {
	background-color: #538fff;
}
.profile__content .action button.delete {
	background-color: #ff4475;
}
@media screen and (max-width: 1279px) {
	.profile__wrapper {
		flex-direction: column;
	}
	.profile__content {
		width: 100%;
	}
}
@media screen and (max-width: 768px) {
	.profile__wrapper {
		padding: 0;
		padding-bottom: 30px;
	}
}
</style>