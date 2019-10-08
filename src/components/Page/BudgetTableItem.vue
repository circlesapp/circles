<template>
	<tr class="budgettableitem">
		<td>{{data.number}}</td>
		<td>품목</td>
		<td>규격</td>
		<td>단가</td>
		<td>수량</td>
		<td>배송료</td>
		<td>금액</td>
		<td>URL</td>
		<td>마감</td>
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