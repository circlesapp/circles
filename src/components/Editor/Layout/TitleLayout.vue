<template>
  <div class="titleLayout" @contextmenu="$emit('contextmenu', $event)"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class TitleLayout extends Vue {}
</script>
