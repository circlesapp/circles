<template>
	<tr class="attendanceSheetItem">
		<td>{{ data._id }}</td>
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { id: data._id, day: 0 })">
				<button v-if="data.attendances[dates[0].date].state == 0" class="state__0">출석</button>
				<button v-else-if="data.attendances[dates[0].date].state == 1" class="state__1">지각</button>
				<button v-else-if="data.attendances[dates[0].date].state == 2" class="state__2">결석</button>
			</div>
			<textarea v-model="data.attendances[dates[0].date].comment"></textarea>
		</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { id: data._id, day: 1 })">
				<button v-if="data.attendances[dates[1].date].state == 0" class="state__0">출석</button>
				<button v-else-if="data.attendances[dates[1].date].state == 1" class="state__1">지각</button>
				<button v-else-if="data.attendances[dates[1].date].state == 2" class="state__2">결석</button>
			</div>
			<textarea v-model="data.attendances[dates[1].date].comment"></textarea>
		</td>
		<td>
			<div class="attendanceSheetItem__state" @click="$emit('changeState', { id: data._id, day: 2 })">
				<button v-if="data.attendances[dates[2].date].state == 0" class="state__0">출석</button>
				<button v-else-if="data.attendances[dates[2].date].state == 1" class="state__1">지각</button>
				<button v-else-if="data.attendances[dates[2].date].state == 2" class="state__2">결석</button>
			</div>
			<textarea v-model="data.attendances[dates[2].date].comment"></textarea>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		dates: Array,
		data: Object
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
	border-radius: 7px;
	padding: 5px 15px;

	font-size: 15px;
	color: white;

	transition: 0.2s;
	cursor: pointer;
}
.attendanceSheetItem__state .state__0 {
	background: #fe0200;
}
.attendanceSheetItem__state .state__0:hover {
	background: #fe0200d1;
}
.attendanceSheetItem__state .state__1 {
	background: #21a564;
}
.attendanceSheetItem__state .state__1:hover {
	background: #21a564d1;
}
.attendanceSheetItem__state .state__2 {
	background: #fe9a00;
}
.attendanceSheetItem__state .state__2:hover {
	background: #fe9a00d1;
}

.attendanceSheetItem textarea {
	min-width: 200px;
	min-height: 40px;

	border: none;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	transition: 0.2s;
}
.attendanceSheetItem textarea:hover {
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
