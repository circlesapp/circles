<template>
	<div class="budgets">
		<h2 class="budgets__title">예산 공개 게시판</h2>
		<BudgetTableBox :budgets="budgets"></BudgetTableBox>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import BudgetTableBox from "../../components/Page/BudgetTableBox.vue";
export default Vue.extend({
	components: {
		BudgetTableBox
	},
	data() {
		return {
			budgets: [] as any[]
		};
	},
	mounted() {
		this.$store
			.dispatch("GET_CLUB_BUDGETS")
			.then(budgets => {
				this.budgets = budgets.map((data:any)=>{
                    data.total = data.price * data.quantity + data.shipping
                    return data
                });
			})
			.catch(err => {});
	}
});
</script>

<style>
.budgets {
	padding: 30px 60px;
    font-size: 21px;
}
.budgets__title {
    margin-bottom: 30px;
	font-family: "NanumSquareEB";
	font-size: 38px;
	font-weight: 800;
}
</style>