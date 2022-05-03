<template>
  <div>
    <div class="clubs__list">
      <div class="clubs__list__item">
        <div class="clubs__list__item__header">
          <h1>circles.</h1>
        </div>
        <div class="clubs__list__item__divider"></div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>메인</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/login" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>로그인</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/register" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>회원가입</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/passwordChange" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>비밀번호 재설정</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/sitemap" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>사이트맵</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
      </div>
      <div class="clubs__list__item">
        <div class="clubs__list__item__header">
          <img :src="getUserImage" alt="user_profile" />
          <h3>{{ getUserInformation.name }}</h3>
        </div>
        <div class="clubs__list__item__divider"></div>
        <div class="clubs__list__item__wrapper">
          <router-link to="/profile" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>프로필</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
      </div>
      <div></div>
      <div v-for="club in clubs" :key="club._id" class="clubs__list__item">
        <div class="clubs__list__item__header">
          <img :src="getImgPath(club.imgPath)" alt="club_logo" />
          <h3>{{ club.name }}</h3>
        </div>
        <div class="clubs__list__item__divider"></div>
        <div class="clubs__list__item__wrapper">
          <router-link :to="`/${club.name}/page/timeline`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>페이지</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__indent">
          <div class="clubs__list__item__wrapper">
            <router-link :to="`/${club.name}/page/timeline`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>타임라인</router-link>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <router-link :to="`/${club.name}/page/awards`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>수상실적</router-link>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <router-link :to="`/${club.name}/page/members`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>멤버소개</router-link>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <router-link :to="`/${club.name}/page/budgets`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>예산공개</router-link>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <router-link :to="`/${club.name}/page/applicant`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>채용</router-link>
            <div class="clubs__list__item__link__select"></div>
          </div>
        </div>

        <div class="clubs__list__item__wrapper">
          <div class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>커뮤니티</div>
          <div class="clubs__list__item__link__select"></div>
        </div>
        <div class="clubs__list__item__indent">
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 'admin', 'community/attendanceSheet')"><i class="mdi mdi-chevron-right"></i>출석부</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 42, 'community/calendar')"><i class="mdi mdi-chevron-right"></i>캘린더</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 'admin', 'community/editor')"><i class="mdi mdi-chevron-right"></i>사이트편집</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 'admin', 'community/editclub')"><i class="mdi mdi-chevron-right"></i>동아리관리</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 'admin', 'community/members')"><i class="mdi mdi-chevron-right"></i>멤버관리</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 32, 'community/application')"><i class="mdi mdi-chevron-right"></i>채용관리</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
          <div class="clubs__list__item__wrapper">
            <div class="clubs__list__item__link" @click="checkPermission(club, 'admin', 'community/interview')"><i class="mdi mdi-chevron-right"></i>면접관리</div>
            <div class="clubs__list__item__link__select"></div>
          </div>
        </div>

        <div class="clubs__list__item__wrapper">
          <router-link :to="`/${club.name}`" class="clubs__list__item__link"><i class="mdi mdi-chevron-right"></i>사이트</router-link>
          <div class="clubs__list__item__link__select"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Sitemap extends Vue {
  clubs: any[] = [];

  created() {
    this.$store.commit('pushLoading', {
      name: 'GET_ALL_CLUB',
      message: '로그인 중',
    });
    this.$store
      .dispatch('GET_ALL_CLUB')
      .then((clubs) => {
        this.$store.commit('clearLoading', 'GET_ALL_CLUB');
        this.clubs = clubs;
      })
      .catch((err) => {});
  }

  getImgPath(imgPath: string) {
    if (imgPath) return this.$store.state.mainPath + imgPath;
    else return 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg';
  }
  checkPermission(_club: any, permission: any, next: string) {
    this.$store.state.club = _club;
    if (permission == 'admin') {
      if (this.isAdmin) {
        this.$router.push(`${_club.name}/${next}`);
      } else {
        this.$store.commit('showNotice', `권한이 없습니다.`);
      }
    } else {
      if (this.$store.state.club.ranks) {
        let user = this.$store.state.club.members.find((member: any) => {
          if (member.user == this.$store.state.userInformation._id) {
            return this.$router.push(`${_club.name}/${next}`);
          } else {
            return this.$store.commit('showNotice', `권한이 없습니다.`);
          }
        });
        if (
          user &&
          (this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin() ||
            this.$store.state.club.ranks
              .find((rank: any) => rank.id == user.rank)
              .parseInt(permission)
              .indexOf('' + parseInt(permission)) != -1)
        ) {
          return this.$router.push(`${_club.name}/${next}`);
        }
      } else {
        return this.$store.commit('showNotice', `권한이 없습니다.`);
      }
    }
  }

  get getRank() {
    if (this.$store.state.club.name) {
      try {
        return this.$store.state.club.ranks.find((x: any) => this.$store.state.club.members.find((x: any) => x.user == this.$store.state.userInformation._id).rank == x.id).name;
      } catch (e) {
        return '-';
      }
    } else {
      return '-';
    }
  }

  get getUserImage() {
    if (this.$store.state.userInformation.imgPath) return this.$store.state.mainPath + this.$store.state.userInformation.imgPath;
    else return 'https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg';
  }
  get getUserInformation(): any {
    return this.$store.state.userInformation;
  }
  get isAdmin() {
    if (this.$store.state.club.ranks && this.$store.state.userInformation._id) {
      let user = this.$store.state.club.members.find((member: any) => {
        return member.user == this.$store.state.userInformation._id;
      });
      if (user) {
        return this.$store.state.club.ranks.find((rank: any) => rank.id == user.rank).isAdmin;
      } else return false;
    } else return false;
  }
}
</script>

