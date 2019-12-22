<template>
	<div class="awardbox" :class="{ 'awardbox-created': data.isCreated }" @contextmenu="$emit('contextmenu', $event)">
		<div>
			<h2>{{ data.title }}</h2>
			<p>
				{{ data.subtitle }}&nbsp;&nbsp;
				<span v-for="user in data.target" :key="user.name">{{ user.name }}</span>
			</p>
		</div>
		<h3>{{ data.level }}</h3>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	},
	data() {
		return {
			focusInputIndex: -1,
			currentSelectIndex: 0,
			members: [],
			showContextMenu: false
		};
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

	position: relative;
}
.darkTheme .awardbox {
	background-color: #282828;
}
.awardbox input {
	width: 100px;
	font-size: 1em;
	font-family: inherit;
	color: inherit;
	border: none;
	background-color: none;
}
.awardbox-created {
	border: 1px solid #7293bd;
}
.awardbox h2 {
	font-family: "NanumSquareEB";
	font-size: 45px;
}
.darkTheme .awardbox h2 {
	color: white;
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
	margin-left: 10px;
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
.awardbox__appendTarget {
	cursor: pointer;
}
.awardbox__create {
	position: absolute;
	right: 10px;
	bottom: 10px;

	cursor: pointer;
	color: white !important;
	font-size: 20px !important;
	background-color: #becfe4;
	border-radius: 4px;
	padding: 5px 20px;
}
.awardbox__user {
	display: inline-block;
	position: relative;
}
.awardbox__userautocomplete {
	width: 80px;
	height: auto;
	max-height: 200px;
	overflow-y: auto;
	border-radius: 4px;
	border: 1px solid #7293bd;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
	background-color: white;
	list-style: none;
	position: absolute;
}
.awardbox__userautocomplete li {
	list-style: none;
	font-size: 18px;
	padding: 5px;
	text-align: center;
	cursor: pointer;
}
.awardbox__userautocomplete li.active {
	background-color: #7293bd;
	color: white;
}
</style>
