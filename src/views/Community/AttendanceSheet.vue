<template>
	<div class="attendanceSheet" @click="update">
		<div class="attendanceSheet__editor" v-if="showEditor" ref="edtior">
			<div class="attendanceSheet__editor__item delete" @click="remove()">삭제</div>
		</div>
		<div class="attendanceSheet__head">
			<div class="attendanceSheet__head__wrapper">
				<h2 class="attendanceSheet__title">
					출석부
					<i class="mdi mdi-reload" @click="restart"></i>
				</h2>
				<p class="attendanceSheet__description">접속된 모든 클라이언트에서 실시간으로 동기화됩니다.</p>
			</div>
		</div>
		<AttendanceSheetTable
			@change="update"
			:colors="colors"
			:dates="dates"
			:datas="datas"
			@changeState="changeState"
		/>
	</div>
</template>

<script lang="ts">
/*
	출결 상태 레이블
	0: 출석
	1: 지각
	2: 결석
	3: 사용자화
*/
import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

import AttendanceSheetTable from "../../components/Community/AttendanceSheetTable.vue";

export default Vue.use(VueSocketIOExt, io("https://circlesapp.kr/")).extend({
	sockets: {
		attendance_updateAttendance(this: any, data) {
			this.datas = data.data.datas;
			this.dates = data.data.dates;
		},
		attendance_createAttendance(this: any, data) {
			this.datas = data.data.datas;
			this.dates = data.data.dates;
		},
		attendance_deleteAttendance(this: any, data) {
			this.$socket.client.emit("attendance_createAttendance", {
				clubname: this.getClub.name
			});
		},
		attendance_getAttendanceByClubName(this: any, data) {
			console.log(data);
			if (data.result) {
				this.datas = data.data.datas;
				this.dates = data.data.dates;
			} else {
				this.$socket.client.emit("attendance_createAttendance", {
					clubname: this.getClub.name
				});
			}
		}
	},
	components: {
		AttendanceSheetTable
	},
	data() {
		return {
			colors: {
				red: "#db4437",
				orange: "#fe9900",
				yellow: "#f5bf4f",
				green: "#0f8f50",
				blue: "#4682f4",
				purple: "#6834b7",
				black: "#444"
			},
			datas: [] as any,
			dates: [] as any,
			showEditor: false,
			currentId: ""
		};
	},
	created() {
		this.$socket.client.emit("attendance_getAttendanceByClubName", {
			clubname: this.getClub.name
		});
	},
	watch: {},
	methods: {
		restart() {
			this.datas = [];
			this.dates = [];
			this.$socket.client.emit("attendance_deleteAttendance", {
				clubname: this.getClub.name
			});
		},
		changeState(e: any) {
			let idx = this.datas.findIndex(x => x._id == e.id);
			this.datas[idx].attendance[e.day].state = e.state;
			if (e.state !== 3) this.datas[idx].attendance[e.day].comment = ``;
		},
		update() {
			this.$socket.client.emit("attendance_updateAttendance", {
				clubname: this.getClub.name,
				dates: this.dates,
				datas: this.datas
			});
		},
		createAttendanceSheet() {
			this.dates.push({});
		}
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		}
	}
});
</script>

<style>
.attendanceSheet {
	padding: 30px 60px;
	font-size: 21px;
}
.attendanceSheet__head {
	display: flex;
	justify-content: space-between;
}
.attendanceSheet__head__add {
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 26px;
	border: none;
	border-radius: 50%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	background-color: white;
	color: #538fff;
	width: 46px;
	height: 46px;

	cursor: pointer;
	transition: 0.2s;
}
.attendanceSheet__head__add:hover {
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.darkTheme .attendanceSheet__head__add {
	background-color: #538fff;
	color: white;
}
.darkTheme .attendanceSheet__head__add:hover {
	background-color: #538fffe1;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
}
.attendanceSheet__title {
	font-family: "NanumSquareEB";
	font-size: 38px;
	font-weight: 800;
}
.attendanceSheet__title i {
	position: relative;
	margin-left: 10px;
	color: #538fff;
	cursor: pointer;
}
.attendanceSheet__description {
	font-size: 16px;
	font-weight: 800;
	color: #9cb2cd;
	margin-bottom: 20px;
}

.attendanceSheet__editor {
	position: fixed;

	width: 100px;
	height: auto;

	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	background-color: white;

	z-index: 100;
}
.attendanceSheet__editor__item {
	cursor: pointer;
	padding: 10px;
	color: #273142;

	text-align: center;
}
.attendanceSheet__editor__item.delete {
	color: #e02020;
}
.attendanceSheet__editor__item:hover {
	background-color: #9cb2cd;
	color: white;
}
.attendanceSheet__editor__item.delete:hover {
	background-color: #e02020;
}
</style>