<style>
.clubs__list {
  padding: 0 40px;
  width: 100%;
  user-select: none;
}
.clubs__list__item {
  width: 30%;
  margin: 20px;
  padding: 20px;

  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 20px;
  box-shadow: 0 2px 63px 0 rgba(0, 0, 0, 0.04);
  background-color: white;
}
.darkTheme .clubs__list__item {
  background-color: #282828;
}
.clubs__list__item__header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.clubs__list__item img {
  width: 36px;
  height: 36px;
  border-radius: 100%;

  box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);

  background-color: #f8fbff;
}
.clubs__list__item h1 {
  font-family: AvenirBlack;
  font-size: 30px;
}
.clubs__list__item h3 {
  font-family: NanumSquareB;
  font-size: 24px;
  font-weight: normal;
  color: #202841;

  margin-left: 10px;
}
.darkTheme .clubs__list__item h3 {
  color: white;
}
.clubs__list__item__divider {
  width: 80%;
  height: 1px;
  margin: 8px 0 14px 0;
  border-bottom: 1px solid #9cb1cd;
}
.clubs__list__item__wrapper {
  box-sizing: border-box;
  width: fit-content;
}
.clubs__list__item__link {
  color: #9cb1cd;
  text-decoration: none;
  transition: 0.2s;
  cursor: pointer;
}
.clubs__list__item__wrapper:hover .clubs__list__item__link__select {
  width: 70%;
  opacity: 1;
}
.clubs__list__item__indent .clubs__list__item__wrapper:hover .clubs__list__item__link__select {
  width: 76%;
  opacity: 1;
}
.clubs__list__item__link__select {
  width: 0;
  height: 1px;

  margin-left: 17px;

  border-bottom: 1px solid #9cb1cd;

  opacity: 0;

  transition: 0.3s;
}
.clubs__list__item__indent {
  margin-left: 15px;
}
@media screen and (max-width: 768px) {
  .clubs__list {
    padding: 20px 0;
  }
  .clubs__list__item {
    width: 90%;
  }
}
</style>
