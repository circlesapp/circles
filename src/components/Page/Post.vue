<template>
	<div class="post" :class="{ 'post-modif': isModifPost, 'post-loading': isLoading }">
		<div class="post__option" v-if="isShowOption">
			<p @click="modifPost" v-if="!isModifPost">
				<i class="mdi mdi-pencil"></i>
				<span>수정</span>
			</p>
			<p class="delete" @click="deletePost">
				<i class="mdi mdi-delete"></i>
				<span>삭제</span>
			</p>
		</div>
		<h3 class="post__title" v-if="!isCreate">
			<img :src="data.owner.imgPath ? getMainPath + data.owner.imgPath : 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg'" alt="user_profile" />
			<p>
				<span class="clubname">{{ data.owner.name }}</span>
				님이
				<span v-if="data.imgPath.length">사진 {{ data.imgPath.length }}장을 업로드했습니다.</span>
				<span v-else>글을 업로드했습니다.</span>
				<br />
				<span class="moment">{{ data.timeString }}</span>
			</p>
			<i class="mdi mdi-dots-horizontal post__menu" @click="toggleOption" v-if="getPermissionModifAndDelete"></i>
		</h3>
		<pre class="post__content" v-if="!isModifPost">{{ data.content }}</pre>
		<textarea class="post__content create" placeholder="글 작성하기" @keypress="pressEnter" v-model="modifContent" v-else />
		<article class="post__image" v-if="!isCreate && (data ? data.imgPath.length : false)">
			<div class="post__image__mainImage">
				<img :src="getMainPath + data.imgPath[0]" alt="content_image" />
			</div>
			<div class="post__image__sublist" v-if="data.imgPath.length > 2">
				<div class="post__image__subImage">
					<img :src="getMainPath + data.imgPath[1]" alt="content_image" />
				</div>
				<div class="post__image__subImage">
					<img :src="getMainPath + data.imgPath[1]" alt="content_image" />
				</div>
			</div>
		</article>
		<div class="post__modifaction" v-if="isModifPost">
			<div class="post__modifaction__wrapper">
				<span class="post__modifaction__image">
					<label>
						<input type="file" name="img" accept="image/*" multiple @change="onImageChange" />
						<div class="post__modifaction__image__button">
							<i class="mdi mdi-image-plus"></i>
						</div>
						<div class="post__modification__image__imagenames">
							<span v-for="(image, idx) in getImages" :key="idx" class="imagename">{{ image.name }}</span>
						</div>
					</label>
				</span>
				<div>
					<span style="color:#e02020; margin-right:20px;" v-if="!isCreate" @click="modifPost">취소</span>
					<span style="color:#538fff;" @click="changeContentSave">{{ isCreate ? "작성" : "확인" }}</span>
				</div>
			</div>
		</div>
		<div class="post__action" v-else-if="!isCreate">
			<p class="post__action__heart" @click="toggleLike">
				<i class="mdi" :class="isLike ? 'mdi-heart' : 'mdi-heart-outline'"></i>
				{{ data.likes.length }}
			</p>
			<p class="post__action__comment" @click="toggleComments">
				<i class="mdi mdi-comment"></i>
				{{ comments.length ? comments.length : data.comments.length }}
			</p>
		</div>
		<div class="post__comments" v-if="!isModifPost && isShowComments">
			<div class="post__comments__editwrapper">
				<input type="text" v-model="comment" @keydown="pressEnterComment" />
				<button @click="createComment">작성</button>
			</div>
			<div class="post__comments__list">
				<div class="post__comments__list__item" v-for="comment in comments" :key="comment._id">
					<h4>
						<img :src="comment.owner.imgPath ? getMainPath + comment.owner.imgPath : 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg'" alt />
						{{ comment.owner.name }}
					</h4>
					<p>{{ comment.message }}</p>
					<div class="post__comments__list__item__remove" v-if="checkOwner(comment.owner)" @click="removeComment(comment._id)">
						<i class="mdi mdi-close"></i>
					</div>
				</div>
			</div>
		</div>
		<TopLoadingBar class="post__loading" v-if="isLoading"></TopLoadingBar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import TopLoadingBar from "../TopLoadingBar.vue";
