<template>
  <div class="profile-container">
    <header class="profile__header">
      <div class="profile__header__title">
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9995 10.9999H6.4135L10.7065 6.70687C11.0965 6.31687 11.0965 5.68388 10.7065 5.29288C10.3165 4.90188 9.6835 4.90288 9.2925 5.29288L3.2925 11.2929C2.9025 11.6829 2.9025 12.3159 3.2925 12.7069L9.2925 18.7069C9.4875 18.9019 9.7425 18.9999 9.9995 18.9999C10.2565 18.9999 10.5115 18.9019 10.7065 18.7069C11.0965 18.3169 11.0965 17.6839 10.7065 17.2929L6.4135 12.9999H18.9995C19.5525 12.9999 19.9995 12.5529 19.9995 11.9999C19.9995 11.4469 19.5525 10.9999 18.9995 10.9999Z"
            fill="black"
          />
        </svg>
        <div class="profile__header__title__wrapper">
          <p class="name">{{ profile.name }}</p>
          <p class="tweetCounts">{{ profile.tweetCounts }} 推文</p>
        </div>
      </div>
    </header>
    <div class="main__profile">
      <div class="main__profile__img">
        <img
          class="main__profile__img--cover"
          :src="profile.avatar || 'https://fakeimg.pl/600x200/'"
          alt="avatar"
          aria-label="avatar"
        />
        <img
          class="main__profile__img--avatar"
          :src="profile.avatar || 'https://fakeimg.pl/140/'"
          alt="avatar"
          aria-label="avatar"
        />
      </div>
      <div class="main__profile__info">
        <button v-if="currentUser.id === profile.id" class="main__profile__info__btn--edit">編輯個人資料</button>
        <button v-if="currentUser.id !== profile.id" class="main__profile__info__btn--follow" :class="{active: profile.isFollowing }" @click.stop.prevent="toggleFollow(profile.id)"> {{profile.isFollowing ? '正在跟隨' : '跟隨'}}</button>
        <p class="name">{{ profile.name }}</p>
        <p class="account">@{{ profile.account }}</p>
        <p class="introduction">{{ profile.introduction }}</p>
      </div>
      <div class="main__profile__data">
        <div class="main__profile__data--follow">
          <span class="count">{{ profile.followship.followingCounts }} 個</span>
          <span class="text">跟隨中</span>
        </div>
        <div class="main__profile__data--follow">
          <span class="count">{{ profile.followship.followerCounts }} 位</span>
          <span class="text">跟隨者</span>
        </div>
      </div>
      <div class="main__profile__tabs">
        <router-link :to="{ name: 'profile-tweets'}" class="main__profile__tabs--link"><p>推文</p></router-link>
        <router-link :to="{ name: 'profile-replies'}" class="main__profile__tabs--link"><p>推文與回覆</p></router-link>
        <router-link :to="{ name: 'profile-likes'}" class="main__profile__tabs--link"><p>喜歡的內容</p></router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
const dummyData = {
  profile: {
    id: 1,
    account: 'account1',
    name: 'John Doe',
    email: 'email@email.com',
    introduction:
      'Amet Lorem ipsum dolor sit amet Lorem ipsum dolor',
    avatar: null,
    cover: null,
    role: 'user',
    tweetCounts: 10,
    isFollowing: true,
    followship: {
      followerCounts: 1,
      followingCounts: 2
    }
  }
}

export default {
  name: 'UserProfile',
  data () {
    return {
      profile: {}
    }
  },
  created () {
    this.fetchProfile()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchProfile () {
      this.profile = {
        ...dummyData.profile
      }
    },
    toggleFollow (UserId) {
      // TODO: 將資料傳給後端
      this.profile.isFollowing = !this.profile.isFollowing
      console.log(UserId)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@900&display=swap');

.router-link-exact-active.main__profile__tabs--link {
    color: var(--main-color);
    border-bottom: 2px solid var(--main-color);
}

.profile-container {
  grid-column: 1;
  height: 100vh;
  border-inline: 1px solid var(--border-color);
  overflow: scroll;
}

.profile__header {
  &__title {
    display: flex;
    align-items: center;
    padding: 0.6rem 0 0.7rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    &__wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 4rem;
      .name {
        line-height: 2.75rem;
        font-weight: 900;
        font-size: $font-xl;
      }
      .tweetCounts {
        color: var(--label-color);
        font-size: $font-xs;
      }
    }
  }
}

.main__profile {
  &__img {
    position: relative;
    &--cover {
      width: 100%;
      height: 20rem;
      object-fit: cover;
    }
    &--avatar {
      position: absolute;
      bottom: -50%;
      left: 1.5rem;
      transform: translateY(-25%);
      border-radius: 50%;
      max-width: 14rem;
      border: 4px solid var(--basic-color);
      object-fit: cover;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem 1rem 1.5rem;
    &__btn--edit{
      @extend %buttonStyle;
      align-self: flex-end;
      height: 3.5rem;
      width: 12rem;
      font-size: $font-md;
    }
    &__btn--follow {
      @extend %buttonStyle;
      align-self: flex-end;
      height: 3.5rem;
      width: 9rem;
      font-size: $font-md;
    }
    .name {
      margin-top: 2.4rem; //按鈕跟名字間距
      font-weight: 900;
      font-size: $font-xl;
    }
    .account {
      font-weight: 500;
      font-size: $font-md;
      color: var(--label-color)
    }
    .introduction {
      margin-top: 1rem;
      font-size: $font-sm;
    }
  }
  &__data {
    display: flex;
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    &--follow {
      font-size: $font-sm;
      margin-right: 2rem;
      .count {
        font-weight:500;
      }
      .text {
        font-weight:400;
        color: var(--label-color);
      }
    }
  }
  &__tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    &--link {
      height: 5.2rem;
      width: 13rem;
      line-height: 5.2rem;
      font-weight: 500;
      font-size: $font-md;
      color: var(--label-color);
      text-align: center;
      cursor: pointer;
      &:hover {
         color: var(--main-color);
         border-bottom: 2px solid var(--main-color);
      }
    }
  }
}
</style>
