<template>
	<tr class="attendanceSheetItem">
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td v-for="day in dates" :key="day.idx">
			<div class="attendanceSheetItem__state">
				<i :class="getState(day.idx)"></i>
				<div
					class="attendanceSheetItem__state__picker"
					:class="{ 'attendanceSheetItem__state__picker-active': idx == stateCurrentIndex }"
				>
					<div @click="changeState(data._id, day.idx, 0)">
						<i class="state0 mdi mdi-circle-outline"></i>
					</div>
					<div @click="changeState(data._id, day.idx, 1)">
						<i class="state1 mdi mdi-triangle-outline"></i>
					</div>
					<div @click="changeState(data._id, day.idx, 2)">
						<i class="state2 mdi mdi-close"></i>
					</div>
					<div @click="changeState(data._id, day.idx, 3)" class="attendanceSheetItem__state__picker__option">
						<i class="state3 mdi mdi-settings-outline"></i>
						<div
							v-if="data.attendances[dates[day.idx].date].state == 3"
							class="attendanceSheetItem__color__picker"
						>
							<input type="text" v-model="data.attendances[dates[day.idx].date].comment" />
							<div class="attendanceSheetItem__state__colors">
								<div v-for="color in colors" :key="color" :style="'background:' + color"></div>
							</div>
						</div>
					</div>
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
		},
		getState(day: string): string {
			let output = "";
			let state = this.data.attendances[this.dates[day].date].state;
			switch (state) {
				case 0:
					output = "state0 mdi mdi-circle-outline";
					break;
				case 1:
					output = "state1 mdi mdi-triangle-outline";
					break;
				case 2:
					output = "state2 mdi mdi-close";
					break;
				case 3:
					output = "state3 mdi mdi-settings-outline";
					break;
			}
			return output;
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
	display: none;
	position: absolute;
	top: 60px;

	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	background-color: white;
	z-index: 100;
}
td:hover .attendanceSheetItem__state__picker,
.attendanceSheetItem__state__picker:hover {
	display: flex;
}
.attendanceSheetItem__state__picker div {
	padding: 5px 15px;
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
	position: absolute;
	left: 35px;
	top: -22.5px;
	border: none;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	transition: 0.2s;
}
.attendanceSheetItem input:hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.attendanceSheetItem__state__colors {
	padding: 0 !important;
	position: absolute;
	left: -4px;
	top: 0;

	background: white;
	border-radius: 20px;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}
.attendanceSheetItem__state__colors div {
	padding: 0;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	margin: 2px;

	cursor: pointer;
}
.attendanceSheetItem__state__colors div:hover {
	opacity: 0.8;
}

.attendanceSheetItem__color__picker {
    display: none;

	position: absolute;
	padding: 0;

	z-index: 100;
}
.attendanceSheetItem__state__picker__option:hover .attendanceSheetItem__color__picker{
    display: block;
}
</style>
