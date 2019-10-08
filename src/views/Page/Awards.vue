<template>
	<div class="award">
		<h2 class="award__club">
			<img class="award__clubimage" :src="getClubImage" alt />
			<div>
				<h3>{{getClub.name}}</h3>
				<p>{{getClub.school || '-'}}</p>
			</div>
		</h2>
		<div class="award__list">
			<AwardBox class="award__list__item" v-for="award in awards" :data="award" :key="award._id"></AwardBox>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import AwardBox from "../../components/Page/AwardBox.vue";
export default Vue.extend({
    name : "Awards",
	components: {
		AwardBox
	},
	data() {
		return {
			awards: []
		};
	},
	created() {
		this.$store
			.dispatch("GET_CLUB_AWARDS")
			.then(awards => {
				this.awards = awards;
			})
			.catch(err => {});
	},
	computed: {
		getClub() {
			return this.$store.state.club;
		},
		getClubImage() {
			if (this.$store.state.club.imgPath)
				return (
					this.$store.state.mainPath + this.$store.state.club.imgPath
				);
			else
				return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
		}
	}
});
</script>
<style>
.award {
	padding: 30px 60px;
}
.award__club {
	width: 100%;
	padding: 50px;

	background-color: white;
	box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);

	display: flex;
	align-items: center;

	margin-bottom: 20px;
}
.award__club div {
	margin-left: 50px;
}
.award__club h3 {
	font-family: "NanumSquareEB";
	font-size: 45px;
	color: #273142;
}
.award__club p {
	font-family: "NanumSquareEB";
	font-size: 25px;
	color: #9cb2cd;
}
.award__clubimage {
	width: 120px;
	height: 120px;

	border-radius: 100%;
	box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
}
.award__list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.award__list__item {
	flex: auto;
	flex-basis: 40%;
	margin-bottom: 20px;
}
.award__list__item:nth-child(2n) {
	margin-left: 20px;
}
@media screen and (max-width: 768px) {
	.award__list__item {
		flex-basis: 100%;
		margin-left: 0 !important;
	}
}
</style>