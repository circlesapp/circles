<template>
	<div class="post" :class="{'post-modif':isModifPost}">
		<div class="post__option" v-if="isShowOption">
			<p @click="modifPost" v-if="!isModifPost">
				<i class="material-icons">create</i>
				<span>수정</span>
			</p>
			<p class="delete" @click="deletePost">
				<i class="material-icons">delete</i>
				<span>삭제</span>
			</p>
		</div>
		<h3 class="post__title" v-if="!isCreate">
			<img
				:src="data.owner.imgPath ? getMainPath+data.owner.imgPath : 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg'"
			/>
			<p>
				<span class="clubname">{{data.owner.name}}</span>
				님이
				<span v-if="data.imgPath.length">사진 {{data.imgPath.length}}장을 업로드했습니다.</span>
				<span>글을 업로드했습니다.</span>
				<br />
				<span class="moment">{{data.timeString}}</span>
			</p>
			<i
				class="material-icons post__menu"
				@click="toggleOption"
				v-if="getPermissionModifAndDelete"
			>more_horiz</i>
		</h3>
		<h3 v-else class="post__title create">글 작성하기</h3>
		<pre class="post__content" v-if="!isModifPost">{{data.content}}</pre>
		<textarea class="post__content" @keypress="pressEnter" v-model="modifContent" v-else />
		<article class="post__image" v-if="!isCreate&&(data ? data.imgPath.length : false)">
			<div class="post__image__mainImage">
				<img :src="getMainPath+data.imgPath[0]" alt />
			</div>
			<div class="post__image__sublist" v-if="data.imgPath.length > 2">
				<div class="post__image__subImage">
					<img :src="getMainPath+data.imgPath[1]" alt />
				</div>
				<div class="post__image__subImage">
					<img :src="getMainPath+data.imgPath[1]" alt />
				</div>
			</div>
		</article>
		<div class="post__modifaction" v-if="isModifPost">
			<div>
				<span style="color:#e02020;" @click="modifPost">취소</span>
				<span style="color:#538fff;" @click="changeContentSave">{{ isCreate ? '작성' :'확인'}}</span>
			</div>
		</div>
		<div class="post__action" v-else-if="!isCreate">
			<p class="post__action__heart" @click="toggleLike">
				<i class="material-icons">{{isLike ?'favorite' : 'favorite_border'}}</i>
				{{data.likes.length}}
			</p>
			<p class="post__action__comment">
				<i class="material-icons">insert_comment</i>
				{{data.comments.length}}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object,
		isCreate: Boolean
	},
	data() {
		return {
			isShowOption: false,
			isModifPost: false,
			modifContent: ""
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
		deletePost() {
			this.$store
				.dispatch("POST_DELETE", {
					_id: this.data._id
				})
				.then(data => {
					this.$emit("isChange", false);
				})
				.catch(err => console.log(err));
		},
		modifPost() {
			this.modifContent = this.data.content;
			this.isShowOption = false;
			this.isModifPost = !this.isModifPost;
		},
		changeContentSave() {
			if (this.isCreate) {
				this.$store
					.dispatch("POST_WRITE", {
						content: this.modifContent
					})
					.then(data => {
						this.modifContent = "";
						this.$emit("isChange", false);
					})
					.catch(err => console.log(err));
			} else {
				this.$store
					.dispatch("POST_MODIFICATION", {
						_id: this.data._id,
						content: this.modifContent
					})
					.then(data => {
						this.isShowOption = false;
						this.isModifPost = false;
						this.$emit("isChange", false);
					})
					.catch(err => console.log(err));
			}
		},
		pressEnter(e: any) {
			if (e.keyCode == 10 && e.ctrlKey) {
				this.changeContentSave();
			}
		},
		toggleLike() {
			this.$store
				.dispatch("POST_TOGGLE_LIKE", {
					_id: this.data._id
				})
				.then(() => {
					this.$emit("isChange", false);
				})
				.catch(err => {});
		}
	},
	computed: {
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
			if (this.getUserInformation)
				return (
					this.data.likes.indexOf(this.getUserInformation._id) != -1
				);
			else return false;
		},
		getPermissionModifAndDelete(): boolean {
			if (this.getUserInformation._id == this.data.owner._id) return true;
			else {
				if (this.getClub.ranks) {
					if (
						this.getClub.owner ==
						this.$store.state.userInformation._id
					)
						return true;
					let user = this.getClub.members.find((member: any) => {
						return (
							member.user == this.$store.state.userInformation._id
						);
					});
					if (user) {
						let permission = this.getClub.ranks.find(
							(rank: any) => rank.id == user.rank
						).permission;
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
}
.post-modif {
	border: 1px solid #538fff;
}
.post__option {
	position: absolute;
	right: 30px;
	top: 60px;
	background-color: white;
	border-radius: 4px;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.06);
	font-family: "NanumSquareB";
	font-size: 15px;
}
.post__option i {
	font-size: 30px;
}
.post__option p {
	cursor: pointer;
	width: 160px;
	margin: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
.post__title.create {
	color: #538fff;
	margin-left: 5px;
	font-size: 20px;
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
}
textarea.post__content {
	border: none;
	background-color: none;
	border-radius: 8px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	padding: 10px;
	width: 100%;
}
.post__image {
	display: flex;
	height: 400px;
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
.post__image__subImage:nth-child(1) {
	margin-bottom: 10px;
}
.post__image img {
	height: 100%;
}
.post__modifaction {
	text-align: right;
}
.post__modifaction span {
	margin-left: 20px;
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
</style>