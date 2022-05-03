<template>
  <label class="switchbutton__wrapper">
    <input type="checkbox" :checked="checked" @change="onChange" />
    <span class="switchbutton"></span>
  </label>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';

class Props {
  checked: boolean = prop({ required: true });
}

@Options({})
export default class SwitchButton extends Vue.with(Props) {
  onChange($event: any) {
    this.$emit('change', $event.target.checked);
  }
}
</script>

<style scoped>
.switchbutton__wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 36px;
  height: 14px;
}
.switchbutton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eaeaea;
  border-radius: 8px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.switchbutton::before {
  position: absolute;
  top: -3px;
  left: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
  content: '';
  width: 20px;
  height: 20px;
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
input:checked + .switchbutton {
  background-color: #222;
}
input:focus + .switchbutton {
  box-shadow: 0 0 1px #222;
}
input:checked + .switchbutton:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}
.darkTheme input:checked + .switchbutton {
  background-color: #3b4351;
}
</style>
