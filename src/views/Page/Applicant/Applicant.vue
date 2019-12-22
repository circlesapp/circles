<template>
	<div class="applicant__main">
		<div class="applicant__main__item" v-if="isJoinCurrentClub">
			<i class="mdi mdi-check"></i>
			<h2>{{getUserInformation.name}} 님</h2>
			<p>
				이미 가입한
				<br />동아리 입니다.
			</p>
		</div>
		<div class="applicant__main__item applicant__main__item-disable" v-else-if="!getUserToken">
			<i class="mdi mdi-file-document"></i>
			<h2>지원서 작성</h2>
			<p>
				로그인 후
				<br />이용 가능합니다.
			</p>
		</div>
		<router-link
			v-else
			tag="div"
			:to="{name:'page/applicant/application'}"
			class="applicant__main__item"
		>
			<i class="mdi mdi-file-document"></i>
			<h2>지원서 {{getIsModificationText}}</h2>
			<p>
				동아리 지원을 위한
				<br />
				지원서를 {{getIsModificationText}}합니다.
			</p>
			<div class="modification" v-if="isModification">지원서 수정 ></div>
		</router-link>
		<router-link tag="div" :to="{name:'page/applicant/recorder'}" class="applicant__main__item">
			<i class="mdi mdi-voice"></i>
			<h2>페이저 수신기</h2>
			<p>
				대기자 원격 호출을 위한
				<br />페이저 수신기입니다.
			</p>
		</router-link>
		<router-link tag="div" :to="{name:'page/applicant/result'}" class="applicant__main__item">
			<i class="mdi mdi-clipboard-check"></i>
			<h2>결과 확인</h2>
			<p>
				지원 결과를 확인하는
				<br />페이지 입니다.
			</p>
		</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			isModification: false
		};
	},
	created() {
		if (this.getUserToken) {
			this.$store
				.dispatch("GET_MY_APPLICANT")
				.then(applicant => {
					this.isModification = true;
				})
				.catch(err => {});
		}
	},
	watch: {
		getUserToken() {
			if (!this.isJoinCurrentClub)
				this.$store
					.dispatch("GET_MY_APPLICANT")
					.then(applicant => {
						this.isModification = true;
					})
					.catch(err => {});
		}
	},
	computed: {
		isJoinCurrentClub() {
			try {
				return (
					this.$store.state.userInformation.clubs.findIndex(
						(x: any) => x._id == this.$store.state.club._id
					) != -1
				);
			} catch (e) {
				return false;
			}
		},
		getUserToken() {
			return this.$store.state.userToken;
		},
		getIsModificationText(): string {
			return this.isModification ? "수정" : "작성";
		},
		getUserInformation() {
			return this.$store.state.userInformation;
		}
	}
});
</script>

<style>
.applicant__main {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 30px;
}
.applicant__main__item {
	position: relative;
	flex: 1;
	margin: 30px;
	padding: 100px 20px;
	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
	background-color: white;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	transition: 0.5s;
	cursor: pointer;
}
.darkTheme .applicant__main__item {
	background-color: #282828;
}
.applicant__main__item-disable {
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.08);
	background-color: #f6f6f6;
}
.applicant__main__item:hover {
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.1);
}
.applicant__main__item i {
	font-size: 150px;
	color: #538fff;
}
.applicant__main__item h2 {
	font-family: "NanumSquareEB";
	font-size: 40px;
	margin: 40px 0;
}
.applicant__main__item p {
	font-family: "NanumSquareR";
	font-size: 24px;
	color: #868686;
	word-break: keep-all;
	max-width: 500px;
	text-align: center;
}
.modification {
	position: absolute;
	bottom: 40px;
	font-family: "NanumSquareB";
	font-size: 24px;
	text-decoration: underline;
}
@media screen and (max-width: 1279px) {
	.applicant__main__item {
		flex-basis: 100%;
	}
}
</style>