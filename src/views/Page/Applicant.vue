<template>
  <div class="applicant">
    <router-view class="applicant__router" v-slot="{ Component }">
      <transition name="routerfade-animation">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Applicant extends Vue {}
</script>
<style>
.applicant,
.applicant__router {
  width: 100%;
  height: 100%;
}
</style>
