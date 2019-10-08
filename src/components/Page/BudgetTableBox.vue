<template>
	<table class="budgettablebox">
		<thead>
			<tr class="head">
				<th @click="orderBy('item')">
					품목
					<span :class="{'order-active':sortKey == 'item','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('size')">
					규격
					<span :class="{'order-active':sortKey == 'size','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('price')">
					단가
					<span :class="{'order-active':sortKey == 'price','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('quantity')">
					수량
					<span :class="{'order-active':sortKey == 'quantity','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('shopping')">
					배송료
					<span :class="{'order-active':sortKey == 'shopping','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('total')">
					금액
					<span :class="{'order-active':sortKey == 'total','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('url')">
					URL
					<span :class="{'order-active':sortKey == 'url','order-rotate':sortBy}">▽</span>
				</th>
				<th @click="orderBy('date')">
					마감
					<span :class="{'order-active':sortKey == 'date','order-rotate':sortBy}">▽</span>
				</th>
			</tr>
		</thead>
		<tbody>
			<BudgetTableItem v-for="budget in getOrderedBudgets" :key="budget.number" :data="budget"></BudgetTableItem>
		</tbody>
	</table>
</template>

<script lang="ts">
import Vue from "vue";
import BudgetTableItem from "./BudgetTableItem.vue";
export default Vue.extend({
	components: {
		BudgetTableItem
	},
	props: {
		budgets: Array
	},
	data() {
		return {
			sortKey: "",
			sortBy: false
		};
	},
	methods: {
		orderBy(key: string) {
			if (this.sortKey == key) {
				this.sortBy = !this.sortBy;
			} else {
				this.sortKey = key;
			}
			console.log(this.sortKey, this.sortBy);
		}
	},
	computed: {
		getOrderedBudgets(): any {
			if (this.sortKey == "") {
				console.log(this.budgets);
				return this.budgets;
			} else {
				return this.budgets.sort((a: any, b: any): any => {
					if (this.sortBy)
						return b[this.sortKey] > a[this.sortKey] ? 1 : -1;
					else return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
				});
			}
		}
	}
});
</script>

<style>
.budgettablebox {
	width: 100%;

	background-color: white;
	color: #9cb2cd;
	font-family: "NanumSquareEB";
}
.budgettablebox th {
	padding: 20px;
    position: relative;
}
.budgettablebox .head span {
    position: absolute;
    right: 10%;

	opacity: 0;
	transition: 0.5s;
}

.budgettablebox .head th:hover span {
	opacity: 0.5;
}
.budgettablebox .head span.order-active {
    display: inline-block;
	opacity: 1 !important;
	transform: rotate(180deg);
}
.budgettablebox .head span.order-rotate {
	transform: rotate(0deg);
}
</style>