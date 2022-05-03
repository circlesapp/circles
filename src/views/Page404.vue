<template>
  <div class="page404">404 NOT FOUND</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Page404 extends Vue {}
</script>

<style>
.page404 {
  font-family: 'NanumSquareEB';
  font-size: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #538fff;
  color: white;

  animation: notfound 2s infinite;
}
@keyframes notfound {
  0% {
    background-color: #538fff;
    color: white;
  }
  50% {
    background-color: white;
    color: #538fff;
  }
  100% {
    background-color: #538fff;
    color: white;
  }
}
</style>
