<template>
  <div class="membersLayout" @contextmenu="$emit('contextmenu', $event)">
    <h2>멤버 소개</h2>
    <div class="membersLayout__list">
      <MemberBox class="membersLayout__list__item" v-for="(member, idx) in members" :key="idx" :data="member"></MemberBox>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MemberBox from '../../Page/MemberBox.vue';

@Options({
  components: {
    MemberBox,
  },
})
export default class MembersLayout extends Vue {
  members: any[] = [];

  created() {
    this.$store
      .dispatch('GET_CLUB_MEMBERS')
      .then((members) => {
        this.members = members;
      })
      .catch((err) => {});
  }
}
</script>

<style scoped>
.membersLayout {
  position: relative;
}
.membersLayout {
  width: 100%;
  background-color: #538fff;
}
.darkTheme .membersLayout {
  background-color: #282828;
  box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
}
.membersLayout h2 {
  color: white;
  font-family: NanumSquareB;
  font-size: 28px;

  padding: 40px;
  padding-bottom: 0;
}
.membersLayout__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  color: white;
}
.membersLayout__list__item {
  flex: 1;
  flex-basis: 25%;
  width: 300px;
}
</style>
