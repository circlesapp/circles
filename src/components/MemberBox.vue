<template>
	<div class="memberbox">
		<img
			class="memberbox__img"
			:src="data.imgPath || 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg'"
			alt
		/>
		<h3>{{data.name}}</h3>
		<h4>전공</h4>
		<p>lorem</p>
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
.memberbox {
	width: 100%;
	height: 400px;
	padding: 30px;
	margin: 30px;
	border-radius: 25px;
	background: white;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.memberbox__img {
	width: 150px;
	height: 150px;

	border: 5px solid #f8fbff;
	border-radius: 100%;
}
.memberbox h3 {
	font-family: "NanumSquareB";
	font-size: 30px;
	font-weight: normal;
	text-align: center;
	color: #202841;
}
.memberbox h4 {
	font-family: "NanumSquareB";
	font-size: 26px;
	font-weight: normal;
	text-align: center;
	color: #919eab;
}
.memberbox p {
	font-family: "NanumSquareR";
	font-size: 27px;
	text-align: center;
	color: #202841;

    margin-top: 20px;
}
</style>