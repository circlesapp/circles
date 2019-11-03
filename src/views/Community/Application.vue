<template>
	<div class="communityApplication">
		<div class="communityApplication__title">부원관리</div>
		<div class="communityApplication__wrapper">
			<table class="communityApplication__memberTable">
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
            <div class="communityApplication__controlPanel">

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
.communityApplication__memberTable tbody tr {
	border-bottom: 1px solid #dfdfdf;
}
.communityApplication__memberTable tbody td {
	font-family: NanumSquareB;
}
.communityApplication__memberTable td:first-child{
    text-align: center;
}

.communityApplication__controlPanel{
    flex: 1;
	flex-basis: 50%;
}
</style>