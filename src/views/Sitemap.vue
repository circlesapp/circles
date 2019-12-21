<template>
	<div>
        <div v-for="club in clubs" :key="club._id">
            <img :src="getImgPath(club.imgPath)" alt="club_logo" />
			<h3>{{club.name}}</h3>
        </div>
<!-- :to="`/${club.name}/page/timeline`" -->
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            clubs: [] as any[],
            selectedClub: ""
        };
    },
    created() {
        this.$store.commit("pushLoading", {
            name: "GET_ALL_CLUB",
            message: "로그인 중"
        });
        this.$store
            .dispatch("GET_ALL_CLUB")
            .then(clubs => {
                this.$store.commit("clearLoading", "GET_ALL_CLUB");
                this.clubs = clubs;
            })
            .catch(err => {});
    },
    methods: {
        getImgPath(imgPath: string) {
            if (imgPath) return this.$store.state.mainPath + imgPath;
            else
                return "https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg";
        }
    }
});
</script>

<style>
img {
    width: 60px;
    height: 60px;
    border-radius: 100%;

    box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);

    background-color: #f8fbff;
}
</style>
