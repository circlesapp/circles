<template>
	<div class="attendanceSheetDatePicker">
		<div class="attendanceSheetDatePicker__content">
			<button class="attendanceSheetDatePicker__content__close" @click="$emit('isUpdated', false)">
				<i class="mdi mdi-close"></i>
			</button>
			<h3>날짜 선택</h3>
			<div class="attendanceSheetDatePicker__content__inputs"></div>
			<table>
				<thead>
					<tr>
						<th>일</th>
						<th>월</th>
						<th>화</th>
						<th>수</th>
						<th>목</th>
						<th>금</th>
						<th>토</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		dates: Array
	},
	mounted() {
		addEventListener("keydown", e => {
			if (e.keyCode == 27) this.$emit("isUpdated", false);
		});
	}
});
</script>

<style>
.attendanceSheetDatePicker {
	position: fixed;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;

	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	background-color: rgba(0, 0, 0, 0.45);

	overflow: auto;

	z-index: 2000;
}

.attendanceSheetDatePicker__content__close {
	position: absolute;
	top: 40px;
	right: 40px;
	width: 42px;
	height: 42px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 30px;

	border: none;
	border-radius: 50%;
	background-color: white;
	color: rgb(46, 46, 46);

	cursor: pointer;
	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
}
.darkTheme .attendanceSheetDatePicker__content__close {
	background-color: #282828;
	color: white;
}
.attendanceSheetDatePicker__content__close:hover {
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	background-color: white;
}
.darkTheme .attendanceSheetDatePicker__content__close:hover {
	box-shadow: none;
	background-color: white;
	color: #282828;
}
.attendanceSheetDatePicker__content {
	background-color: white;
	border-radius: 39px;

	width: 100%;
	max-width: 800px;

	padding: 40px;
	margin: 10px;

	position: relative;
}
.darkTheme .attendanceSheetDatePicker__content {
	background-color: #282828;
}
.attendanceSheetDatePicker__content h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	color: #2e2e2e;
	margin-bottom: 20px;
}
.darkTheme .attendanceSheetDatePicker__content h3 {
	color: white;
}
</style>
