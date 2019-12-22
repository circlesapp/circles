<template>
	<div class="attendanceSheet">
		<div class="attendanceSheet__editor" v-if="showEditor" ref="edtior">
			<div class="attendanceSheet__editor__item delete" @click="remove()">삭제</div>
		</div>
		<div class="attendanceSheet__head">
			<div class="attendanceSheet__head__wrapper">
				<h2 class="attendanceSheet__title">출석부</h2>
				<p class="attendanceSheet__description">접속된 모든 클라이언트에서 실시간으로 동기화됩니다.</p>
			</div>
		</div>
		<AttendanceSheetTable :dates="dates" :datas="datas" @click="createEditor($event)" @changeState="changeState" />
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
import AttendanceSheetTable from "../../components/Community/AttendanceSheetTable.vue";
export default Vue.extend({
	components: {
		AttendanceSheetTable
	},
	data() {
		return {
			colors: {
				red: "#db4437",
				orange: "#fe9900",
				yellow: "#e6ba3a",
				green: "0f8f50",
				blue: "4682f4",
				purple: "6834b7"
			},
			dates: [
				{ date: "2019-12-01", label: "나눔축제" },
				{ date: "2019-12-02", label: "DDP" },
				{ date: "2019-12-03", label: "SETEC" }
			],
			members: [] as any[],
			datas: [
				{
					_id: "5dcde7e2ea5d132a98c914ba",
					name: "박종훈",
					role: "대표",
					attendances: {
						"2019-12-01": {
							state: 1,
							color: "",
							comment: ``
						},
						"2019-12-02": {
							state: 3,
							color: "purple",
							comment: `인정 결석`
						},
						"2019-12-03": {
							state: 2,
							color: "",
							comment: ``
						}
					}
				},
				{
					_id: "5dcd86c7ea5d132a98c9148b",
					name: "김현우",
					role: "멤버",
					attendances: {
						"2019-12-01": {
							state: 2,
							color: "",
							comment: ``
						},
						"2019-12-02": {
							state: 1,
							color: "",
							comment: ``
						},
						"2019-12-03": {
							state: 0,
							color: "",
							comment: ``
						}
					}
				}
			],
			showEditor: false,
			currentId: ""
		};
	},
	created() {
		this.$store
			.dispatch("GET_CLUB_MEMBERS")
			.then(members => {
				this.members = members;
			})
			.catch(err => {});
	},
	methods: {
		changeState(e: any) {
			let idx = this.datas.findIndex(x => x._id == e.id);
			this.datas[idx].attendances[this.dates[e.day].date].state++;
			if (this.datas[idx].attendances[this.dates[e.day].date].state > 2) {
				this.datas[idx].attendances[this.dates[e.day].date].state = 0;
			}
		},
		createEditor(e: any) {
			console.log(e);
		}
		// reload() {
		// 	this.isShowBudgetCreatePopup = false;
		// 	this.$store.commit("pushPageLoading", {
		// 		name: "GET_CLUB_attendanceSheet",
		// 		message: "동아리 예산 불러오는 중"
		// 	});
		// 	this.$store
		// 		.dispatch("GET_CLUB_attendanceSheet")
		// 		.then(attendanceSheet => {
		// 			this.$store.commit("clearPageLoading", "GET_CLUB_attendanceSheet");
		// 			this.attendanceSheet = attendanceSheet.map((data: any) => {
		// 				data.total = data.price * data.quantity + data.shopping;
		// 				return data;
		// 			});
		// 		})
		// 		.catch(err => {});
		// }
		// createContextMenu(e: any) {
		// 	e.e.preventDefault();
		// 	if (this.isCreateAble) {
		// 		this.showContextMenu = true;
		// 		this.currentId = e.id;
		// 		this.$nextTick(() => {
		// 			let contextmenu: any = this.$refs.contextmenu;
		// 			contextmenu.style.left = e.e.x + "px";
		// 			contextmenu.style.top = e.e.y + "px";
		// 		});
		// 	}
		// },
		// remove() {
		// 	if (this.currentId) {
		// 		this.$store.commit("pushPageLoading", {
		// 			name: "BUDGET_DELETE",
		// 			message: "동아리 예산 삭제 중"
		// 		});
		// 		this.$store
		// 			.dispatch("BUDGET_DELETE", { _id: this.currentId })
		// 			.then(award => {
		// 				this.$store.commit("clearPageLoading", "BUDGET_DELETE");
		// 				this.reload();
		// 			})
		// 			.catch(err => {});
		// 	}
		// }
	},
	computed: {
		// isCreateAble() {
		// 	if (this.$store.state.club.ranks) {
		// 		let user = this.$store.state.club.members.find(
		// 			(member: any) => {
		// 				return (
		// 					member.user == this.$store.state.userInformation._id
		// 				);
		// 			}
		// 		);
		// 		if (user)
		// 			return (
		// 				this.$store.state.club.ranks.find(
		// 					(rank: any) => rank.id == user.rank
		// 				).isAdmin ||
		// 				this.$store.state.club.ranks
		// 					.find((rank: any) => rank.id == user.rank)
		// 					.permission.indexOf(21) != -1
		// 			);
		// 		else return false;
		// 	} else return false;
		// }
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
.darkmode .attendanceSheet__head__add {
	background-color: #538fff;
	color: white;
}
.darkmode .attendanceSheet__head__add:hover {
	background-color: #538fffe1;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
}
.attendanceSheet__head__wrapper {
}
.attendanceSheet__title {
	font-family: "NanumSquareEB";
	font-size: 38px;
	font-weight: 800;
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
