<template>
	<table class="budgettablebox">
		<thead>
			<tr class="head">
				<th @click="orderBy('item')">
					품목
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'item', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('size')">
					규격
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'size', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('price')">
					단가
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'price', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('quantity')">
					수량
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'quantity', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('shopping')">
					배송료
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'shopping', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('total')">
					금액
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'total', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('url')">
					URL
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'url', 'order-rotate': sortBy }"></i>
				</th>
				<th @click="orderBy('date')">
					비고
					<i class="mdi mdi-arrow-down" :class="{ 'order-active': sortKey == 'date', 'order-rotate': sortBy }"></i>
				</th>
			</tr>
		</thead>
		<tbody>
			<BudgetTableItem v-for="budget in getOrderedBudgets" :key="budget.number" :data="budget" @contextmenu="$emit('contextmenu', $event)"></BudgetTableItem>
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
		}
	},
	computed: {
		getOrderedBudgets(): any {
			if (this.sortKey == "") {
				return this.budgets;
			} else {
				return this.budgets.sort((a: any, b: any): any => {
					if (this.sortBy) return b[this.sortKey] > a[this.sortKey] ? 1 : -1;
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
	min-width: 1400px;

	background-color: white;
	font-family: "NanumSquareEB";
	color: #9cb2cd;

	transition: 0.5s;
}
.darkTheme .budgettablebox {
	background-color: #282828;
}
.budgettablebox th {
	padding: 20px;
	position: relative;
	user-select: none;
	cursor: pointer;
}
.budgettablebox .head i {
	position: absolute;
	right: 10%;

	opacity: 0;
	transition: 0.2s;
}

.budgettablebox .head th:hover i {
	opacity: 0.5;
}
.budgettablebox .head i.order-active {
	display: inline-block;
	opacity: 1 !important;
	transform: rotate(180deg);
}
.budgettablebox .head i.order-rotate {
	transform: rotate(0deg);
}
</style>
