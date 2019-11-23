<template>
	<div class="circles__createpopup">
		<div class="circles__createpopup__content">
			<button class="circles__createpopup__content__clear" @click="$emit('isUpdated', false)">
				<i class="mdi mdi-close"></i>
			</button>
			<h3>동아리 만들기</h3>
			<div class="circles__createpopup__content__inputs">
				<div class="inputfield">
					<h4>동아리명</h4>
					<input ref="startInput" v-model="name" class="inputfield__input" type="text" placeholder="동아리명을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>소속학교</h4>
					<input v-model="school" class="inputfield__input" type="text" placeholder="소속학교를 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>동아리 소개</h4>
					<input
						v-model="introduction"
						class="inputfield__input"
						type="text"
						placeholder="동아리 소개를 입력하세요"
					/>
				</div>
				<div class="inputfield">
					<h4>동아리 로고</h4>
					<span class="circles__createpopup__content__image">
						<label>
							<input type="file" name="img" accept="image/*" @change="onChangeFile" />
							<div class="circles__createpopup__content__image__button">
								<i class="mdi mdi-image-plus"></i>
							</div>
							<div class="circles__createpopup__content__image__imagenames">
								<span class="imagename">{{image.name}}</span>
							</div>
						</label>
					</span>
				</div>
			</div>
			<div class="circles__createpopup__content__error" v-if="errorAlert">
				<i class="mdi mdi-alert-circle"></i>
				{{errorAlert}}
			</div>
			<div class="circles__createpopup__content__actions">
				<button class="create" @click="create">만들기</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			name: "",
			school: "",
			introduction: "",
			image: {} as any,

			errorAlert: ""
		};
	},
	mounted() {
        (this.$refs.startInput as HTMLDivElement).focus();
        addEventListener("keydown",(e)=>{
			if (e.keyCode == 27) this.$emit("isUpdated", false);
        })
	},
	methods: {
		encodeBase64ImageFile(image: File): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				try {
					if (!image) return resolve("");
					let reader = new FileReader();
					reader.readAsDataURL(image);
					reader.onload = (event: any) => {
						resolve(event.target.result);
					};
					reader.onerror = error => {
						reject(error);
					};
				} catch (e) {
					resolve("");
				}
			});
		},
		onChangeFile(e: any) {
			this.image = e.target.files[0];
		},
		create() {
			this.$store.commit("pushLoading", {
				name: "CLUB_CREATE",
				message: "동아리 생성 중"
			});
			this.encodeBase64ImageFile(this.image).then(img => {
				this.$store
					.dispatch("CLUB_CREATE", {
						name: this.name,
						school: this.school,
						introduction: this.introduction,
						img: img ? img : undefined
					})
					.then(club => {
						this.$store.commit("clearLoading", "CLUB_CREATE");
						this.$emit("isUpdated", false);
					})
					.catch(err => {
						this.$store.commit("clearLoading", "CLUB_CREATE");
						this.errorAlert = err.response.data.message;
					});
			});
		}
	},
	computed: {
		getImages() {
			return;
		}
	}
});
</script>

<style>
.circles__createpopup {
	position: fixed;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;

	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	background-color: rgba(0, 0, 0, 0.45);

	overflow: auto;

	z-index: 2000;
}
.circles__createpopup__content__clear {
	position: absolute;
	top: 40px;
	right: 40px;
	width: 42px;
	height: 42px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 30px;

	border: none;
	border-radius: 50%;
	background-color: white;
	color: rgb(46, 46, 46);

	cursor: pointer;
	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
}
.circles__createpopup__content__clear:hover {
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	background-color: white;
}
.circles__createpopup__content {
	background-color: white;
	border-radius: 39px;

	width: 100%;
	max-width: 800px;

	padding: 40px;
	margin: 10px;

	position: relative;
}
.circles__createpopup__content h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	color: #2e2e2e;
	margin-bottom: 20px;
}
.circles__createpopup__content__inputs {
	display: flex;
	flex-wrap: wrap;
}
.circles__createpopup__content .inputfield {
	padding: 10px;
	flex-basis: 50%;
}
.circles__createpopup__content .inputfield h4 {
	font-family: NanumSquareL;
	font-size: 24px;
	font-weight: none;
	margin-bottom: 10px;
}
.circles__createpopup__content .inputfield .inputfield__input {
	border-radius: 8px;
	border: solid 1px #eeeeee;
	padding: 10px 20px;
	font-size: 24px;
	width: 100%;
	position: relative;
}
.inputfield__inputuser {
	display: flex;
	flex-wrap: wrap;
	width: auto;
}

.circles__createpopup__content .inputfield input::placeholder {
	color: #999999;
}

.circles__createpopup__content__image label {
	display: flex;
	align-items: center;
	padding: 4px;
}
.circles__createpopup__content__image__button {
	display: inline-flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;
	width: 50px;
	height: 50px;
	cursor: pointer;
	transition: 0.2s;
}
.circles__createpopup__content__image__button i {
	font-size: 30px;
}
.circles__createpopup__content__image__button:hover {
	background: rgba(0, 0, 0, 0.15);
}
.circles__createpopup__content__image input {
	display: none;
}
.circles__createpopup__content__image .imagename {
	font-size: 24px;
	margin-left: 10px;
	position: relative;
	top: -1px;
}
.circles__createpopup__content__image_imagenames {
	text-overflow: ellipsis;
	max-width: 30vw;
	overflow: hidden;
	white-space: nowrap;
}

.circles__createpopup__content__actions {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 20px;
}
.circles__createpopup__content__actions button {
	border-radius: 31.5px;
	border: none;
	background: none;
	font-size: 24px;
	margin: 10px;

	cursor: pointer;
	transition: 0.2s;
}
.circles__createpopup__content__actions .create {
	padding: 10px 40px;
	background-color: #538fff;
	box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.22);
	color: #eeeeee;
}
.circles__createpopup__content__actions .create:hover {
	background-color: #538fffde;
	box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.27);
}

.inputfield__input__member {
	border-radius: 4px;
	background-color: #eeeeee;
	color: #2e2e2e;
	font-size: 18px;
	padding: 4px 10px;
	padding-right: 0;

	display: flex;
	align-items: center;
	margin-right: 10px;
}
.inputfield__input__member img {
	width: 1.2em;
	height: 1.2em;
	margin-right: 10px;
}
.inputfield__input__member i {
	cursor: pointer;
	font-size: 0.7em;
	padding: 5px;
	padding-right: 10px;
}

.circles__createpopup__content__error {
	text-align: center;
	color: #dd4433;

	margin: 10px 0;
}
</style>