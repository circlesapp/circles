<template>
	<div class="interview"></div>
</template>

<script lang="ts">
import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
export default Vue.use(VueSocketIOExt, io("https://circlesapp.kr/")).extend({
	sockets: {}
});
</script>

<style>
</style>