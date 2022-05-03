<template>
  <div class="applicant">
    <transition name="routerfade-animation">
      <router-view class="applicant__router"></router-view>
    </transition>
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
