<template>
	<div class="awardbox" :class="{'awardbox-created':data.isCreated}">
		<div>
			<h2 v-if="!data.isCreated">{{data.title}}</h2>
			<h2 v-else>
				<input style="width:100%" type="text" v-model="data.title" placeholder="대회명" />
			</h2>
			<p v-if="!data.isCreated">
				{{data.subtitle}}&nbsp;&nbsp;
				<span v-for="user in data.target" :key="user.name">{{user.name}}</span>
			</p>
			<p v-else>
				<input type="text" v-model="data.subtitle" placeholder="부문"/>&nbsp;&nbsp;
				<span v-for="(user,idx) in data.target" :key="idx">
					<input
						style="width:4em;"
						type="text"
						v-model="data.target[idx].name"
						@keyup="pressEnter($event,idx)"
						:ref="idx == data.target.length-1 ? 'last' : ''"
                        placeholder="이름"
					/>
				</span>
				<span class="awardbox__appendTarget" @click="appendTarget">+</span>
			</p>
		</div>
		<h3 v-if="!data.isCreated">{{data.level}}</h3>
		<h3 v-else>
			<input type="text" style="text-align:right;" v-model="data.level"  placeholder="상격"/>
		</h3>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object,
		admin: Boolean
	},
	created() {},
	methods: {
		appendTarget() {
			this.data.target.push({
				name: "",
				user: ""
			});
			this.$nextTick(() => {
				let last = this.$refs.last as HTMLInputElement[];
				if (last) {
					last[0].focus();
				}
			});
		},
		pressEnter(e: any, idx: number) {
			if (this.data.target.length - 1 == idx && e.keyCode == 13)
				this.appendTarget();
		}
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
.awardbox__appendTarget {
	cursor: pointer;
}
</style>