<template>
	<div class="calendar">
		<div class="calendar__header">
			<div class="calendar__title">
				<p>{{ year }}년</p>
				<h2>{{ month + 1 }}월</h2>
			</div>
			<div class="calendar__actions">
				<button class="calendar__button" @click="mMonth">
					<i class="mdi mdi-chevron-left"></i>
				</button>
				<button class="calendar__button" @click="pMonth">
					<i class="mdi mdi-chevron-right"></i>
				</button>
			</div>
		</div>
		<div
			class="calendar__content"
			@mousedown="onClick"
			@mousemove="onClickDrag"
			@mouseup="onClickUp"
			@touchstart="onClick"
			@touchmove="onClickDrag"
			@touchend="onClickUp"
			@contextmenu="$event.preventDefault()"
			ref="calendar"
		>
			<CalendarBoxCreatePopup :start="start" :end="end" v-if="isCreatePopup" @isUpdated="reload"></CalendarBoxCreatePopup>
			<div class="calendar__content__day" v-for="(day, idx) in getDays" :key="idx" ref="calendarItem" @click="isCreatePopup = false">
				<transition-group name="barAnimation">
					<div
						v-for="sc in lineData[idx] ? lineData[idx] : []"
						:key="sc.content._id"
						class="calendar__content__day__bar"
						@click="removeCalendar(sc.content._id)"
						:style="`width: ${sc.width * calendarItemWidth + sc.width * 2}px; bottom: ${sc.height * 30 + 20}px; background-color:${sc.color}`"
					>
						{{ sc.content.content }}
					</div>
					<div
						v-for="(sc, idx) in tmpLineData[idx] ? tmpLineData[idx] : []"
						:key="idx + sc"
						class="calendar__content__day__bar calendar__content__day__bar-create"
						:style="`width: ${sc.width * calendarItemWidth + sc.width * 2}px; bottom: ${sc.height * 30 + 20}px; background-color:${sc.color}`"
					>
						CREATE
					</div>
				</transition-group>
				<span :class="{ 'calendar__content__day-today': day == currentDay && month == currentMonth && year == currentYear }">{{ day == 0 ? "" : day }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import CalendarBoxCreatePopup from "../../components/Community/CalendarBoxCreatePopup.vue";

export default Vue.extend({
	components: {
		CalendarBoxCreatePopup
	},
	data() {
		return {
			year: 0,
			month: 0,
			currentYear: 0,
			currentMonth: 0,
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

			content: "",
			start: new Date() as Date,
			end: new Date() as Date,

			calendars: []
		};
	},
	mounted() {
		let now = new Date();
		this.currentYear = now.getFullYear();
		this.currentMonth = now.getMonth();
		this.currentDay = now.getDate();

		this.startDay = new Date(this.year, this.month, 1); //현재달의 첫째 날
		this.endDay = new Date(this.year, this.month, 0); //현재 달의 마지막 날
		addEventListener("resize", () => {
			this.getSize();
		});
		this.getSize();
		this.reload();
		this.calendarReload(this.currentYear, this.currentMonth);
	},
	methods: {
		pMonth() {
			this.month++;
			if (this.month >= 12) {
				this.year++;
				this.month = 0;
			}
			this.allReload();
		},
		mMonth() {
			this.month--;
			if (this.month < 0) {
				this.year--;
				this.month = 11;
			}
			this.allReload();
		},
		allReload() {
			this.calendarReload(this.year, this.month);
			this.reload();
		},
		calendarReload(year: number, month: number) {
			this.year = year;
			this.month = month;

			this.startDay = new Date(this.year, this.month, 1); //현재달의 첫째 날
			this.endDay = new Date(this.year, this.month + 1, 0); //현재 달의 마지막 날
		},
		reload() {
			this.isCreatePopup = false;
			this.$store.commit("pushLoading", {
				name: "GET_CLUB_CALENDAR",
				message: "캘린더 불러오는 중"
			});
			this.$store.dispatch("GET_CLUB_CALENDAR").then(calendars => {
				this.lineData = [];
				this.tmpLineData = [];
				this.$store.commit("clearLoading", "GET_CLUB_CALENDAR");
				calendars.forEach((calendar: any) => {
					this.calendars = calendars;
					let startDate = new Date(calendar.start);
					if (this.year == startDate.getFullYear() && this.month == startDate.getMonth()) {
						let start = startDate.getDate() + this.startDay.getDay();
						let endDate = new Date(calendar.end);
						let end = endDate.getDate() + this.startDay.getDay();
						this.drawLine((start - 1) % 7, Math.floor((start - 1) / 7), end % 7, Math.floor((end - 1) / 7), false, calendar);
					}
				});
			});
		},
		getSize() {
			let calendar = (this.$refs.calendar as HTMLDivElement).getBoundingClientRect();

			this.calendarLeft = calendar.left;
			this.calendarTop = calendar.top;

			let item = (this.$refs.calendarItem as HTMLDivElement[])[0];

			this.calendarItemWidth = item.clientWidth;
			this.calendarItemHeight = item.clientHeight;
		},
		onClick(e: MouseEvent | TouchEvent) {
			if (!this.isCreatePopup) {
				this.getSize();
				this.startPointX = ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) - this.calendarLeft;
				this.startPointY = ((e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY) - this.calendarTop;
				let position = this.getPosition(this.startPointX, this.startPointY);
				this.isClick = true;
			}
		},
		onClickUp(e: MouseEvent) {
			if (!this.isCreatePopup) {
				this.isClick = false;
				this.isCreatePopup = true;
				let startPosition = this.getPosition(this.startPointX, this.startPointY);
				let endPosition = this.getPosition(this.endPointX, this.endPointY);
				this.start = new Date(this.year, this.month, this.getDays[startPosition[1] * 7 + startPosition[0]]);
				this.end = new Date(this.year, this.month, this.getDays[endPosition[1] * 7 + endPosition[0]]);
			}
		},
		onClickDrag(e: MouseEvent | TouchEvent) {
			if (this.isClick) {
				this.endPointX = ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) - this.calendarLeft;
				this.endPointY = ((e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY) - this.calendarTop;
				let startPosition = this.getPosition(this.startPointX, this.startPointY);
				let endPosition = this.getPosition(this.endPointX, this.endPointY);

				this.tmpLineData = [];
				this.drawLine(startPosition[0], startPosition[1], endPosition[0] + 1, endPosition[1], true);
			}
		},
		getPosition(x: number, y: number) {
			return [Math.floor(x / this.calendarItemWidth), Math.floor(y / this.calendarItemHeight)];
		},
		drawLine(startX: number, startY: number, endX: number, endY: number, tmpMode: boolean = false, content: string = "") {
			let lineHeight = [0, 0, 0, 0, 0];
			for (let i = startY; i <= endY; i++) {
				let startJ = startY == i ? startX : 0;
				for (let j = 0; j < (i == endY ? endX : 7); j++) if (this.lineData[i * 7 + j]) lineHeight[i]++;
			}
			if (tmpMode) {
				for (let i = startY; i <= endY; i++) {
					let startJ = startY == i ? startX : 0;
					if (!this.tmpLineData[i * 7 + startJ]) this.tmpLineData[i * 7 + startJ] = [];
					this.tmpLineData[i * 7 + startJ].push({
						width: i == endY ? endX - startJ : 7 - (startY == i ? startJ : 0),
						height: lineHeight[i],
						color: this.colors[this.colorIndex]
					});
				}
			} else {
				for (let i = startY; i <= endY; i++) {
					let startJ = startY == i ? startX : 0;
					if (!this.lineData[i * 7 + startJ]) this.lineData[i * 7 + startJ] = [];
					this.lineData[i * 7 + startJ].push({
						width: i == endY ? endX - startJ : 7 - (startY == i ? startJ : 0),
						height: lineHeight[i],
						color: this.colors[this.colorIndex],
						content
					});
				}
				this.colorIndex = (this.colorIndex + 1) % 3;
			}
		},
		removeCalendar(id: any) {
			this.$store.commit("pushLoading", {
				name: "CALENDAR_DELETE",
				message: "캘린더 삭제하는 중"
			});
			this.$store
				.dispatch("CALENDAR_DELETE", {
					_id: id
				})
				.then(calendar => {
					this.$store.commit("clearLoading", "CALENDAR_DELETE");
					this.reload();
				})
				.catch(err => console.log(err));
		}
	},
	computed: {
		getDays(): any[] {
			let arr = [...new Array(this.endDay.getDate() + 1).keys()];
			if (this.startDay.getDay() == 0) arr.shift();
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
.calendar__header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 20px;
}
.calendar__title {
	display: flex;
	flex-direction: row;
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
.calendar__actions {
	display: flex;
	flex-direction: row;
}
.calendar__button {
	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	background-color: white;
	color: #538fff;
	width: 52px;
	height: 46px;
	border-radius: 50%;

	font-size: 30px;

	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
	cursor: pointer;
}
.calendar__button:nth-child(1) {
	border-radius: 20px 0 0 20px;
}
.calendar__button:nth-child(2) {
	border-radius: 0 20px 20px 0;
}
.calendar__button:hover {
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.darkTheme .calendar__button {
	background-color: #538fff;
	color: white;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
}
.darkTheme .calendar__button:hover {
	background-color: #538fffe1;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
}
.calendar__content {
	background-color: white;
	flex: 1;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: auto;
	user-select: none;
	touch-action: none;

	position: relative;
}
.darkTheme .calendar__content {
	background-color: #282828;
}
.calendar__content__day {
	position: relative;

	border: solid 1px #e6e5e6;
	text-align: right;

	font-family: NanumSquareR;
	font-size: 24px;

	overflow: visible;
}
.calendar__content__day:nth-child(7n) {
	color: #538fff;
}
.calendar__content__day:nth-child(7n + 1) {
	color: #ff4475;
}
.darkTheme .calendar__content__day {
	border: 1px solid #5f5f5f;
}
.calendar__content__day span {
	width: 1.6em;
	height: 1.6em;
	margin-right: 10px;

	display: inline-flex;

	justify-content: center;
	align-items: center;
}
.calendar__content__day-today {
	background-color: #538fff;
	color: white;
	border-radius: 100px;
	text-align: center;
}
.calendar__content__day__bar {
	position: absolute;

	bottom: 20px;
	left: 0;

	height: 20px;
	background-color: #538fff;

	opacity: 0.8;

	text-align: right;
	color: white;
	font-size: 14px;
	padding-right: 5px;
	z-index: 1;

	cursor: pointer;
}
.calendar__content__day__bar-create {
	background-color: #1ed400;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
	z-index: 0;
}
.calendar__content__create {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.45);

	z-index: 1999;
}
</style>
