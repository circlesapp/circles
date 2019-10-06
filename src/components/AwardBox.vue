<template>
	<div class="awardbox">
		<div>
			<h2>{{data.title}}</h2>
			<p>
				{{data.subtitle}}&nbsp;&nbsp;
				<span v-for="user in data.target" :key="user.name">{{user.name}}</span>
			</p>
		</div>
		<h3>{{data.level}}</h3>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	}
});
</script>
<style>
.awardbox {
	width: 100%;
	border-radius: 4px;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	background-color: white;

	display: flex;
	align-items: center;
	padding: 50px;
}
.awardbox h2 {
	font-family: "NanumSquareEB";
	font-size: 45px;
}
.awardbox p {
	color: #7293bd;
	font-family: "NanumSquareEB";
	font-weight: normal;
	font-size: 25px;
}
.awardbox span {
	font-family: "NanumSquareEB";
	font-size: 25px;
	font-weight: normal;
	color: #becfe4;
}
.awardbox h3 {
	flex: 1;
	text-align: right;
	font-family: "NanumSquareEB";
	font-size: 32px;
	font-weight: normal;
	color: #ff9a01;
}
</style>