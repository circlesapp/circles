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
				<input type="text" v-model="data.subtitle" placeholder="부문" />&nbsp;&nbsp;
				<span class="awardbox__user" v-for="(user,idx) in data.target" :key="idx">
					<input
						style="width:4em;"
						type="text"
						v-model="data.target[idx].name"
						@keydown="pressKey($event,idx)"
						:ref="idx == data.target.length-1 ? 'last' : ''"
						placeholder="이름"
						@focus="focusInputIndex = idx"
						@blur="focusOut(idx)"
					/>
					<div class="awardbox__userautocomplete" v-if="idx == focusInputIndex">
						<li
							v-for="(member, i) in getSearchMember(idx)"
							:key="member._id"
							:class="{'active':currentSelectIndex == i}"
						>{{member.name}}</li>
					</div>
				</span>
				<span class="awardbox__appendTarget" @click="appendTarget">+</span>
			</p>
		</div>
		<h3 v-if="!data.isCreated">{{data.level}}</h3>
		<h3 v-else>
			<input type="text" style="text-align:right;" v-model="data.level" placeholder="상격" />
		</h3>
		<span class="awardbox__create" v-if="data.isCreated" @click="create">생성</span>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object,
		admin: Boolean
	},
	data() {
		return {
			focusInputIndex: -1,
			currentSelectIndex: 0,
			members: []
		};
	},
	created() {
		this.$store
			.dispatch("GET_CLUB_MEMBERS")
			.then(members => {
				this.members = members;
			})
			.catch(err => {});
	},
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
		pressKey(e: any, idx: number) {
			if (e.keyCode == 32 && e.ctrlKey) return (this.focusInputIndex = idx);
			let len = this.getSearchMember(idx).length - 1;
			switch (e.keyCode) {
				case 13:
					if (this.currentSelectIndex != -1) {
						this.data.target[idx].name = (this.members[
							this.currentSelectIndex
						] as any).name;
						this.data.target[idx].user = (this.members[
							this.currentSelectIndex
						] as any)._id;
						this.focusInputIndex = -1;
					}
					break;
				case 38:
					if (this.currentSelectIndex > 0) this.currentSelectIndex--;
					break;
				case 40:
					if (this.currentSelectIndex < len)
						this.currentSelectIndex++;
					break;
			}
			if (this.currentSelectIndex > len)
				this.currentSelectIndex = len == -1 ? 0 : len;
		},
		focusOut(idx: number) {
			if (!this.data.target[idx].user) {
				this.data.target[idx].name = "";
				this.data.target[idx].user = "";
			}
			this.currentSelectIndex = 0;
			this.focusInputIndex = -1;
		},
		getSearchMember(idx: number): any[] {
			return this.members.filter((x: any) => {
				return x.name.indexOf(this.data.target[idx].name) != -1;
			});
		},
		create() {
			this.data.target = this.data.target.map((x: any) => x.user);
			this.$store
				.dispatch("AWARD", this.data)
				.then(award => {
					this.$emit("isUpdated", false);
				})
				.catch(err => {});
		}
	},
	computed: {}
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
	overflow-y: scroll;
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