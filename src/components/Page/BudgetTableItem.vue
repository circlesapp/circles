<template>
	<tr class="budgettableitem">
		<td>{{data.item}}</td>
		<td>{{data.size}}</td>
		<td>{{data.price}}</td>
		<td>{{data.quantity}}</td>
		<td>{{data.shipping}}</td>
		<td>{{data.total}}</td>
		<td>{{data.url}}</td>
		<td>{{data.date}}</td>
	</tr>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props:{
        data : Object
    }
});
</script>

<style>
.budgettableitem td {
	padding: 20px;
    text-align: center;
}
</style>