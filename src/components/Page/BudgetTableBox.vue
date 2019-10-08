<template>
	<table class="budgettablebox">
		<thead>
			<tr class="head">
				<th @click="orderBy('number')">번호</th>
				<th>품목</th>
				<th>규격</th>
				<th>단가</th>
				<th>수량</th>
				<th>배송료</th>
				<th>금액</th>
				<th>URL</th>
				<th>마감</th>
			</tr>
		</thead>
		<transition-group name="move-animation" tag="tbody">
			<BudgetTableItem v-for="budget in getOrderedBudgets" :key="budget.number" :data="budget"></BudgetTableItem>
		</transition-group>
	</table>
</template>

<script lang="ts">
import Vue from "vue";
import BudgetTableItem from "./BudgetTableItem.vue";
export default Vue.extend({
	components: {
		BudgetTableItem
	},
	data() {
		return {
			budgets: [
				{
					number: 2
				},
				{
					number: 1
				},
				{
					number: 3
				}
			],
			sortKey: "",
			sortBy: false
		};
	},
	methods: {
		orderBy(key: string) {
			if (this.sortKey == key) {
				if (this.sortBy != true) {
					this.sortBy = true;
				} else {
					this.sortKey = "";
					this.sortBy = false;
				}
			} else {
				this.sortKey = key;
			}
		}
	},
	computed: {
		getOrderedBudgets(): any {
			if (this.sortKey) {
				return this.budgets.sort((a: any, b: any): any => {
					if (this.sortBy) return b[this.sortKey] - a[this.sortKey];
					else return a[this.sortKey] - b[this.sortKey];
				});
			} else {
				return this.budgets;
			}
		}
	}
});
</script>

<style>
.move-animation-move {
	transition: 1s;
}

.budgettablebox {
	width: 100%;

	background-color: white;
	color: #9cb2cd;
	font-family: "NanumSquareEB";
}
.budgettablebox th {
	padding: 20px;
}
</style>