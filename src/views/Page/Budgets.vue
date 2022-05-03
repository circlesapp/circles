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
      <button class="budgets__head__add" v-if="isCreateAble" @click="isShowBudgetCreatePopup = true">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
    <BudgetTableBox :budgets="budgets" @contextmenu="createContextMenu($event)"></BudgetTableBox>
    <BudgetBoxCreatePopup v-if="isShowBudgetCreatePopup" @isUpdated="reload" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BudgetTableBox from '../../components/Page/BudgetTableBox.vue';
import BudgetBoxCreatePopup from '../../components/Page/BudgetBoxCreatePopup.vue';

@Options({
  components: {
    BudgetTableBox,
    BudgetBoxCreatePopup,
  },
})
export default class Members extends Vue {
  budgets: any[] = [];
  isShowBudgetCreatePopup: boolean = false;
  showContextMenu: boolean = false;
  currentId: string = '';

  created() {
    this.reload();
  }

  reload() {
    this.isShowBudgetCreatePopup = false;
    this.$store.commit('pushPageLoading', {
      name: 'GET_CLUB_BUDGETS',
      message: '동아리 예산 불러오는 중',
    });
    this.$store
      .dispatch('GET_CLUB_BUDGETS')
      .then((budgets) => {
        this.$store.commit('clearPageLoading', 'GET_CLUB_BUDGETS');

        this.budgets = budgets.map((data: any) => {
          data.total = data.price * data.quantity + data.shopping;
          return data;
        });
      })
      .catch((err) => {});
  }
  createContextMenu(e: any) {
    e.e.preventDefault();
    if (this.isCreateAble) {
      this.showContextMenu = true;
      this.currentId = e.id;
      this.$nextTick(() => {
        let contextmenu: any = this.$refs.contextmenu;
        contextmenu.style.left = e.e.x + 'px';
        contextmenu.style.top = e.e.y + 'px';
      });
    }
  }
  remove() {
    if (this.currentId) {
      this.$store.commit('pushPageLoading', {
        name: 'BUDGET_DELETE',
        message: '동아리 예산 삭제 중',
      });
      this.$store
        .dispatch('BUDGET_DELETE', { _id: this.currentId })
        .then((award) => {
          this.$store.commit('clearPageLoading', 'BUDGET_DELETE');
          this.reload();
        })
        .catch((err) => {});
    }
  }

  get isCreateAble() {
    if (this.$store.state.club.ranks) {
      let user = this.$store.state.club.members.find((member: any) => {
        return member.user == this.$store.state.userInformation._id;
      });
      if (user) return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin || this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).permission.indexOf(21) != -1;
      else return false;
    } else return false;
  }
}
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
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 26px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: white;
  color: #538fff;
  width: 46px;
  height: 46px;

  cursor: pointer;
  transition: 0.2s;
}
.budgets__head__add:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.darkTheme .budgets__head__add {
  background-color: #538fff;
  color: white;
}
.darkTheme .budgets__head__add:hover {
  background-color: #538fffe1;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
}
.budgets__head__wrapper {
  display: flex;
  align-items: center;
}
.budgets__title {
  margin-bottom: 30px;
  font-family: 'NanumSquareEB';
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
