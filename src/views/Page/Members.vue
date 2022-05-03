<template>
  <div class="members">
    <MemberBox v-for="user in members" class="members__item" :key="user._id" :data="user"></MemberBox>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MemberBox from '../../components/Page/MemberBox.vue';

@Options({
  components: {
    MemberBox,
  },
})
export default class Members extends Vue {
  members: any[] = [];

  created() {
    this.$store.commit('pushPageLoading', {
      name: 'GET_CLUB_MEMBERS',
      message: '동아리 멤버 불러오는 중',
    });
    this.$store
      .dispatch('GET_CLUB_MEMBERS')
      .then((members) => {
        this.$store.commit('clearPageLoading', 'GET_CLUB_MEMBERS');
        this.members = members;
      })
      .catch((err) => {});
  }
}
</script>

<style>
.members {
  display: flex;
  flex-wrap: wrap;
}
.members__item {
  flex: 1;
  flex-basis: 30%;
}
@media screen and (max-width: 768px) {
  .members__item {
    flex-basis: 100%;
  }
}
</style>
