<template>
	<div class="editclub">
		<div class="editclub__title">동아리 관리</div>
		<div class="editclub__wrapper">
			<label
				class="editclub__imgbox"
				:class="{'editclub__imgbox-ondrag':isOnDragOver}"
				@drop="onImageDrop"
				@dragover="onImageDropOver"
				@dragleave="isOnDragOver=false"
			>
				<img :src="getClubImage" alt />
				<p>
					<b>
						<input type="file" @change="onImageChange" />
						동아리 이미지 수정
					</b>하기
					<br />또는
					<b>드래그 앤 드롭</b>
				</p>
			</label>
			<div class="editclub__content">
				<div class="inputfield">
					<h4>동아리 이름</h4>
					<input v-model="name" class="inputfield__input" type="text" placeholder="동아리 이름을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>소속 학교</h4>
					<input v-model="school" class="inputfield__input" type="text" placeholder="소속 학교를 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>동아리 소개</h4>
					<input v-model="introduction" class="inputfield__input" type="text" placeholder="동아리 소개를 입력하세요" />
				</div>
				<div class="action">
					<button class="delete">동아리 제거하기</button>
					<button class="save">저장</button>
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
			imageFile: {} as File,
			imageFileBase64: "" as string,
			isOnDragOver: false,

			name: "",
			school: "",
			introduction: ""
		};
	},
	created() {
		this.name = this.getClub.name;
		this.school = this.getClub.school;
		this.introduction = this.getClub.introduction;
	},
	methods: {
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
		}
	},
	watch: {
		imageFile() {
			this.encodeBase64ImageFile(this.imageFile).then(
				(imagebase64: string) => {
					this.imageFileBase64 = imagebase64;
				}
			);
		}
	},
	computed: {
		getClubImage(): string {
			if (this.imageFileBase64) return this.imageFileBase64;
			else if (this.$store.state.club.imgPath)
				return (
					this.$store.state.mainPath + this.$store.state.club.imgPath
				);
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		},
		getClub() {
			return this.$store.state.club;
		}
	}
});
</script>

<style>
.editclub {
	padding: 40px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.editclub__title {
	margin-bottom: 20px;
	font-family: NanumSquareEB;
	font-size: 38px;
	font-weight: 800;
}
.editclub__wrapper {
	padding: 30px 60px;

	display: flex;
	align-items: center;
}
.editclub__imgbox {
	position: relative;

	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 100px 0;

	cursor: pointer;
}
.editclub__imgbox-ondrag {
	opacity: 0.7;
}
.editclub__imgbox-ondrag::after {
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
.editclub__imgbox img {
	width: 200px;
	height: 200px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.15);
	border-radius: 100%;
}
.editclub__imgbox p {
	margin-top: 20px;
	font-size: 24px;
	text-align: center;
}
.editclub__imgbox p b {
	color: #538fff;
}
.editclub__imgbox input[type="file"] {
	display: none;
}
.editclub__content {
	padding: 30px;

	flex: 1;
	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	background-color: white;

	height: fit-content;
}
.editclub__content .inputfield {
	padding: 10px;
	flex-basis: 50%;
}
.editclub__content .inputfield h4 {
	font-family: NanumSquareL;
	font-size: 24px;
	font-weight: none;
	margin-bottom: 10px;
}
.editclub__content .inputfield .inputfield__input {
	border-radius: 8px;
	border: solid 1px #eeeeee;
	padding: 10px 20px;
	font-size: 24px;
	width: 100%;
	position: relative;
}
.editclub__content .action {
	margin-top: 20px;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}
.editclub__content .action .save {
	border: none;

	background-color: #538fff;
	color: white;

	margin: 10px;
	padding: 10px 50px;

	font-size: 20px;

	border-radius: 100px;

	cursor: pointer;
}
.editclub__content .action .delete {
	border: none;
	background: none;
	color: #ff4475;
	height: fit-content;
	padding: 10px;
	cursor: pointer;

	font-size: 16px;
}
@media screen and (max-width: 1279px) {
	.editclub__wrapper {
		flex-direction: column;
	}
	.editclub__content {
		width: 100%;
	}
}
@media screen and (max-width: 768px) {
	.editclub__wrapper {
		padding: 0;
		padding-bottom: 30px;
	}
}
</style>