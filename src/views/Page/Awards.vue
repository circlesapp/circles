<template>
  <div class="award" @click="showContextMenu = false">
    <div class="award__contextmenu" v-if="showContextMenu" ref="contextmenu">
      <div class="award__contextmenu__item delete" @click="remove()">삭제</div>
    </div>
    <h2 class="award__club">
      <img class="award__clubimage" :src="getClubImage" alt="club_logo" />
      <div>
        <h3>{{ getClub.name }}</h3>
        <p>{{ getClub.school || '-' }}</p>
      </div>
    </h2>
    <div class="award__list">
      <AwardBox class="award__list__item" v-for="award in awards" :data="award" :key="award._id" @contextmenu="createContextMenu($event, award._id)"></AwardBox>
      <div class="award__list__item award__list__item__create" v-if="isCreateAble" @click="appendAwards">+</div>
    </div>
    <AwardBoxCreatePopup @isUpdated="reload" v-if="isShowAwardCreatePopup"></AwardBoxCreatePopup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AwardBox from '../../components/Page/AwardBox.vue';
import AwardBoxCreatePopup from '../../components/Page/AwardBoxCreatePopup.vue';

@Options({
  components: {
    AwardBox,
    AwardBoxCreatePopup,
  },
})
export default class Awards extends Vue {
  awards: any[] = [];
  showContextMenu: boolean = false;
  isShowAwardCreatePopup: boolean = false;
  currentId: string = '';

  members: any[] = [];

  created() {
    this.reload();
  }

  reload() {
    this.isShowAwardCreatePopup = false;
    this.$store.commit('pushPageLoading', {
      name: 'GET_CLUB_AWARDS',
      message: '동아리 수상 불러오는 중',
    });
    this.$store
      .dispatch('GET_CLUB_AWARDS')
      .then((awards) => {
        this.$store.commit('clearPageLoading', 'GET_CLUB_AWARDS');
        this.awards = awards;
      })
      .catch((err) => {});
  }
  appendAwards() {
    this.isShowAwardCreatePopup = true;
  }
  createContextMenu(e: MouseEvent, _id: string) {
    e.preventDefault();
    if (this.isCreateAble) {
      this.showContextMenu = true;
      this.currentId = _id;
      this.$nextTick(() => {
        let contextmenu: any = this.$refs.contextmenu;
        contextmenu.style.left = e.x + 'px';
        contextmenu.style.top = e.y + 'px';
      });
    }
  }
  remove() {
    if (this.currentId) {
      this.$store.commit('pushPageLoading', {
        name: 'AWARD_DELETE',
        message: '동아리 수상 삭제 중',
      });
      this.$store
        .dispatch('AWARD_DELETE', { _id: this.currentId })
        .then((award) => {
          this.$store.commit('clearPageLoading', 'AWARD_DELETE');
          this.reload();
        })
        .catch((err) => {});
    }
  }

  get getClub() {
    return this.$store.state.club;
  }
  get getClubImage() {
    if (this.$store.state.club.imgPath) return this.$store.state.mainPath + this.$store.state.club.imgPath;
    else return 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg';
  }
  get isCreateAble() {
    if (this.$store.state.club.ranks) {
      let user = this.$store.state.club.members.find((member: any) => {
        return member.user == this.$store.state.userInformation._id;
      });
      if (user) return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin || this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).permission.indexOf(11) != -1;
      else return false;
    } else return false;
  }
}
</script>
<style>
.award {
  padding: 30px 60px;
}
.award__club {
  width: 100%;
  padding: 50px;

  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);

  display: flex;
  align-items: center;

  margin-bottom: 20px;
}
.darkTheme .award__club {
  background-color: #282828;
}

.award__contextmenu {
  position: fixed;

  width: 100px;
  height: auto;

  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
  background-color: white;

  z-index: 100;
}
.award__contextmenu__item {
  cursor: pointer;
  padding: 10px;
  color: #273142;

  text-align: center;
}
.award__contextmenu__item.delete {
  color: #e02020;
}
.award__contextmenu__item:hover {
  background-color: #9cb2cd;
  color: white;
}
.award__contextmenu__item.delete:hover {
  background-color: #e02020;
}

.award__club div {
  margin-left: 50px;
}
.award__club h3 {
  font-family: 'NanumSquareEB';
  font-size: 45px;
  color: #273142;
}
.darkTheme .award__club h3 {
  color: white;
}
.award__club p {
  font-family: 'NanumSquareEB';
  font-size: 25px;
  color: #9cb2cd;
}
.award__clubimage {
  width: 120px;
  height: 120px;

  border-radius: 100%;
  box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
}
.award__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.award__list__item {
  flex: auto;
  flex-basis: 40%;
  margin-bottom: 20px;
}
.award__list__item:nth-child(2n) {
  margin-left: 20px;
}
.award__list__item__create {
  cursor: pointer;

  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
  /* border: 5px dotted #9cb2cd; */
  /* border: 1px solid #9cb2cd; */
  display: flex;

  justify-content: center;
  align-items: center;

  color: #9cb2cd;
  font-size: 40px;

  transition: 0.2s;
  transform: scale(0.99);
}
.award__list__item__create:hover {
  box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.3);
  transform: scale(1);
}
@media screen and (max-width: 768px) {
  .award {
    padding: 30px;
  }
  .award__list__item,
  .award__club {
    padding: 35px;
  }
  .award__list__item {
    flex-basis: 100%;
    margin-left: 0 !important;
  }
}
</style>
