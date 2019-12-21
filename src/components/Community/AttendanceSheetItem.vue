<template>
	<tr
		class="attendanceSheetItem"
		@contextmenu="
			$emit('contextmenu', {
				e: $event,
				id: data._id
			})
		"
	>
		<td>{{ data._id }}</td>
		<td>{{ data.name }}</td>
		<td>{{ data.role }}</td>
		<td><input type="checkbox" v-model="data.day1" /></td>
		<td><input type="checkbox" v-model="data.day2" /></td>
		<td><input type="checkbox" v-model="data.day3" /></td>
		<td><input type="checkbox" v-model="data.day4" /></td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
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
</style>
