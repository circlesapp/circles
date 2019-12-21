<template>
	<div class="communityMembers">
		<div class="communityMembers__title">멤버관리</div>
		<div class="communityMembers__wrapper">
			<table class="communityMembers__memberTable">
				<thead>
					<tr>
						<th style="width:10%; text-align:center;">번호</th>
						<th style="width:40%;" @click="orderBy('user.name')">
							이름
							<i
								class="mdi mdi-arrow-down"
								:class="{'order-active':sortKey == 'user.name','order-rotate':sortBy}"
							></i>
						</th>
						<th style="width:50%;" @click="orderBy('rank')">
							역할
							<i
								class="mdi mdi-arrow-down"
								:class="{'order-active':sortKey == 'rank','order-rotate':sortBy}"
							></i>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(member,idx) in getOrderedMembers"
						:key="member._id"
						@click="currentUser=idx"
						:class="{'active':currentUser == idx}"
					>
						<td>{{idx}}</td>
						<td>{{member.user.name}}</td>
						<td>
							{{getRankString(member.rank)}}
							<i class="mdi mdi-key" v-if="member.rank == 'admin'"></i>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="communityMembers__controlPanel">
				<div class="rankEditor">
					<h2 class="name">권한 그룹</h2>
					<div class="rankEditor__wrapper">
						<div class="ranks__wrapper">
							<ul class="ranks">
								<li
									:class="{'ranks__item-active':currentRank == idx}"
									v-for="(rank,idx) in getClub.ranks"
									:key="idx"
									@click="currentRank=idx"
								>
									<input
										type="text"
										v-if="getClub.ranks[idx].name != 'admin' && getClub.ranks[idx].name != 'default'"
										v-model="rank.name"
									/>
									<span v-else>{{rank.name}}</span>
								</li>
								<li class="rankcreate" @click="appendRank">+</li>
							</ul>
							<div class="rankPermission">
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="1"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									글 쓰기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="2"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									글 읽기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="3"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									글 삭제 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="11"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									수상 쓰기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="12"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									수상 읽기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="13"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									수상 삭제 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="31"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									지원서 수락 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="32"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									지원서 읽기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="33"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									지원서 삭제 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="41"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									캘린더 생성 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="42"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									캘린더 읽기 권한
								</label>
								<label>
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].permission"
										value="43"
										:disabled="getClub.ranks[currentRank].isAdmin"
									/>
									<span></span>
									캘린더 삭제 권한
								</label>
								<label class="admin">
									<input
										type="checkbox"
										v-model="getClub.ranks[currentRank].isAdmin"
										:disabled="getClub.ranks[currentRank].name == 'admin'"
									/>
									<span></span>
									관리자 권한
								</label>
							</div>
						</div>

						<div class="rankAction">
							<div
								class="delete"
								v-if="getClub.ranks[currentRank].name != 'admin' && getClub.ranks[currentRank].name != 'default'"
								@click="removeRank(currentRank)"
							>삭제</div>
						</div>
					</div>
				</div>
				<div class="userInformation" v-if="getOrderedMembers[currentUser]">
					<div class="titlewrapper">
						<h2 class="name">{{getOrderedMembers[currentUser].user.name}}</h2>
						<h3 class="rank">{{getRankString(getOrderedMembers[currentUser].rank)}}</h3>
					</div>
					<div class="userInformation__item rankSelect">
						<h3>역할</h3>
						<select v-model="getOrderedMembers[currentUser].rank">
							<option :value="rank.id" v-for="rank in getClub.ranks" :key="rank.id">{{rank.name}}</option>
						</select>
					</div>
					<div class="userInformation__item isPass">
						<h3>합격</h3>
						<p>
							결과 확인에 띄우기
							<SwitchButton v-model="getOrderedMembers[currentUser].isPass"></SwitchButton>
						</p>
					</div>
					<div class="action">
						<button
							class="fire"
							@click="fire"
							v-if="getOrderedMembers[currentUser].user._id != getClub.owner"
						>퇴출</button>
						<button class="save" @click="commit">변경 사항 저장</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import SwitchButton from "@/components/SwitchButton.vue";

