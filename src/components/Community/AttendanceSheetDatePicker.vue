<template>
	<div class="attendanceSheetDatePicker">
		a
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

<style></style>
