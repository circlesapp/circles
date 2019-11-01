<template>
	<div class="calendar">
		<div class="calendar__title">
			<p>{{year}}년</p>
			<h2>{{month+1}}월</h2>
		</div>
		<div class="calendar__content">
			<div class="calendar__content__day" v-for="day in getDays" :key="day">
				<span :class="{'calendar__content__day-today': day == currentDay}">{{day == 0 ? '' : day}}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			year: 0,
			month: 0,
			currentDay: 0,
			startDay: new Date() as Date,
			endDay: new Date() as Date
		};
	},
	created() {
		let now = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		this.currentDay = now.getDate();

		this.startDay = new Date(this.year, this.month, 1); //현재달의 첫째 날
		this.endDay = new Date(this.year, this.month, 0); //현재 달의 마지막 날
	},
	methods: {},
	computed: {
		getDays(): any[] {
			let arr = [...new Array(this.endDay.getDate()).keys()];
			for (let i = 0; i < this.startDay.getDay() - 1; i++) {
				arr.unshift(0);
			}
			return arr;
		}
	}
});
</script>

<style>
.calendar {
	padding: 30px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.calendar__title {
	display: flex;

	margin-bottom: 20px;
}
.calendar__title h2 {
	font-family: NanumSquareEB;
	font-size: 50px;
}
.calendar__title p {
	margin-top: 5px;
	margin-right: 20px;
	font-family: NanumSquareL;
	font-size: 30px;
}
.calendar__content {
	flex: 1;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: auto;
}
.calendar__content__day {
	background-color: white;
	border: solid 1px #e6e5e6;
	text-align: right;

	font-family: NanumSquareR;
	font-size: 24px;
}
.calendar__content__day span {
	display: inline-block;
	padding: 10px;
	margin-right: 10px;
}
.calendar__content__day-today {
	margin-top: 10px;
	padding-top: 0px !important;
	width: 1.5em;
	height: 1.5em;
	color: white;
	background-color: #538fff;
	border-radius: 100%;
    text-align: center;
}
</style>