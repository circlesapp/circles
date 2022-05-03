<template>
  <div class="result">
    <div class="result__item" v-for="member in members" :key="member._id">
      <div>
        <p>{{ getFilterEmail(member.email) }}</p>
        <h3>{{ member.name }}</h3>
      </div>
      <div class="result__item__information">합격자</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Result extends Vue {
  members: any[] = [];

  created() {
    let filterList = this.getClub.members.filter((x) => x.isPass).map((x) => x.user);
    this.$store.commit('pushPageLoading', {
      name: 'GET_CLUB_MEMBERS',
      message: '동아리 멤버 불러오는 중',
    });
    this.$store
      .dispatch('GET_CLUB_MEMBERS')
      .then((members) => {
        console.log(members);
        this.$store.commit('clearPageLoading', 'GET_CLUB_MEMBERS');
        this.members = members.filter((x) => filterList.indexOf(x._id) != -1);
      })
      .catch((err) => {});
  }

  getFilterEmail(email: string): string {
    let splitEmail: string[] = email.split('@');
    return `${splitEmail[0].substr(0, splitEmail[0].length - 2)}**@ ${splitEmail[1]}`;
  }

  get getClub() {
    return this.$store.state.club;
  }
}
</script>

<style scoped>
.result {
  padding: 20px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
}
.result__item {
  margin: 20px;
  flex: 1;
  flex-basis: 40%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  border-radius: 22px;
  box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);

  padding: 40px 50px;
  color: #9cb2cd;
  background-color: white;
}
.result__item h3 {
  font-family: 'NanumSquareB';
  font-size: 69px;
}
.result__item p {
  font-family: 'NanumSquareL';
  font-size: 40px;
}
.result__item__information {
  align-self: flex-start;
  font-family: 'NanumSquareL';
  font-size: 40px;
}
.darkTheme .result__item {
  background-color: #282828;
}
@media screen and (max-width: 1200px) {
  .result__item {
    flex-basis: 100%;
  }
}
</style>
