<template>
	<div class="attendanceSheetTable">
		<table>
			<thead>
				<tr>
					<th class="sortable" @click="orderBy('name')">성명 <i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i></th>
					<th class="sortable" @click="orderBy('role')">역할 <i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i></th>
					<th>
						<span @click="datePick(0)">{{ dates[0].date }}</span>
						<br /><input type="text" v-model="dates[0].label" placeholder="레이블 입력" />
					</th>
					<th>
						<span @click="datePick(1)">{{ dates[1].date }}</span>
						<br /><input type="text" v-model="dates[1].label" placeholder="레이블 입력" />
					</th>
					<th>
						<span @click="datePick(2)">{{ dates[2].date }}</span>
						<br /><input type="text" v-model="dates[2].label" placeholder="레이블 입력" />
					</th>
				</tr>
			</thead>
			<tbody>
				<AttendanceSheetItem :colors="colors" :dates="dates" v-for="data in getOrderedItems" :key="data._id" :data="data" @changeState="changeState" />
			</tbody>
		</table>
		<AttendanceSheetDatePicker :dates="dates" v-if="showDatePicker" @isUpdated="showDatePicker = false" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import AttendanceSheetItem from "./AttendanceSheetItem.vue";
import AttendanceSheetDatePicker from "./AttendanceSheetDatePicker.vue";
export default Vue.extend({
	components: {
		AttendanceSheetItem,
		AttendanceSheetDatePicker
	},
	props: {
		colors: Object,
		dates: Array,
		datas: Array
	},
	data() {
		return {
			sortKey: "",
			sortBy: false,
			showDatePicker: false
		};
	},
	methods: {
		orderBy(key: string) {
			if (this.sortKey == key) {
				this.sortBy = !this.sortBy;
			} else {
				this.sortKey = key;
			}
		},
		datePick(day: number) {
			this.showDatePicker = true;
		},
		changeState(e: any) {
			this.$emit("changeState", { id: e.id, day: e.day, state: e.state });
		}
	},
	computed: {
		getOrderedItems(): any {
			if (this.sortKey == "") {
				return this.datas;
			} else {
				return this.datas.sort((a: any, b: any): any => {
					if (this.sortBy) return b[this.sortKey] > a[this.sortKey] ? 1 : -1;
					else return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
				});
			}
		}
	}
});
</script>

<style>
.attendanceSheetTable {
	width: 100%;
	min-width: 1400px;

	background-color: white;
	font-family: "NanumSquareEB";
	color: #9cb2cd;
}
.darkmode .attendanceSheetTable {
	background-color: #282828;
}
.attendanceSheetTable th {
	padding: 20px;
	position: relative;
	user-select: none;
}
.attendanceSheetTable .sortable {
	cursor: pointer;
}

.attendanceSheetTable thead i {
	position: absolute;
	right: 10%;

	opacity: 0;
	transition: 0.2s;
}

.attendanceSheetTable thead th:hover i {
	opacity: 0.5;
}
.attendanceSheetTable thead i.order-active {
	display: inline-block;
	opacity: 1 !important;
	transform: rotate(180deg);
}
.attendanceSheetTable thead i.order-rotate {
	transform: rotate(0deg);
}

.attendanceSheetTable th span {
	cursor: pointer;
}
.attendanceSheetTable th input {
	max-width: 180px;
	border: none;
	background: transparent;
	text-align: center;
	font-size: 20px;
	color: #9cb0cd;
}
</style>
