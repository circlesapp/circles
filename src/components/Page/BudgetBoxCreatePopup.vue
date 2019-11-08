<template>
	<div class="budget__createpopup">
		<div class="budget__createpopup__content">
			<i
				class="budget__createpopup__content__clear mdi mdi-close"
				@click="$emit('isUpdated', false)"
			></i>
			<h3>예산 집행 내역 등록</h3>
			<div class="budget__createpopup__content__inputs">
				<div class="inputfield">
					<h4>품목</h4>
					<input v-model="item" class="inputfield__input" type="text" placeholder="품목을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>규격</h4>
					<input v-model="size" class="inputfield__input" type="text" placeholder="규격을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>단가</h4>
					<input v-model="price" class="inputfield__input" type="number" placeholder="단가를 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>수량</h4>
					<input v-model="quantity" class="inputfield__input" type="number" placeholder="수량을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>배송료</h4>
					<input v-model="shopping" class="inputfield__input" type="number" placeholder="배송료를 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>URL</h4>
					<input v-model="url" class="inputfield__input" type="text" placeholder="URL을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>비고</h4>
					<input v-model="date" class="inputfield__input" type="date" placeholder="비고를 입력하세요" />
				</div>
			</div>
			<div class="budget__createpopup__content__actions">
				<button class="create" @click="create">등록</button>
				<button class="cancel" @click="$emit('isUpdated', false)">취소</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			item: "",
			size: "",
			price: 0,
			quantity: 0,
			shopping: 0,
			url: "",
			date: null
		};
	},
	created() {},
	methods: {
		create() {
			this.$store
				.dispatch("BUDGET", {
					item: this.item,
					size: this.size,
					price: this.price,
					quantity: this.quantity,
					shopping: this.shopping,
					url: this.url,
					date: this.date
				})
				.then(award => {
					this.$emit("isUpdated", false);
				})
				.catch(err => {});
		}
	},
	computed: {}
});
</script>

<style>
.budget__createpopup {
	position: fixed;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;

	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	background-color: rgba(0, 0, 0, 0.45);

	overflow: auto;

	z-index: 2000;
}
.budget__createpopup__content__clear {
	position: absolute;
	right: 40px;
	top: 40px;
	font-size: 32px;

	cursor: pointer;
}
.budget__createpopup__content {
	background-color: white;
	border-radius: 39px;

	width: 100%;
	max-width: 800px;

	padding: 40px;
	margin: 10px;

	position: relative;
}
.budget__createpopup__content h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	color: #2e2e2e;
	margin-bottom: 20px;
}
.budget__createpopup__content__inputs {
	display: flex;
	flex-wrap: wrap;
}
.budget__createpopup__content .inputfield {
	padding: 10px;
	flex-basis: 50%;
}
.budget__createpopup__content .inputfield h4 {
	font-family: NanumSquareL;
	font-size: 24px;
	font-weight: none;
	margin-bottom: 10px;
}
.budget__createpopup__content .inputfield .inputfield__input {
	border-radius: 8px;
	border: solid 1px #eeeeee;
	padding: 10px 20px;
	font-size: 24px;
	width: 100%;
	position: relative;
}
.inputfield__inputuser {
	display: flex;
	flex-wrap: wrap;
	width: auto;
}

.budget__createpopup__content .inputfield input::placeholder {
	color: #999999;
}
.budget__createpopup__content__actions {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
.budget__createpopup__content__actions * {
	flex: 1;
	border-radius: 31.5px;
	border: none;
	background: none;
	font-size: 24px;
	padding: 10px;
	margin: 10px;
	cursor: pointer;
}
.budget__createpopup__content__actions .create {
	background-color: #538fff;
	color: white;
}
.budget__createpopup__content__actions .cancel {
	border: 1px solid #eeeeee;
	color: #9cb2cd;
}

.inputfield__input__member {
	border-radius: 4px;
	background-color: #eeeeee;
	color: #2e2e2e;
	font-size: 18px;
	padding: 4px 10px;
	padding-right: 0;

	display: flex;
	align-items: center;
	margin-right: 10px;
}
.inputfield__input__member img {
	width: 1.2em;
	height: 1.2em;
	margin-right: 10px;
}
.inputfield__input__member i {
	cursor: pointer;
	font-size: 0.7em;
	padding: 5px;
	padding-right: 10px;
}
</style>