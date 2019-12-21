<template>
	<div class="attendanceSheetTable">
		<table>
			<thead>
				<tr>
					<th @click="orderBy('id')"># <i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i></th>
					<th @click="orderBy('name')">성명 <i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i></th>
					<th @click="orderBy('role')">역할 <i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i></th>
					<th @click="datePick(1)">D1</th>
					<th @click="datePick(2)">D2</th>
					<th @click="datePick(3)">D3</th>
					<th @click="datePick(4)">D4</th>
				</tr>
			</thead>
			<tbody>
				<AttendanceSheetItem v-for="member in getOrderedItems" :key="member._id" :data="member" @click="$emit('click', $event)" />
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import AttendanceSheetItem from "./AttendanceSheetItem.vue";
export default Vue.extend({
	components: {
		AttendanceSheetItem
	},
	props: {
		members: Array
	},
	data() {
		return {
			sortKey: "",
			sortBy: false
		};
	},
	methods: {
		orderBy(key: string) {
			if (this.sortKey == key) {
				this.sortBy = !this.sortBy;
			} else {
				this.sortKey = key;
			}
		}
	},
	computed: {
		getOrderedItems(): any {
			if (this.sortKey == "") {
				return this.members;
			} else {
				return this.members.sort((a: any, b: any): any => {
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
	cursor: pointer;
}
.attendanceSheetTable .head i {
	position: absolute;
	right: 10%;

	opacity: 0;
	transition: 0.2s;
}

.attendanceSheetTable .head th:hover i {
	opacity: 0.5;
}
.attendanceSheetTable .head i.order-active {
	display: inline-block;
	opacity: 1 !important;
	transform: rotate(180deg);
}
.attendanceSheetTable .head i.order-rotate {
	transform: rotate(0deg);
}
</style>
