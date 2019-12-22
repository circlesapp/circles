<template>
	<div class="applyButtonLayout" @contextmenu="$emit('contextmenu', $event)">
		<button @click="$router.push({ name: 'page/applicant/main' })">지원하기</button>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.applyButtonLayout {
	padding: 40px;
	display: flex;
	justify-content: center;
}
.applyButtonLayout button {
	font-family: NanumSquareB;
	font-size: 28px;
	border: none;
	border-radius: 10px;
	box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
	background-color: #538fff;
	color: white;
	padding: 15px 100px;
	cursor: pointer;
}
.darkTheme .applyButtonLayout button {
	background-color: #282828;
}
</style>