export default Vue.extend({
	components: {
		SwitchButton
	},
	data() {
		return {
			members: [],
			sortKey: "",
			sortBy: false,
			currentUser: 0 as any,
			currentRank: 0 as any
		};
	},
	created() {
		this.reload();
	},
	methods: {
		reload() {
			this.$store.commit("pushLoading", {
				name: "GET_CLUB_DETAIL_MEMBERS",
				message: "동아리 맴버 불러오는 중"
			});
			this.$store
				.dispatch("GET_CLUB_DETAIL_MEMBERS")
				.then(members => {
					this.$store.commit(
						"clearLoading",
						"GET_CLUB_DETAIL_MEMBERS"
					);

					this.members = members;
				})
				.catch(err => {});
		},
		orderBy(key: string) {
			if (this.sortKey == key) {
				this.sortBy = !this.sortBy;
			} else {
				this.sortKey = key;
			}
		},
		appendRank() {
			this.getClub.ranks.push({
				id: this.getClub.ranks[this.getClub.ranks.length - 1].id + 1,
				name: "이름",
				permission: []
			});
			this.currentRank = this.getClub.ranks.length - 1;
		},
		removeRank(idx: number) {
			this.currentRank = 0;
			this.getClub.ranks.splice(idx, 1);
		},
		getRankString(id: number) {
			return this.getClub.ranks.find((x: any) => x.id == id).name;
		},
		commit() {
			this.$store.commit("pushLoading", {
				name: "CLUB_MODIFICATION",
				message: "동아리 맴버 수정 중"
			});
			this.$store
				.dispatch("CLUB_MODIFICATION", {
					ranks: this.getClub.ranks,
					members: this.members.map((x: any) => {
						x.user = x.user._id;
						return x;
					})
				})
				.then(club => {
					this.$store.commit("clearLoading", "CLUB_MODIFICATION");
					this.reload();
				})
				.catch(err => console.log(err));
		},
		fire() {
			this.$store.commit("pushLoading", {
				name: "CLUB_FIRE_MEMBER",
				message: "동아리 맴버 퇴출 중"
			});
			this.$store
				.dispatch("CLUB_FIRE_MEMBER", {
					_id: this.getOrderedMembers[this.currentUser].user
				})
				.then(club => {
					this.currentUser = 0;
					this.$store.commit("clearLoading", "CLUB_FIRE_MEMBER");
					this.reload();
				})
				.catch(err => console.log(err));
		}
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getOrderedMembers(): any {
			if (this.sortKey == "") {
				return this.members;
			} else {
				return this.members.sort((a: any, b: any): any => {
					if (this.sortBy)
						return b[this.sortKey] > a[this.sortKey] ? 1 : -1;
					else return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
				});
			}
		}
	}
});
</script>

<style>
.communityMembers {
	padding: 40px;
	margin-bottom: 60px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.communityMembers__title {
	margin-bottom: 20px;
	font-family: NanumSquareEB;
	font-size: 38px;
	font-weight: 800;
}
.communityMembers__wrapper {
	display: flex;
}
.communityMembers__memberTable {
	flex: 1;
	flex-basis: 50%;
	background-color: white;
	width: 50%;
	border-collapse: collapse;
}
.darkmode .communityMembers__memberTable {
	background-color: #282828;
}
.communityMembers__memberTable td {
	padding: 10px;
}
.communityMembers__memberTable thead {
	color: white;

	text-align: left;
}
.communityMembers__memberTable thead tr {
	position: relative;
	user-select: none;
	cursor: pointer;
	background-color: #538fff;
}
.darkmode .communityMembers__memberTable thead tr {
	background-color: #161616;
}
.communityMembers__memberTable .active {
	background-color: #eeeeee;
}
.darkmode .communityMembers__memberTable .active {
	color: #9cb2cd;
	background-color: #232323;
}
.communityMembers__memberTable th {
	position: relative;
	padding: 10px;
	font-size: 12px;
}
.communityMembers__memberTable th i {
	position: absolute;
	right: 10px;
	font-size: 14px;
	opacity: 0;
	transition: 0.2s;
}
.order-active {
	opacity: 1 !important;
	transform: rotate(180deg);
}
.order-rotate {
	transform: rotate(0deg);
}
.communityMembers__memberTable tbody tr {
	border-bottom: 1px solid #dfdfdf;
	cursor: pointer;
}
.darkmode .communityMembers__memberTable tbody tr {
	border-bottom: 1px solid #3a3a3a;
}
.communityMembers__memberTable tbody td {
	font-family: NanumSquareB;
}
.communityMembers__memberTable tbody td i {
	font-size: 14px;
	color: #538fff;
}
.communityMembers__memberTable td:first-child {
	text-align: center;
}

.communityMembers__controlPanel {
	flex: 1;
	flex-basis: 50%;

	background-color: white;
	margin-left: 40px;

	border-radius: 25px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);

	padding: 30px;
}
.darkmode .communityMembers__controlPanel {
	background-color: #282828;
}
.communityMembers__controlPanel .rankEditor__wrapper {
	margin: 20px 0;
	padding: 15px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	border-radius: 10px;
}
.communityMembers__controlPanel .ranks__wrapper {
	display: flex;
}
.communityMembers__controlPanel .rankAction {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}
.communityMembers__controlPanel .rankAction .delete {
	cursor: pointer;
	color: #e02020;
}
.communityMembers__controlPanel .ranks {
	list-style: none;
	flex: 1;
	min-width: 100px;
	margin-right: 10px;
}
.communityMembers__controlPanel .ranks li {
	cursor: pointer;
	padding: 5px;
	margin-bottom: 10px;
	text-align: center;

	background-color: #9cb2cd;
	color: white;

	border-radius: 100px;
}
.darkmode .communityMembers__controlPanel .ranks li {
	background-color: #363636;
}
.communityMembers__controlPanel .ranks li input {
	background: none;
	border: none;
	width: 100%;
	text-align: center;
	color: white;
	font-family: NanumSquareB;
	font-size: 16px;
}
.communityMembers__controlPanel .ranks .rankcreate {
	background-color: white;
	color: #538fff;
}
.communityMembers__controlPanel .ranks .ranks__item-active {
	background-color: #538fff;
}
.darkmode .communityMembers__controlPanel .ranks .ranks__item-active {
	background-color: #232323;
}
.communityMembers__controlPanel .rankPermission {
	flex: 7;

	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: space-between;

	line-height: 1.4em;
}
.communityMembers__controlPanel .rankPermission label {
	cursor: pointer;
	flex-basis: 30%;

	font-size: 14px;
	font-family: NanumSquareB;
	margin: 10px;

	display: flex;
	align-items: center;
}
.communityMembers__controlPanel .rankPermission label.admin {
	color: #e02020;
}

