<template>
	<tr class="attendanceSheetItem">
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td v-for="day in dates" :key="day.idx">
			<div class="attendanceSheetItem__state">
				<i :class="getState(day.idx)"></i>
				<input
					type="text"
					v-model="data.attendances[dates[day.idx].date].comment"
					:style="'background:' + data.attendances[dates[day.idx].date].color"
					placeholder="레이블 입력"
					v-if="data.attendances[dates[day.idx].date].state === 3"
				/>
				<div class="attendanceSheetItem__state__picker">
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
						<div v-if="data.attendances[dates[day.idx].date].state == 3" class="attendanceSheetItem__color__picker">
							<div class="attendanceSheetItem__state__colors">
								<div v-for="color in colors" :key="color" :style="'background:' + color" @click="data.attendances[dates[day.idx].date].color = color">
									<i class="mdi mdi-check" v-if="color === data.attendances[dates[day.idx].date].color"></i>
								</div>
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
			}
			return output;
		}
	}
});
</script>

<style>
.attendanceSheetItem td {
	padding: 20px;
	position: relative;

	font-family: "NanumSquareEB";
	text-align: center;
}
.attendanceSheetItem__state__picker {
	display: none;
	position: absolute;
	top: 50px;
	left: 18px;

	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	background-color: white;
	z-index: 100;
}
.darkmode .attendanceSheetItem__state__picker {
	background-color: #444;
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
.darkmode .state3 {
	color: white;
}

.attendanceSheetItem input {
	padding: 5px 0;

	font-family: "NanumSquareL";
	font-size: 16px;
	text-align: center;
	color: white;

	border: none;
	border-radius: 15px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

	transition: 0.2s;
}
.attendanceSheetItem input:hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.darkmode .attendanceSheetItem input {
	background: #444;
	color: white;
}

.attendanceSheetItem__state__colors {
	padding: 0 !important;
	position: relative;
	left: -160px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: white;
	border-radius: 20px;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}
.darkmode .attendanceSheetItem__state__colors {
	background: #555;
}
.attendanceSheetItem__state__colors div {
	padding: 0;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	margin: 2px;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
}
.attendanceSheetItem__state__colors div:hover {
	opacity: 0.8;
}
.attendanceSheetItem__state__colors div i {
	color: white;
}

.attendanceSheetItem__color__picker {
	display: none;

	position: absolute;

	z-index: 100;
}
.attendanceSheetItem__state__picker__option:hover .attendanceSheetItem__color__picker {
	display: block;
}
</style>
