<template>
	<div class="budgets">
        <h2 class="budgets__title">예산 공개 게시판</h2>
        <BudgetTableBox></BudgetTableBox>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import BudgetTableBox from "../../components/Page/BudgetTableBox.vue"
export default Vue.extend({
    components:{
        BudgetTableBox
    }
});
</script>

<style>
.budgets{
    padding: 30px 60px;
}
.budgets__title{
  font-family: "NanumSquareEB";
  font-size: 38px;
  font-weight: 800;
}
</style>