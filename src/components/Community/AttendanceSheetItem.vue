<template>
	<tr class="attendanceSheetItem">
		<td>{{ data._id }}</td>
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { day: 1 })">
				<button v-if="data.day1.state == 0" class="state__0">결석</button>
				<button v-else-if="data.day1.state == 1" class="state__1">출석</button>
				<button v-else-if="data.day1.state == 2" class="state__2">지각</button>
			</div>
			<div></div>
			<button>편집</button>
		</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { day: 2 })">
				<button v-if="data.day2.state == 0" class="state__0">결석</button>
				<button v-else-if="data.day2.state == 1" class="state__1">출석</button>
				<button v-else-if="data.day2.state == 2" class="state__2">지각</button>
			</div>
		</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { day: 3 })">
				<button v-if="data.day3.state == 0" class="state__0">결석</button>
				<button v-else-if="data.day3.state == 1" class="state__1">출석</button>
				<button v-else-if="data.day3.state == 2" class="state__2">지각</button>
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	},
	methods: {
		changeState(day: number) {
			this.data.day1.state = 1;
		}
	}
});
</script>

<style>
.attendanceSheetItem td {
	padding: 20px;
	text-align: center;
}
.attendanceSheetItem td {
	font-family: "NanumSquareEB";
}
.attendanceSheetItem__state button {
	border: none;
	cursor: pointer;
}
.attendanceSheetItem__state .state__0 {
	background: red;
}
.attendanceSheetItem__state .state__1 {
	background: green;
}
.attendanceSheetItem__state .state__2 {
	background: yellow;
}
</style>
