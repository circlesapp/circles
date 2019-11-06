<template>
	<div class="budgets" @click="showContextMenu = false">
		<div class="budgets__contextmenu" v-if="showContextMenu" ref="contextmenu">
			<div class="budgets__contextmenu__item delete" @click="remove()">삭제</div>
		</div>
		<div class="budgets__head">
			<div class="budgets__head__wrapper">
				<h2 class="budgets__title">예산 공개 게시판</h2>
				<p class="budgets__price">단위:원</p>
			</div>
			<div class="budgets__head__add" @click="isShowBudgetCreatePopup=true" v-if="isCreateAble">+</div>
		</div>
		<BudgetTableBox :budgets="budgets" @contextmenu="createContextMenu($event)"></BudgetTableBox>
		<BudgetBoxCreatePopup v-if="isShowBudgetCreatePopup" @isUpdated="reload" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import BudgetTableBox from "../../components/Page/BudgetTableBox.vue";
import BudgetBoxCreatePopup from "../../components/Page/BudgetBoxCreatePopup.vue";
export default Vue.extend({
	components: {
		BudgetTableBox,
		BudgetBoxCreatePopup
	},
	data() {
		return {
			budgets: [] as any[],
			isShowBudgetCreatePopup: false,
			showContextMenu: false,
			currentId: ""
		};
	},
	created() {
		this.reload();
	},
	methods: {
		reload() {
			this.isShowBudgetCreatePopup = false;
			this.$store
				.dispatch("GET_CLUB_BUDGETS")
				.then(budgets => {
					this.budgets = budgets.map((data: any) => {
						data.total = data.price * data.quantity + data.shopping;
						console.log(data);
						return data;
					});
				})
				.catch(err => {});
		},
		createContextMenu(e: any) {
			e.e.preventDefault();
			if (this.isCreateAble) {
				this.showContextMenu = true;
				this.currentId = e.id;
				this.$nextTick(() => {
					let contextmenu: any = this.$refs.contextmenu;
					contextmenu.style.left = e.e.x + "px";
					contextmenu.style.top = e.e.y + "px";
				});
			}
		},
		remove() {
			if (this.currentId)
				this.$store
					.dispatch("BUDGET_DELETE", { _id: this.currentId })
					.then(award => {
						this.reload();
					})
					.catch(err => {});
		}
	},
	computed: {
		isCreateAble() {
			if (this.$store.state.club.ranks) {
				let user = this.$store.state.club.members.find(
					(member: any) => {
						return (
							member.user == this.$store.state.userInformation._id
						);
					}
				);
				if (user)
					return (
						this.$store.state.club.ranks.find(
							(rank: any) => rank.id == user.rank
						).isAdmin ||
						this.$store.state.club.ranks
							.find((rank: any) => rank.id == user.rank)
							.permission.indexOf(21) != -1
					);
				else return false;
			} else return false;
		}
	}
});
</script>

<style>
.budgets {
	padding: 30px 60px;
	font-size: 21px;
}
.budgets__head {
	display: flex;
	justify-content: space-between;
}
.budgets__head__add {
	font-size: 40px;
	color: #538fff;
	cursor: pointer;
}
.budgets__head__wrapper {
	display: flex;
	align-items: center;
}
.budgets__title {
	margin-bottom: 30px;
	font-family: "NanumSquareEB";
	font-size: 38px;
	font-weight: 800;
}
.budgets__price {
	font-size: 20px;
	font-weight: 800;
	color: #9cb2cd;
	margin-left: 20px;
	margin-bottom: 20px;
}

.budgets__contextmenu {
	position: fixed;

	width: 100px;
	height: auto;

	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	background-color: white;

	z-index: 100;
}
.budgets__contextmenu__item {
	cursor: pointer;
	padding: 10px;
	color: #273142;

	text-align: center;
}
.budgets__contextmenu__item.delete {
	color: #e02020;
}
.budgets__contextmenu__item:hover {
	background-color: #9cb2cd;
	color: white;
}
.budgets__contextmenu__item.delete:hover {
	background-color: #e02020;
}
</style>