.communityMembers__controlPanel .rankPermission label input {
	display: none;
}
.communityMembers__controlPanel .rankPermission label span {
	display: inline-block;
	content: "";
	width: 15px;
	height: 15px;
	border: 2.5px solid #538fff;
	border-radius: 100%;
	margin-right: 10px;
	transition: 0.2s;
}
.darkmode .communityMembers__controlPanel .rankPermission label span {
	border: 2.5px solid white;
}
.communityMembers__controlPanel .rankPermission label input:checked + span {
	background-color: #538fff;
}
.darkmode
	.communityMembers__controlPanel
	.rankPermission
	label
	input:checked
	+ span {
	background-color: white;
}
.communityMembers__controlPanel .rankPermission label input:disabled + span {
	opacity: 0.4;
	cursor: not-allowed;
}

.communityMembers__controlPanel .titlewrapper {
	display: flex;
	align-items: flex-end;
}
.communityMembers__controlPanel .name {
	font-family: NanumSquareB;
	font-size: 30px;
}
.communityMembers__controlPanel .rank {
	margin-left: 10px;
	font-size: 20px;
	font-weight: 800;
	color: #9cb2cd;
}
.communityMembers__controlPanel .action {
	display: flex;
	justify-content: flex-end;
}
.communityMembers__controlPanel .fire {
	border: none;
	outline: none;
	background-color: #e02020;
	color: white;

	padding: 10px 20px;
	border-radius: 8px;

	font-family: NanumSquareB;
	font-size: 20px;
	margin-right: 20px;
}
.communityMembers__controlPanel .save {
	cursor: pointer;
	border: none;
	outline: none;
	background-color: #538fff;
	color: white;

	padding: 10px 20px;
	border-radius: 8px;

	font-family: NanumSquareB;
	font-size: 20px;
}
.userInformation__item {
	margin: 10px;
	margin-top: 20px;
}
.userInformation__item p {
	margin-left: 0.5em;
}
.communityMembers__controlPanel .rankSelect select {
	outline: 0;
	box-shadow: none;
	border: 0 !important;
	background-image: none;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
	position: relative;
	display: flex;
	width: 20em;
	height: 3em;
	line-height: 3;
	overflow: hidden;
	border-radius: 0.25em;
	flex: 1;
	padding: 0 0.5em;

	margin-top: 10px;
}
.darkmode .communityMembers__controlPanel .rankSelect select {
	color: white;
	background-color: #363636;
}
.communityMembers__controlPanel .rankSelect option {
	border: 0;
}
.darkmode .communityMembers__controlPanel .rankSelect option {
	color: white;
	background-color: #363636;
}

.communityMembers__controlPanel .isPass label {
	margin-top: 10px;
	margin-left: 0.5em;
}
@media screen and (max-width: 1279px) {
	.communityMembers__wrapper {
		flex-wrap: wrap;
	}
	.communityMembers__memberTable,
	.communityMembers__controlPanel {
		margin: 0;
		margin-top: 20px;
		flex-basis: 100%;
	}
	.communityMembers__controlPanel {
		margin: 30px 0;
	}
	.communityMembers__controlPanel .rankPermission label {
		flex-basis: 40%;
	}
}
@media screen and (max-width: 719px) {
	.communityMembers__controlPanel .rankPermission label {
		flex-basis: 50%;
	}
}
</style>