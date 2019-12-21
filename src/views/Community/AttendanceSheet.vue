<template>
	<div class="attendanceSheet">
		<div class="attendanceSheet__editor" v-if="showEditor" ref="edtior">
			<div class="attendanceSheet__editor__item delete" @click="remove()">삭제</div>
		</div>
		<div class="attendanceSheet__head">
			<div class="attendanceSheet__head__wrapper">
				<h2 class="attendanceSheet__title">출석부</h2>
			</div>
		</div>
		<AttendanceSheetTable :members="members" @click="createEditor($event)" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import AttendanceSheetTable from "../../components/Community/AttendanceSheetTable.vue";
export default Vue.extend({
	components: {
		AttendanceSheetTable
	},
	data() {
		return {
			// members: [] as any[]
			members: [
				{ id: 0, name: "박종훈", role: "부장", day1: true, day2: false, day3: true, day4: false },
				{ id: 1, name: "김현우", role: "부원", day1: false, day2: true, day3: true, day4: false }
			],
			showEditor: false,
			currentId: ""
		};
	},
	created() {
		// this.reload();
	},
	methods: {
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
	display: flex;
	align-items: center;
}
.attendanceSheet__title {
	margin-bottom: 30px;
	font-family: "NanumSquareEB";
	font-size: 38px;
	font-weight: 800;
}
.attendanceSheet__price {
	font-size: 20px;
	font-weight: 800;
	color: #9cb2cd;
	margin-left: 20px;
	margin-bottom: 20px;
}

.attendanceSheet__contextmenu {
	position: fixed;

	width: 100px;
	height: auto;

	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	background-color: white;

	z-index: 100;
}
.attendanceSheet__contextmenu__item {
	cursor: pointer;
	padding: 10px;
	color: #273142;

	text-align: center;
}
.attendanceSheet__contextmenu__item.delete {
	color: #e02020;
}
.attendanceSheet__contextmenu__item:hover {
	background-color: #9cb2cd;
	color: white;
}
.attendanceSheet__contextmenu__item.delete:hover {
	background-color: #e02020;
}
</style>
