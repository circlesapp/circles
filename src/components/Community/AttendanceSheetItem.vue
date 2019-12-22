<template>
	<tr class="attendanceSheetItem">
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td v-for="day in dates" :key="day.idx">
			<div class="attendanceSheetItem__state" v-if="data.attendances[dates[day.idx].date].state == 0">
				<i class="state0 mdi mdi-circle-outline"></i>
			</div>
			<div class="attendanceSheetItem__state" v-if="data.attendances[dates[day.idx].date].state == 1">
				<i class="state1 mdi mdi-triangle-outline"></i>
			</div>
			<div class="attendanceSheetItem__state" v-if="data.attendances[dates[day.idx].date].state == 2">
				<i class="state2 mdi mdi-close"></i>
			</div>
			<div class="attendanceSheetItem__state" v-if="data.attendances[dates[day.idx].date].state == 3">
				<i class="state3 mdi mdi-settings-outline"></i>
			</div>
			<div class="attendanceSheetItem__state__picker" :class="{ 'attendanceSheetItem__state__picker-active': idx == stateCurrentIndex }">
				<div @click="changeState(data._id, day.idx, 0)"><i class="state0 mdi mdi-circle-outline"></i></div>
				<div @click="changeState(data._id, day.idx, 1)"><i class="state1 mdi mdi-triangle-outline"></i></div>
				<div @click="changeState(data._id, day.idx, 2)"><i class="state2 mdi mdi-close"></i></div>
				<div @click="changeState(data._id, day.idx, 3)"><i class="state3 mdi mdi-settings-outline"></i></div>
			</div>
			<div v-if="data.attendances[dates[day.idx].date].state == 3">
				<input type="text" v-model="data.attendances[dates[day.idx].date].comment" />
				<div class="attendanceSheetItem__state__colors">
					<div v-for="color in colors" :key="color" :style="'background:' + color"></div>
				</div>
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			idx: 0,
			stateCurrentIndex: 0
		};
	},
	props: {
		colors: Object,
		dates: Array,
		data: Object
	},
	methods: {
		changeState(id: string, day: number, state: number) {
			this.$emit("changeState", { id: id, day: day, state: state });
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
	position: relative;
	font-family: "NanumSquareEB";
}
.attendanceSheetItem__state__picker {
	display: flex;
	position: absolute;
	top: 60px;

	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	/* visibility: hidden; */
}
.attendanceSheetItem__state__picker div {
	padding: 5px 15px;

	background: white;
	font-size: 15px;

	transition: 0.2s;
	cursor: pointer;
}
.state0 {
	color: #21a564;
}
.state1 {
	color: #fe9a00;
}
.state2 {
	color: #fe0200;
}
.state3 {
	color: #333;
}

.attendanceSheetItem input {
	border: none;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	transition: 0.2s;
}
.attendanceSheetItem input:hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.attendanceSheetItem__state__colors {
	position: absolute;
	right: 0;

	background: white;
	border-radius: 20px;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}
.attendanceSheetItem__state__colors div {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	margin: 2px;

	cursor: pointer;
}
.attendanceSheetItem__state__colors div:hover {
	opacity: 0.8;
}
</style>
