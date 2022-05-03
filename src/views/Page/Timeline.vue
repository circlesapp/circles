<template>
  <div class="timeline" v-if="posts.length > 0 || !isPostLoadClear || getPermissionCreate">
    <div class="timeline__wrapper">
      <Post v-if="getPermissionCreate" :isCreate="true" @isChange="reload"></Post>
      <transition-group name="timeline">
        <Post class="timeline__post" v-for="post in posts" :key="post._id" :data="post" @isChange="reload"></Post>
      </transition-group>
    </div>
  </div>
  <div class="timeline__notfound" v-else>타임라인에 작성된 글이 없습니다.</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Post from '../../components/Page/Post.vue';

@Options({
  components: {
    Post,
  },
})
export default class Timeline extends Vue {
  posts: any[] = [];
  isPostLoadClear: boolean = false;

  created() {
    this.reload();
  }

  reload() {
    this.$store.commit('pushPageLoading', {
      name: 'GET_CLUB_POSTS',
      message: '동아리 글 불러오는 중',
    });
    this.$store
      .dispatch('GET_CLUB_POSTS')
      .then((posts) => {
        this.$store.commit('clearPageLoading', 'GET_CLUB_POSTS');
        this.isPostLoadClear = true;
        this.posts = posts;
      })
      .catch((err) => {});
  }

  get getClub(): any {
    return this.$store.state.club;
  }
  get getPermissionCreate(): boolean {
    if (this.getClub.ranks) {
      if (this.getClub.owner == this.$store.state.userInformation._id) return true;
      let user = this.getClub.members.find((member: any) => {
        return member.user == this.$store.state.userInformation._id;
      });
      if (user) {
        let permission = this.getClub.ranks.find((rank: any) => rank.id == user.rank).permission.map((x: any) => parseInt(x));
        return permission.indexOf(1) != -1;
      } else return false;
    } else return false;
  }
}
</script>

<style>
.timeline-move {
  transition: 0.5s;
}
.timeline-enter-active,
.timeline-leave-active {
  transition: 0.5s;
}
.timeline-leave-active {
  position: absolute !important;
}
.timeline-enter,
.timeline-leave-to {
  transform: scale(0);
  opacity: 0;
}
.timeline-enter-to,
.timeline-leave {
  opacity: 1;
}
.timeline {
  display: flex;
  justify-content: center;
}
.timeline__wrapper {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin-bottom: 25px;
}
.timeline__post {
  display: inline-block;
}

.timeline__notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  font-family: NanumSquareB;
  font-size: 48px;
  color: #aaaaaa;
}
@media screen and (max-width: 768px) {
  .timeline {
    padding: 0 25px;
  }
}
</style>
