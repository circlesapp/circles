<template>
	<div class="applicant">
        <transition name="routerfade-animation">

		<router-view class="applicant__router"></router-view>
        </transition>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style>
.applicant,
.applicant__router {
	width: 100%;
	height: 100%;
}
</style>