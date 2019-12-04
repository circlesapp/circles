<template>
    <div class="noticebar">
        <div class="noticebar__content">
            <div class="noticebar__content__left">
                <div class="noticebar__logo"></div>
                <p>알림바 테스트</p>
            </div>
            <button class="noticebar__content__clear" @click="$emit('isUpdated', false)">
                <i class="mdi mdi-close"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    mounted() {
        addEventListener("keydown", e => {
            if (e.keyCode == 27) this.$emit("isUpdated", false);
        });
    }
});
</script>

<style>
.noticebar {
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    top: auto;
    bottom: 0;
    left: 0;
    right: 0;

    user-select: none;
}
.noticebar__content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 80vw;
    max-width: 600px;
    margin-bottom: 8px;

    padding: 0 10px;

    border-radius: 20px;
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

    word-break: keep-all;
}
.darkmode .noticebar__content {
    background-color: #282828;
}
.noticebar__content__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.noticebar__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background: url("../assets/circles_logo.png") no-repeat center;
    background-size: 100%;
}
.noticebar__content p {
    margin-left: 4px;
    font-size: 1.1em;
    color: #323232;
}
.darkmode .noticebar__content p {
    color: white;
}
.noticebar__content__clear {
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 22px;

    border: none;
    border-radius: 50%;
    background-color: white;
    color: rgb(46, 46, 46);

    cursor: pointer;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
}
.darkmode .noticebar__content__clear {
    background-color: #282828;
    color: white;
}
.noticebar__content__clear:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    background-color: white;
}
.darkmode .noticebar__content__clear:hover {
    box-shadow: none;
    background-color: #282828;
}
</style>
