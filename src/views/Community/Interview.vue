<template>
	<div class="interview">
		<div class="interview__interviewers">
			<h2 class="intreview__title">지원서</h2>
			<draggable
				:list="applicants"
				class="interview__draggable"
				:group="{ name: 'interviewers', pull: 'clone', put: false }"
			>
				<div class="interview__draggable__item" v-for="applicant in applicants" :key="applicant._id">
					<div class="interview__draggable__item">
						<p>{{applicant.name}}</p>
						<p>{{applicant.number}}</p>
					</div>
				</div>
			</draggable>
		</div>
		<div class="interview__applicant">
			<h2 class="intreview__title">면접자</h2>
			<draggable :list="interviewers" class="interview__draggable" group="interviewers">
				<div
					class="interview__draggable__item"
					v-for="(applicant,idx) in interviewers"
					:key="applicant._id"
				>
					<div class="interview__draggable__item__content">
						<p>{{idx+1}} | {{applicant.name}}</p>
						<p>{{applicant.number}}</p>
					</div>
					<button class="interview__draggable__item__action">면접 종료</button>
				</div>
			</draggable>
		</div>
		<div class="interview__action">
			<button>면접 시작</button>
			<button>면접 종료</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import draggable from "vuedraggable";

export default Vue.use(VueSocketIOExt, io("https://circlesapp.kr/")).extend({
	components: {
		draggable
	},
	sockets: {
		interview_getInterviewByClubName(data) {
			console.log(data);
		}
	},
	data() {
		return {
			applicants: [],
			interviewers: []
		};
	},
	created() {
		this.$socket.client.emit("interview_getInterviewByClubName", {
			clubname: this.getClub.name
		});
		this.$store.commit("pushLoading", {
			name: "GET_CLUB_APPLICANT",
			message: "동아리 지원서 불러오는 중"
		});
		this.$store
			.dispatch("GET_CLUB_APPLICANT")
			.then(applicants => {
				this.$store.commit("clearLoading", "GET_CLUB_APPLICANT");
				this.applicants = applicants.map(x => {
					return {
						name: x.name,
						number: x.number,
						_id: x._id
					};
				});
			})
			.catch(err => {});
	},
	computed: {
		getClub(): any {
			return this.$store.state.club;
		}
	}
});
</script>

<style>
.interview {
	height: 100%;
	padding: 40px;
	display: flex;
}
.intreview__title {
	font-family: NanumSquareL;
	font-size: 24px;
	font-weight: none;
	margin-bottom: 10px;
}
.interview > div {
	height: 100%;
	padding: 30px;

	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
	border-radius: 22px;
	background-color: white;
	margin-right: 40px;
}
.interview > div:last-child {
	margin-right: 0;
}
.interview__interviewers {
	flex: 4;
}
.interview__applicant {
	flex: 4;
}
.interview__action {
	flex: 2;
}
.interview__draggable {
	height: 100%;
}
.interview__draggable .interview__draggable__item {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	margin-bottom: 5px;

	font-family: NanumSquareR;
	font-size: 26px;
	color: #868686;
}
.interview__draggable .interview__draggable__item__content {
	display: flex;
	justify-content: space-between;
}
.interview__draggable .interview__draggable__item__action {
	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	background-color: #538fff;
	color: white;

	padding: 5px 15px;

	font-size: 16px;

	border-radius: 100px;

	cursor: pointer;
}
.interview__action > button {
    width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #538fff;
	color: white;

	padding: 15px 50px;
	border: none;
	border-radius: 100px;
	font-family: "NanumSquareB";

	font-size: 28px;
	cursor: pointer;

    margin-bottom: 20px;
}
</style>