<template>
	<div class="communityApplication">
		<div class="communityApplication__title">채용 관리</div>
		<div class="communityApplication__wrapper">
			<table class="communityApplication__memberTable">
				<thead>
					<tr>
						<th style="width:10%; text-align:center;">순서</th>
						<th style="width:40%;" @click="orderBy('number')">
							학번
							<i
								class="mdi mdi-arrow-down"
								:class="{'order-active':sortKey == 'number','order-rotate':sortBy}"
							></i>
						</th>
						<th style="width:50%;" @click="orderBy('owner.name')">
							이름
							<i
								class="mdi mdi-arrow-down"
								:class="{'order-active':sortKey == 'owner.name','order-rotate':sortBy}"
							></i>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(application,idx) in getOrderedApplicants"
						:key="application._id"
						:class="{'active':currentApplicant == idx}"
						@click="currentApplicant=idx"
					>
						<td>{{idx+1}}</td>
						<td>{{application.number}}</td>
						<td>{{application.owner.name}}</td>
					</tr>
					<tr v-if="applicants.length == 0" class="noapplications">
						<td colspan="3">지원자가 없습니다.</td>
					</tr>
				</tbody>
			</table>
			<div class="communityApplication__controlPanel" v-if="applicants.length">
				<div class="userwrapper">
					<div class="titlewrapper">
						<h2 class="name">{{applicants[currentApplicant].owner.name}}</h2>
						<h3 class="subcontent">{{applicants[currentApplicant].email}}</h3>
					</div>
					<h3 class="subcontent">번호 : {{applicants[currentApplicant].number}}</h3>
					<h3 class="subcontent">전화번호 : {{applicants[currentApplicant].phone}}</h3>
					<h3 class="subcontent" style="margin-top:10px">소개 :</h3>
					<p class="content subcontent">{{applicants[currentApplicant].content}}</p>
				</div>
				<div class="action">
					<div class="reject" @click="reject" v-if="checkPermission(33)">거절</div>
					<div class="accept" @click="accept" v-if="checkPermission(31)">승인</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			applicants: [],
			sortKey: "",
			sortBy: false,
			currentApplicant: 0
		};
	},
	created() {
		this.reload();
	},
	methods: {
		orderBy(key: string) {
			if (this.sortKey == key) {
				this.sortBy = !this.sortBy;
			} else {
				this.sortKey = key;
			}
		},
		reload() {
			this.$store.commit("pushLoading", {
				name: "GET_CLUB_APPLICANT",
				message: "동아리 지원서 불러오는 중"
			});
			this.$store
				.dispatch("GET_CLUB_APPLICANT")
				.then(applicants => {
					this.$store.commit("clearLoading", "GET_CLUB_APPLICANT");
					this.applicants = applicants;
				})
				.catch(err => {});
		},
		accept() {
			this.$store.commit("pushLoading", {
				name: "APPLICANT_ACCEPT",
				message: "동아리 지원서 수락하는 중"
			});
			this.$store
				.dispatch(
					"APPLICANT_ACCEPT",
					this.applicants[this.currentApplicant]
				)
				.then(applicant => {
					this.$store.commit("clearLoading", "APPLICANT_ACCEPT");
					this.reload();
				})
				.catch(err => console.log(err));
		},
		reject() {
			this.$store.commit("pushLoading", {
				name: "APPLICANT_REJECT",
				message: "동아리 지원서 거절하는 중"
			});
			this.$store
				.dispatch(
					"APPLICANT_REJECT",
					this.applicants[this.currentApplicant]
				)
				.then(applicant => {
					this.$store.commit("clearLoading", "APPLICANT_REJECT");

					this.reload();
				})
				.catch(err => console.log(err));
		},
		checkPermission(permission: number) {
			if (this.$store.state.club.ranks) {
				let user = this.$store.state.club.members.find(
					(member: any) => {
						return (
							member.user == this.$store.state.userInformation._id
						);
					}
				);
				if (user)
					return (
						this.$store.state.club.ranks.find(
							(rank: any) => rank.id == user.rank
						).isAdmin ||
						this.$store.state.club.ranks
							.find((rank: any) => rank.id == user.rank)
							.permission.indexOf("" + permission) != -1
					);
				else return false;
			} else return false;
		}
	},
	computed: {
		getOrderedApplicants(): any {
			if (this.sortKey == "") {
				return this.applicants;
			} else {
				return this.applicants.sort((a: any, b: any): any => {
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
.communityApplication {
	padding: 40px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.communityApplication__title {
	margin-bottom: 20px;
	font-family: NanumSquareEB;
	font-size: 38px;
	font-weight: 800;
}
.communityApplication__wrapper {
	display: flex;
}
.communityApplication__memberTable {
	flex: 1;
	flex-basis: 50%;
	background-color: white;
	width: 50%;
	border-collapse: collapse;
}
.communityApplication__memberTable td {
	padding: 10px;
}
.communityApplication__memberTable thead {
	color: white;

	text-align: left;
}
.communityApplication__memberTable thead tr {
	position: relative;
	user-select: none;
	cursor: pointer;
	background-color: #538fff;
}
.communityApplication__memberTable th {
	position: relative;
	padding: 10px;
	font-size: 12px;
}
.communityApplication__memberTable th i {
	position: absolute;
	right: 10px;
	font-size: 14px;
	opacity: 0;
	transition: 0.2s;
}
.communityApplication__memberTable .noapplications {
	color: #9cb2cd;
}
.order-active {
	opacity: 1 !important;
	transform: rotate(180deg);
}
.order-rotate {
	transform: rotate(0deg);
}
.communityApplication__memberTable tbody tr {
	border-bottom: 1px solid #dfdfdf;
	cursor: pointer;
}
.communityApplication__memberTable .active {
	background-color: #eeeeee;
}
.communityApplication__memberTable tbody td {
	font-family: NanumSquareB;
}
.communityApplication__memberTable td:first-child {
	text-align: center;
}

.communityApplication__controlPanel {
	flex: 1;
	flex-basis: 50%;

	background-color: white;
	margin-left: 40px;

	border-radius: 25px;
	box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);

	padding: 30px;
}
.communityApplication__controlPanel .name {
	font-family: NanumSquareB;
	font-size: 30px;
}

.communityApplication__controlPanel .subcontent {
	margin-left: 10px;
	font-size: 20px;
	font-weight: 800;
	color: #9cb2cd;
}
.communityApplication__controlPanel .content {
	border: 1px solid #eeeeee;
	border-radius: 5px;
	padding: 10px;
}
.communityApplication__controlPanel .titlewrapper {
	display: flex;
	align-items: flex-end;
	margin-bottom: 10px;
}
.communityApplication__controlPanel .action {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}
.communityApplication__controlPanel .reject {
	border: none;
	outline: none;
	cursor: pointer;
	background-color: #e02020;
	color: white;

	padding: 10px 20px;
	border-radius: 8px;

	font-family: NanumSquareB;
	font-size: 20px;
	margin-right: 20px;
}
.communityApplication__controlPanel .accept {
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
@media screen and (max-width: 1279px) {
	.communityApplication__wrapper {
		flex-wrap: wrap;
	}
	.communityApplication__memberTable,
	.communityApplication__controlPanel {
		margin: 0;
		margin-top: 20px;
		flex-basis: 100%;
	}
	.communityApplication__controlPanel {
		margin: 30px 0;
	}
}
</style>