<template>
	<div class="calendar">
		<div class="calendar__title">
			<p>{{year}}년</p>
			<h2>{{month+1}}월</h2>
		</div>
		<div
			class="calendar__content"
			@mousedown="onClick"
			@mousemove="onClickDrag"
			@mouseup="onClickUp"
			@touchstart="onClick"
			@touchmove="onClickDrag"
			@touchend="onClickUp"
			ref="calendar"
		>
			<div class="calendar__content__create" v-if="isCreatePopup" ref="createPopup">
				<input type="text" v-model="sc" />
				<button @click="createSc">일정 생성</button>
			</div>
			<div class="calendar__content__day" v-for="(day,idx) in getDays" :key="idx" ref="calendarItem" @click="isCreatePopup = false">
				<transition name="barAnimation">
					<div
						v-for="(sc,idx) in (lineData[idx] ? lineData[idx] : [])"
						:key="idx"
						class="calendar__content__day__bar"
						:style="`width: ${sc.width * calendarItemWidth+sc.width*1.5-1}px; bottom: ${sc.height*30+20}px; background-color:${sc.color}`"
					></div>
				</transition>
				<transition name="barAnimation">
					<div
						v-for="(sc,idx) in (tmpLineData[idx] ? tmpLineData[idx] : [])"
						:key="idx"
						class="calendar__content__day__bar calendar__content__day__bar-create"
						:style="`width: ${sc.width * calendarItemWidth+sc.width*1.5-1}px; bottom: ${sc.height*30+20}px; background-color:${sc.color}`"
					></div>
				</transition>
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
			endDay: new Date() as Date,
			startPointX: 0,
			startPointY: 0,
			endPointX: 0,
			endPointY: 0,
			isClick: false,

			calendarLeft: 0,
			calendarTop: 0,
			calendarItemWidth: 0,
			calendarItemHeight: 0,

			selectFilter: [] as boolean[],
			lineData: [] as any[],
			tmpLineData: [] as any[],
			colorIndex: 0,
			colors: ["#ff4475", "#538fff", "#ff9a01"],

			isCreatePopup: false,
			sc: ""
		};
	},
	mounted() {
		let now = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		this.currentDay = now.getDate();

		this.startDay = new Date(this.year, this.month, 1); //현재달의 첫째 날
		this.endDay = new Date(this.year, this.month, 0); //현재 달의 마지막 날
		addEventListener("resize", () => {
			this.getSize();
		});
		this.getSize();

		this.drawLine(5, 0, 3, 1);
		this.drawLine(2, 1, 4, 1);
		this.drawLine(1, 2, 3, 2);
	},
	methods: {
		getSize() {
			let calendar = (this.$refs
				.calendar as HTMLDivElement).getBoundingClientRect();

			this.calendarLeft = calendar.left;
			this.calendarTop = calendar.top;

			let item = (this.$refs.calendarItem as HTMLDivElement[])[0];

			this.calendarItemWidth = item.clientWidth;
			this.calendarItemHeight = item.clientHeight;
		},
		onClick(e: MouseEvent | TouchEvent) {
			this.getSize();
			this.startPointX =
				((e as MouseEvent).clientX ||
					(e as TouchEvent).touches[0].clientX) - this.calendarLeft;
			this.startPointY =
				((e as MouseEvent).clientY ||
					(e as TouchEvent).touches[0].clientY) - this.calendarTop;
			let position = this.getPosition(this.startPointX, this.startPointY);
			this.startPointX = position[0];
			this.startPointY = position[1];
			this.isClick = true;
		},
		onClickUp(e: MouseEvent) {
			this.isClick = false;
			this.isCreatePopup = true;
			this.$nextTick(() => {
				let createPopup = this.$refs.createPopup as HTMLDivElement;
				createPopup.style.left = this.endPointX + "px";
				createPopup.style.top = this.endPointY + "px";
				console.log(this.endPointX);
			});
		},
		onClickDrag(e: MouseEvent | TouchEvent) {
			if (this.isClick) {
				this.endPointX =
					((e as MouseEvent).clientX ||
						(e as TouchEvent).touches[0].clientX) -
					this.calendarLeft;
				this.endPointY =
					((e as MouseEvent).clientY ||
						(e as TouchEvent).touches[0].clientY) -
					this.calendarTop;
				let position = this.getPosition(this.endPointX, this.endPointY);

				this.tmpLineData = [];
				this.drawLine(
					this.startPointX,
					this.startPointY,
					position[0] + 1,
					position[1],
					true
				);
			}
		},
		getPosition(x: number, y: number) {
			return [
				Math.floor(x / this.calendarItemWidth),
				Math.floor(y / this.calendarItemHeight)
			];
		},
		drawLine(
			startX: number,
			startY: number,
			endX: number,
			endY: number,
			tmpMode: boolean = false
		) {
			let lineHeight = [0, 0, 0, 0, 0];
			for (let i = startY; i <= endY; i++) {
				let startJ = startY == i ? startX : 0;
				for (let j = 0; j < (i == endY ? endX : 7); j++)
					if (this.lineData[i * 7 + j]) lineHeight[i]++;
			}
			if (tmpMode) {
				for (let i = startY; i <= endY; i++) {
					let startJ = startY == i ? startX : 0;
					if (!this.tmpLineData[i * 7 + startJ])
						this.tmpLineData[i * 7 + startJ] = [];
					this.tmpLineData[i * 7 + startJ].push({
						width:
							i == endY
								? endX - startJ
								: 7 - (startY == i ? startJ : 0),
						height: lineHeight[i],
						color: this.colors[this.colorIndex]
					});
				}
			} else {
				for (let i = startY; i <= endY; i++) {
					let startJ = startY == i ? startX : 0;
					if (!this.lineData[i * 7 + startJ])
						this.lineData[i * 7 + startJ] = [];
					this.lineData[i * 7 + startJ].push({
						width:
							i == endY
								? endX - startJ
								: 7 - (startY == i ? startJ : 0),
						height: lineHeight[i],
						color: this.colors[this.colorIndex]
					});
				}
				this.colorIndex = (this.colorIndex + 1) % 3;
			}
		},
		createSc() {}
	},
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
.barAnimation-leave-to,
.barAnimation-enter {
	width: 0 !important;
}
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
	user-select: none;
	touch-action: none;

	position: relative;
}
.calendar__content__day {
	position: relative;

	background-color: white;
	border: solid 1px #e6e5e6;
	text-align: right;

	font-family: NanumSquareR;
	font-size: 24px;

	overflow: visible;
}
.calendar__content__day span {
	display: inline-block;
	padding: 10px;
	margin-right: 10px;

	z-index: 50;
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
.calendar__content__day__bar {
	position: absolute;

	bottom: 20px;
	left: 0;

	height: 20px;
	background-color: #538fff;

	opacity: 0.8;

	transition: 0.5s;

	z-index: 10;
}
.calendar__content__day__bar-create {
	background-color: #1ed400;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.calendar__content__create {
	position: absolute;

	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);

	padding: 10px;
	border-radius: 5px;

	background-color: white;

	z-index: 100;

    transition: 0.5s;
}
.calendar__content__create input {
    border: none;
    font-size: 20px;
    padding: 10px;
}
.calendar__content__create button {
	border: none;
	background-color: #538fff;
	color: white;

	font-family: "NanumSquareB";
	font-size: 20px;

    padding: 10px;
    border-radius: 10px;
}
</style>