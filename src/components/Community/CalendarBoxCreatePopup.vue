<template>
  <div class="calendar__createpopup" action="javascript:void(0);" @contextmenu="$emit('contextmenu', $event)">
    <form class="calendar__createpopup__content" action="javascript:void(0);" @submit="create">
      <button class="calendar__createpopup__content__clear" type="button" @click="$emit('isUpdated', false)">
        <i class="mdi mdi-close"></i>
      </button>
      <h3>일정 생성하기</h3>
      <div class="calendar__createpopup__content__inputs">
        <div class="inputfield">
          <h4>일정 설명</h4>
          <input
            ref="startInput"
            v-model="content"
            class="inputfield__input"
            type="text"
            placeholder="일정 설명을 입력하세요"
            minlength="4"
            required
          />
        </div>
      </div>
      <div class="calendar__createpopup__content__actions">
        <button class="create" type="submit">만들기</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';

class Props {
  start: Date = prop({ required: true });
  end: Date = prop({ required: true });
}

@Options({})
export default class CalendarBoxCreatePopup extends Vue.with(Props) {
  content: string = '';

  mounted() {
    (this.$refs.startInput as HTMLDivElement).focus();
    addEventListener('keydown', (e) => {
      if (e.keyCode == 27) this.$emit('isUpdated', false);
    });
  }

  create() {
    if (this.start && this.end) {
      this.$store.commit('pushLoading', {
        name: 'CALENDAR',
        message: '캘린더 생성하는 중',
      });
      this.$store
        .dispatch('CALENDAR', {
          content: this.content,
          start: this.start,
          end: this.end,
        })
        .then((calendar) => {
          this.$store.commit('clearLoading', 'CALENDAR');
          this.$emit('isUpdated', false);
          this.content = '';
        })
        .catch((err) => console.log(err));
    }
  }
}
</script>

<style>
.calendar__createpopup {
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.45);

  overflow: auto;

  z-index: 2000;
}
.calendar__createpopup__content__clear {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 30px;

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
.darkTheme .calendar__createpopup__content__clear {
  background-color: #282828;
  color: white;
}
.calendar__createpopup__content__clear:hover {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  background-color: white;
}
.darkTheme .calendar__createpopup__content__clear:hover {
  box-shadow: none;
  background-color: white;
  color: #282828;
}
.calendar__createpopup__content {
  background-color: white;
  border-radius: 39px;

  width: 100%;
  max-width: 800px;

  padding: 40px;
  margin: 10px;

  position: relative;
}
.darkTheme .calendar__createpopup__content {
  background-color: #282828;
}
.calendar__createpopup__content h3 {
  font-family: NanumSquareB;
  font-size: 30px;
  color: #2e2e2e;
  margin-bottom: 20px;
}
.darkTheme .calendar__createpopup__content h3 {
  color: white;
}
.calendar__createpopup__content__inputs {
  display: flex;
  flex-wrap: wrap;
}
.calendar__createpopup__content .inputfield {
  padding: 10px;
  flex-basis: 100%;
}
.calendar__createpopup__content .inputfield h4 {
  font-family: NanumSquareL;
  font-size: 24px;
  font-weight: none;
  margin-bottom: 10px;
}
.calendar__createpopup__content .inputfield .inputfield__input {
  border-radius: 8px;
  border: solid 1px #eeeeee;
  padding: 10px 20px;
  font-size: 24px;
  width: 100%;
  position: relative;
  background: none;
}
.darkTheme .calendar__createpopup__content .inputfield .inputfield__input {
  color: white;
  border: solid 1px #3a3a3a;
}
.inputfield__inputuser {
  display: flex;
  flex-wrap: wrap;
  width: auto;
}

.calendar__createpopup__content .inputfield input::placeholder {
  color: #999999;
}

.calendar__createpopup__content__actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
}
.calendar__createpopup__content__actions button {
  border-radius: 31.5px;
  border: none;
  background: none;
  font-size: 24px;
  margin: 10px;

  cursor: pointer;
  transition: 0.2s;
}
.calendar__createpopup__content__actions .create {
  padding: 10px 40px;
  background-color: #538fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.22);
  color: #eeeeee;
}
.darkTheme .calendar__createpopup__content__actions .create {
  background-color: #363636;
}
.calendar__createpopup__content__actions .create:hover {
  background-color: #538fffde;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.27);
}
</style>
