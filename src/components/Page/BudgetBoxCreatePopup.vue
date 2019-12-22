<template>
	<div class="budget__createpopup">
		<div class="budget__createpopup__content">
			<button class="budget__createpopup__content__clear" @click="$emit('isUpdated', false)">
				<i class="mdi mdi-close"></i>
			</button>
			<h3>예산 집행 내역 등록</h3>
			<div class="budget__createpopup__content__inputs">
				<div class="inputfield">
					<h4>품목</h4>
					<input
						ref="startInput"
						v-model="item"
						class="inputfield__input"
						type="text"
						placeholder="품목을 입력하세요"
					/>
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
	mounted() {
		(this.$refs.startInput as HTMLDivElement).focus();
		addEventListener("keydown", e => {
			if (e.keyCode == 27) this.$emit("isUpdated", false);
		});
	},
	methods: {
		create() {
			this.$store.commit("pushLoading", {
				name: "BUDGET",
				message: "동아리 예산 생성 중"
			});
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
					this.$store.commit("clearLoading", "BUDGET");
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
	top: 40px;
	right: 40px;
	width: 42px;
	height: 42px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 30px;

	border: none;
	border-radius: 50%;
	background-color: white;
	color: rgb(46, 46, 46);

	cursor: pointer;
	-webkit-transition: 0.2s;
	-moz-transition: 0.2s;
	-o-transition: 0.2s;
	transition: 0.2s;
}
.darkTheme .budget__createpopup__content__clear {
	background-color: #282828;
	color: white;
}
.budget__createpopup__content__clear:hover {
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	background-color: white;
}
.darkTheme .budget__createpopup__content__clear:hover {
	box-shadow: none;
	background-color: white;
	color: #282828;
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
.darkTheme .budget__createpopup__content {
	background-color: #282828;
}
.budget__createpopup__content h3 {
	font-family: NanumSquareB;
	font-size: 30px;
	color: #2e2e2e;
	margin-bottom: 20px;
}
.darkTheme .budget__createpopup__content h3 {
	color: white;
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
	background: none;
}
.darkTheme .budget__createpopup__content .inputfield .inputfield__input {
	color: white;
	border: solid 1px #3a3a3a;
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
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 20px;
}
.budget__createpopup__content__actions button {
	border-radius: 31.5px;
	border: none;
	background: none;
	font-size: 24px;
	margin: 10px;

	cursor: pointer;
	transition: 0.2s;
}
.budget__createpopup__content__actions .create {
	padding: 10px 40px;
	background-color: #538fff;
	box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.22);
	color: #eeeeee;
}
.darkTheme .budget__createpopup__content__actions .create {
	background-color: #363636;
}
.budget__createpopup__content__actions .create:hover {
	background-color: #538fffde;
	box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.27);
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