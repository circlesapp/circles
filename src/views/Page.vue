<template>
  <div class="page">
    <div class="submenu">
      <div class="submenu__list">
        <router-link :to="{ name: 'page/timeline' }" class="submenu__list__item">
          타임라인
        </router-link>
        <router-link :to="{ name: 'page/awards' }" class="submenu__list__item">
          수상실적
        </router-link>
        <router-link :to="{ name: 'page/members' }" class="submenu__list__item">
          멤버소개
        </router-link>
        <router-link :to="{ name: 'page/budgets' }" class="submenu__list__item">
          예산공개
        </router-link>
        <router-link :to="{ name: 'page/applicant/main' }" class="submenu__list__item">
          채용
        </router-link>
      </div>
      <transition name="toploadingAnimation">
        <TopLoadingBar class="submenu__loading" v-if="isTopLoading"></TopLoadingBar>
      </transition>
    </div>
    <div class="page__content" ref="page__content">
      <router-view v-if="!isLocalLoading" v-slot="{ Component }">
        <transition name="routerfade-animation">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TopLoadingBar from '../components/TopLoadingBar.vue';

@Options({
  components: {
    TopLoadingBar,
  },
  watch: {
    $route() {
      (this.$refs.page__content as HTMLDivElement).scrollTop = 0;
    },
  },
})
export default class Page extends Vue {
  isLocalLoading: boolean = false;

  created() {
    if (
      !this.getClub.name ||
      this.getClub.name.toLowerCase() != String(this.$route.params.club).toLowerCase()
    ) {
      this.$store.commit('pushLoading', {
        name: 'GET_CLUB',
        message: '동아리 불러오는 중',
      });
      this.isLocalLoading = true;
      this.$store
        .dispatch('GET_CLUB', this.$route.params.club)
        .then(club => {
          this.$store.commit('clearLoading', 'GET_CLUB');
          this.isLocalLoading = false;

          if (!club) this.$router.push('/');
        })
        .catch(err => {
          this.$store.commit('clearLoading', 'GET_CLUB');
          this.isLocalLoading = false;

          this.$router.push('/');
        });
    }
  }

  get isTopLoading() {
    return this.$store.state.pageLoadingStack.length > 0;
  }
  get isLoading() {
    return this.$store.state.loadingStack.length > 0;
  }
  get getClub() {
    return this.$store.state.club;
  }
}
</script>

<style>
.toploadingAnimation-enter-active,
.toploadingAnimation-leave-active {
  transition: 0.2s;
}
.toploadingAnimation-enter-from,
.toploadingAnimation-leave-to {
  opacity: 0;
}
.toploadingAnimation-enter-to,
.toploadingAnimation-leave-from {
  opacity: 1;
}

.routerfade-animation-enter-active,
.routerfade-animation-leave-active {
  transition: 0.3s !important;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.routerfade-animation-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.routerfade-animation-enter-to {
  opacity: 1;
  transform: scale(1);
}
.routerfade-animation-leave-from {
  opacity: 1;
  transform: scale(1);
}
.routerfade-animation-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.page {
  display: flex;
  flex-direction: column;
}
.page__content {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;

  position: relative;
}

.submenu__loading {
  position: absolute;
  left: 0;
  bottom: 0;
}
@media screen and (max-width: 768px) {
  .submenu__list {
    margin: 0;
  }
}
</style>
