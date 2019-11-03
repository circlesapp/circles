<template>
	<div class="communityMembers">
		<div class="communityMembers__title">부원관리</div>
		<div class="communityMembers__wrapper">
			<table class="communityMembers__memberTable">
				<thead>
					<tr>
						<th style="width:10%; text-align:center;">번호</th>
						<th style="width:40%;">이름</th>
						<th style="width:50%;">역할</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(member,idx) in members" :key="member._id">
						<td>{{idx}}</td>
						<td>{{member.user.name}}</td>
						<td>{{member.rank}}</td>
					</tr>
				</tbody>
			</table>
            <div class="communityMembers__controlPanel">

            </div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(){
        return {
            members:[]
        }
    },
    created(){
        this.$store
			.dispatch("GET_CLUB_DETAIL_MEMBERS")
			.then(members => {
                console.log(members)
				this.members = members;
			})
			.catch(err => {});
    },
    computed:{
    }
});
</script>

<style>
.communityMembers {
	padding: 40px;
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
.communityMembers__memberTable th {
	position: relative;
	padding: 10px;
	font-size: 12px;
}
.communityMembers__memberTable tbody tr {
	border-bottom: 1px solid #dfdfdf;
}
.communityMembers__memberTable tbody td {
	font-family: NanumSquareB;
}
.communityMembers__memberTable td:first-child{
    text-align: center;
}

.communityMembers__controlPanel{
    flex: 1;
	flex-basis: 50%;
}
</style>