export default Vue.extend({
	components: {
		TopLoadingBar
	},
	props: {
		data: Object,
		isCreate: Boolean
	},
	data() {
		return {
			isShowOption: false,
			isModifPost: false,
			modifContent: "",
			comment: "",
			comments: [],
			isShowComments: false,
			images: [],
			base64images: [],
			isLoading: false
		};
	},
	created() {
		if (this.isCreate) {
			this.isModifPost = true;
		}
	},
	methods: {
		toggleOption() {
			this.isShowOption = !this.isShowOption;
		},
		toggleComments() {
			this.isShowComments = !this.isShowComments;
			if (this.isShowComments && this.comments) {
				this.commentReload();
			}
		},
		commentReload() {
			this.isLoading = true;
			this.$store
				.dispatch("POST_COMMENT", {
					_id: this.data._id
				})
				.then(data => {
					this.isLoading = false;
					this.comments = data.reverse();
				})
				.catch(err => console.log(err));
		},
		deletePost() {
			if (!this.isLoading) {
				this.isLoading = true;
				this.$store
					.dispatch("POST_DELETE", {
						_id: this.data._id
					})
					.then(data => {
						this.isLoading = false;
						this.$emit("isChange", false);
					})
					.catch(err => console.log(err));
			}
		},
		modifPost() {
			this.modifContent = this.data.content;
			this.isShowOption = false;
			this.isModifPost = !this.isModifPost;
		},
		changeContentSave() {
			if (this.modifContent.trim().length > 0) {
				this.isLoading = true;
				if (this.isCreate) {
					if (this.images) {
						this.encodeBase64ImageFiles(this.images)
							.then(base64images => {
								this.$store
									.dispatch("POST_WRITE", {
										content: this.modifContent,
										img: base64images
									})
									.then(data => {
										this.isLoading = false;
										this.modifContent = "";
										this.$emit("isChange", false);
									})
									.catch(err => console.log(err));
							})
							.catch(err => console.log(err));
					} else {
						this.$store
							.dispatch("POST_WRITE", {
								content: this.modifContent
							})
							.then(data => {
								this.isLoading = false;
								this.modifContent = "";
								this.$emit("isChange", false);
							})
							.catch(err => console.log(err));
					}
				} else {
					this.$store
						.dispatch("POST_MODIFICATION", {
							_id: this.data._id,
							content: this.modifContent
						})
						.then(data => {
							this.isLoading = false;
							this.isShowOption = false;
							this.isModifPost = false;
							this.$emit("isChange", false);
						})
						.catch(err => console.log(err));
				}
			}
		},
		pressEnter(e: any) {
			if (e.keyCode == 10 && e.ctrlKey) {
				this.changeContentSave();
			}
		},
		pressEnterComment(e: any) {
			if (e.keyCode == 13) {
				this.createComment();
			}
		},
		createComment() {
			if (!this.isLoading && this.comment.trim().length > 0) {
				this.isLoading = true;
				this.$store
					.dispatch("POST_COMMENT_WRITE", {
						_id: this.data._id,
						message: this.comment
					})
					.then(() => {
						this.isLoading = false;
						this.comment = "";
						this.commentReload();
					})
					.catch(err => {});
			}
		},
		removeComment(id: string) {
			if (!this.isLoading) {
				this.isLoading = true;
				this.$store
					.dispatch("POST_COMMENT_DELETE", {
						_id: id,
						_postid: this.data._id
					})
					.then(() => {
						this.isLoading = false;
						this.commentReload();
					})
					.catch(err => {});
			}
		},
		toggleLike() {
			if (!this.isLoading) {
				this.isLoading = true;
				this.$store
					.dispatch("POST_TOGGLE_LIKE", {
						_id: this.data._id
					})
					.then(() => {
						this.isLoading = false;

						this.$emit("isChange", false);
					})
					.catch(err => {});
			}
		},
		onImageChange(e: any) {
			this.images = e.target.files;
			this.encodeBase64ImageFiles(this.images);
		},
		encodeBase64ImageFile(image: File): Promise<string> {
			return new Promise<string>((resolve, reject) => {
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
		encodeBase64ImageFiles(images: File[]) {
			let buffer: Promise<string>[] = [];
			[...images].forEach(image => {
				buffer.push(this.encodeBase64ImageFile(image));
			});
			return Promise.all(buffer);
		},
		checkOwner(owner: any): boolean {
			return this.getUserInformation._id == owner._id;
		}
	},
	computed: {
		getImages(): File[] {
			return [...this.images];
		},
		getMainPath(): string {
			return this.$store.state.mainPath;
		},
		getUserInformation(): any {
			return this.$store.state.userInformation;
		},
		getClub(): any {
			return this.$store.state.club;
		},
		isLike(): boolean {
			if (this.getUserInformation) return this.data.likes.indexOf(this.getUserInformation._id) != -1;
			else return false;
		},
		getPermissionModifAndDelete(): boolean {
			if (this.getUserInformation._id == this.data.owner._id) return true;
			else {
				if (this.getClub.ranks) {
					if (this.getClub.owner == this.$store.state.userInformation._id) return true;
					let user = this.getClub.members.find((member: any) => {
						return member.user == this.$store.state.userInformation._id;
					});
					if (user) {
						let permission = this.getClub.ranks.find((rank: any) => rank.id == user.rank).permission;
						return permission.indexOf(3) != -1;
					} else return false;
				} else return false;
			}
		}
	}
});
</script>

<style>
.post {
	width: 100%;
	height: auto;

	padding: 25px;
	margin-top: 30px;

	background-color: white;
	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);

	position: relative;

	overflow: hidden;
}
.darkTheme .post {
	background-color: #282828;
	color: white;
}
.post-modif {
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
.post-loading {
	background-color: #fefefe;
}
.post__loading {
	position: absolute;
	left: 0;
	bottom: 0;
}
@keyframes loading {
	0% {
		left: -200px;
	}
	100% {
		left: 100%;
	}
}
.post__option {
	position: absolute;
	right: 30px;
	top: 60px;
	background-color: white;
	padding: 8px 0;
	border-radius: 10px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);
	font-family: "NanumSquareB";
	font-size: 15px;
	border-radius: 10px;
}
.darkTheme .post__option {
	background-color: #232323;
}
.post__option i {
	font-size: 30px;
}
.post__option p {
	cursor: pointer;
	width: 160px;
	display: flex;
	padding: 0 16px;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	-webkit-transition: 0.3s;
	-moz-transition: 0.3s;
	-o-transition: 0.3s;
	transition: 0.3s;
}
.post__option p:hover {
	background: rgba(0, 0, 0, 0.08);
}
.post__option .delete {
	color: #e02020;
}
.post__title {
	position: relative;

	display: flex;
	align-items: center;

	font-size: 14px;
	font-weight: normal;
}
.post__title .clubname {
	font-weight: 600;
}
.post__title .moment {
	font-size: 10px;
	font-weight: 600;
	color: #919eab;
}
.post__title img {
	width: 40px;
	height: 40px;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	border-radius: 100%;
	margin-right: 2%;
}

.post__menu {
	cursor: pointer;
	position: absolute;
	right: 0;
	color: #919eab;
}

.post__content {
	margin: 25px 0;
	font-size: 14px;
	line-height: 1.43;
	white-space: pre-line;
	width: 100%;
}
.post__content.create {
	margin: 10px 0;
}
textarea.post__content {
	border: none;
	background-color: none;
	border-radius: 8px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	padding: 10px;
	width: 100%;
}
.darkTheme textarea.post__content {
	color: white;
	background-color: #353535;
}
.post__image {
	display: flex;
	height: 400px;
	overflow-x: hidden;
}
.post__image__mainImage {
	flex: 2;
	height: 100%;
	margin-right: 10px;

	background-color: #f8fbff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.darkTheme .post__image__mainImage {
	background-color: #353535;
}
.post__image__sublist {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.post__image__subImage {
	flex: 1;
	width: 100%;

	background-color: #f8fbff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.darkTheme .post__image__subImage {
	background-color: #353535;
}
.post__image__subImage:nth-child(1) {
	margin-bottom: 10px;
}
.post__image img {
	width: 100%;
}
.post__modifaction {
	text-align: right;
}
.post__modifaction__wrapper {
	display: flex;
	justify-content: space-between;
}
.post__modifaction__image label {
	display: flex;
	align-items: center;
}
.post__modifaction__image__button {
	display: inline-flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;
	width: 30px;
	height: 30px;
	cursor: pointer;
	transition: 0.2s;
}
.post__modifaction__image__button i {
	font-size: 20px;
}
.post__modifaction__image__button:hover {
	background: rgba(0, 0, 0, 0.15);
}
.post__modifaction__image input {
	display: none;
}
.post__modifaction__image .imagename {
	font-size: 14px;
	position: relative;
	top: -1px;
}
.post__modification__image__imagenames {
	text-overflow: ellipsis;
	max-width: 30vw;
	overflow: hidden;
	white-space: nowrap;
}
.post__modifaction span {
	cursor: pointer;
}
.post__action {
	display: flex;

	display: flex;

	margin-top: 25px;
}
.post__action p {
	display: flex;
	align-items: center;
	margin-right: 30px;

	font-size: 14px;
	font-weight: 500;

	color: #202841;

	cursor: pointer;
}
.darkTheme .post__action p {
	color: white;
}
.post__action__heart i {
	color: #ff4475;
	font-size: 25px;
	margin-right: 10px;
}
.post__action__comment i {
	color: #538fff;
	font-size: 25px;
	margin-right: 10px;
}

.post__comments__editwrapper {
	display: flex;
	width: 100%;

	font-family: NanumSquareL;
	font-size: 20px;
	margin: 20px 0;
}
.post__comments__editwrapper input {
	background-color: none;
	border: none;
	font-family: NanumSquareL;
	font-size: 14px;
	padding: 5px;
	flex: 7;
	border-bottom: 1px solid #919eab;
}
.darkTheme .post__comments__editwrapper input {
	color: white;
	background-color: #353535;
}
.post__comments__editwrapper button {
	flex: 1;

	border: none;
	color: white;
	border-radius: 100px;
	background-color: #538fff;
	margin-left: 20px;
}

.post__comments__list__item {
	padding: 10px;
	font-size: 14px;
	border-top: 1px solid #eeeeee;
	position: relative;
}
.darkTheme .post__comments__list__item {
	border-top: 1px solid #5f5f5f;
}
.post__comments__list__item:first-child {
	border-top: none;
}
.post__comments__list__item h4 {
	display: flex;
	align-items: center;
	margin-bottom: 10px;

	font-family: "NanumSquareB";
	font-size: 16px;
	font-weight: normal;
	color: #202841;
}
.darkTheme .post__comments__list__item h4 {
	color: white;
}
.post__comments__list__item img {
	width: 1.5em;
	height: 1.5em;

	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	border-radius: 100%;

	margin-right: 10px;
}
.post__comments__list__item p {
	color: #202841;
}
.darkTheme .post__comments__list__item p {
	color: #f8fbff;
}
.post__comments__list__item__remove {
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	right: 20px;
	top: 20px;
	border-radius: 50%;
	width: 25px;
	height: 25px;
	cursor: pointer;
	transition: 0.2s;
}
.post__comments__list__item__remove:hover {
	background: rgba(0, 0, 0, 0.15);
}
.post__comments__list__item__remove i {
	font-size: 16px;
	color: #e02020;
}
</style>
