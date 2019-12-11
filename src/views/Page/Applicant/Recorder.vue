<template>
	<div class="recorder">
		<div class="recorder__left">
			<div class="recorder__item">
				<div>
					<p>20611</p>
					<h3>박종훈</h3>
				</div>
				<div class="recorder__item__information">현재 면접자</div>
			</div>
			<div class="recorder__item">
				<div>
					<p>20611</p>
					<h3>박종훈</h3>
				</div>
				<div class="recorder__item__information">다음 면접자</div>
			</div>
		</div>
		<div class="recorder__right">
			<div class="recorder__list">
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item recorder__list__item-highlight">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
				<div class="recorder__list__item">
					<span>1</span>
					<span>20611</span>
					<span>박종훈</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
// import VueSocketIOExt from "vue-socket.io-extended";
// import io from "socket.io-client";

// export default Vue.use(VueSocketIOExt, io("localhost:3000")).extend({
// 	sockets: {},
// 	created() {}
// });
export default Vue.extend({});
</script>
<style scoped>
.recorder {
	display: flex;
	padding: 50px;
}
.recorder__left {
	flex: 2;
	display: flex;
	flex-direction: column;
}

.recorder__item {
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);

	padding: 40px 50px;
}
.recorder__item h3 {
	font-family: "NanumSquareB";
	font-size: 69px;
}
.recorder__item p {
	font-family: "NanumSquareL";
	font-size: 40px;
}
.recorder__item:nth-child(1) {
	margin-bottom: 50px;
	color: white;
	background-color: #538fff;
}
.recorder__item:nth-child(2) {
	color: #9cb2cd;
	background-color: white;
}
.darkmode .recorder__item {
	background-color: #282828;
}
.recorder__item__information {
	align-self: flex-start;
	font-family: "NanumSquareL";
	font-size: 40px;
}
.recorder__right {
	flex: 3;
	padding: 60px;
	display: flex;
	margin-left: 50px;

	background-color: white;
	border-radius: 22px;
	box-shadow: 0 2px 38px 0 rgba(0, 0, 0, 0.03);
}
.darkmode .recorder__right {
	background-color: #282828;
}
.recorder__list {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
}
.recorder__list__item {
	flex: 1;
	margin: 8px 40px;
	font-family: "NanumSquareL";
	font-size: 40px;
	color: #9cb2cd;
	display: flex;
	justify-content: space-between;
}
.recorder__list__item span:nth-child(2) {
	margin: 0 50px;
}
.recorder__list__item span:nth-child(2),
.recorder__list__item span:nth-child(3) {
	flex: 1;
}
.recorder__list__item-highlight {
	font-family: "NanumSquareB" !important;
	font-weight: bold;
	font-size: 40px;
	color: #538fff;
}
@media screen and (max-width: 1600px) {
	.recorder {
		flex-direction: column;
	}
	.recorder__right {
		margin-left: 0;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.recorder__list__item {
		width: 100%;
		margin: 8px 0;
		margin-right: 100px;
	}
}
@media screen and (max-width: 768px) {
	.recorder__right {
		padding: 40px 60px;
	}
	.recorder {
		padding: 40px;
	}
}
</style>