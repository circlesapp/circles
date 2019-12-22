<template>
	<div class="interview">
		<div class="interview__interviewers">
			<h2 class="intreview__title">지원자</h2>
			<draggable :list="applicants" class="interview__draggable" group="interviewers">
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
			<draggable
				:list="interviewers"
				class="interview__draggable"
				group="interviewers"
				@change="update"
			>
				<div
					class="interview__draggable__item"
					v-for="(applicant,idx) in interviewers"
					:key="applicant._id"
				>
					<div class="interview__draggable__item__content">
						<p>{{idx+1}} | {{applicant.name}}</p>
						<p>{{applicant.number}}</p>
					</div>
					<button class="interview__draggable__item__action" @click="interviewerClose(idx)">완료하기</button>
				</div>
			</draggable>
		</div>
		<div class="interview__action">
			<button class="start" @click="start" v-if="!isStart">면접 시작</button>
			<button class="close" @click="close" v-else>면접 종료</button>
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
		interview_getInterviewByClubName(this: any, data) {
			this.$store.commit(
				"clearLoading",
				"interview_getInterviewByClubName"
			);
			this.isStart = data.result;
			if (data.result) this.interviewers = data.data.interviewers;
		},
		interview_startInterview(this: any, data) {
			this.$store.commit("clearLoading", "interview_startInterview");
			this.isStart = data.result;
		},
		interview_closeInterview(this: any, data) {
			this.$store.commit("clearLoading", "interview_closeInterview");
			this.isStart = !data.result;
		},
		interview_updateInterviewers(this: any, data) {
			this.interviewers = data.data.interviewers;
		}
	},
	data() {
		return {
			applicants: [],
			interviewers: [],
			isStart: false
		};
	},
	created() {
		this.$store.commit("pushLoading", {
			name: "interview_getInterviewByClubName",
			message: "면접 불러오는 중"
		});
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
				let _ids = this.interviewers.map((x: any) => x._id);
				this.$store.commit("clearLoading", "GET_CLUB_APPLICANT");
				this.applicants = applicants
					.map(x => {
						return {
							name: x.name,
							number: x.number,
							_id: x._id
						};
					})
					.filter(x => _ids.indexOf(x._id) == -1);
			})
			.catch(err => {});
	},
	methods: {
		start() {
			this.$store.commit("pushLoading", {
				name: "interview_startInterview",
				message: "면접 시작하는 중"
			});
			this.$socket.client.emit("interview_startInterview", {
				clubname: this.getClub.name,
				interviewers: this.interviewers
			});
		},
		close() {
			this.$store.commit("pushLoading", {
				name: "interview_closeInterview",
				message: "면접 끝내는 중"
			});
			this.$socket.client.emit("interview_closeInterview", {
				clubname: this.getClub.name
			});
		},
		update() {
			if (this.isStart) {
				this.$socket.client.emit("interview_updateInterviewers", {
					clubname: this.getClub.name,
					interviewers: this.interviewers
				});
			}
		},
		interviewerClose(idx: number) {
			this.applicants.push(this.interviewers[idx]);
			this.interviewers.splice(idx, 1);
			this.update();
		}
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
.darkTheme .interview > div {
	background-color: #252525;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.1);
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
	min-width: 300px;
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
	flex: 1;
	margin-right: 10px;
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
}
.interview__action .close {
	background-color: #ff4475;
}

@media screen and (max-width: 1200px) {
	.interview {
		flex-direction: column;
	}
	.interview > div {
		margin-right: 0;
		margin-bottom: 40px;
	}
}
</style>