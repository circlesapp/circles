<template>
	<tr class="budgettableitem">
		<td>{{data.item}}</td>
		<td>{{data.size}}</td>
		<td>{{data.price}}</td>
		<td>{{data.quantity}}</td>
		<td>{{data.shipping}}</td>
		<td>{{data.total}}</td>
		<td>{{data.url}}</td>
		<td>{{getDate}}</td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	},
	computed: {
		getDate() {
			return new Date(this.data.date)
				.toISOString()
				.slice(0, 10)
		}
	}
});
</script>

<style>
.budgettableitem td {
	padding: 20px;
	text-align: center;
}
.budgettableitem td{
	font-family: "NanumSquareEB";
}
</style>