<template>
  <section class="adminUsers">
    <header class="adminUsers-header">使用者列表</header>
    <Spinner v-if="isLoading" />
    <main class="cards" v-else>
      <div class="card" v-for="user in users" :key="user.id">
        <div class="card__cover">
          <img :src="user.cover || 'https://fakeimg.pl/600x200/?text=Add%20Your%20Cover'" alt="" class="card__cover-img">
        </div>
        <div class="card__intro">
          <div class="card__avatar">
            <img :src="user.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="card__avatar-img">
          </div>
          <div class="card__description">
            <div class="card__description-person">
              <p class="card__description-name"> {{user.name}} </p>
              <p class="card__description-account">@{{user.account}}</p>
            </div>
            <p class="card__counts">
              <span class="card__counts-tweets">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5576 2.80254L12.3726 2.79004H12.3701C6.90262 2.79004 2.62012 7.07379 2.62012 12.5425C2.62012 17.665 6.60262 21.55 11.9514 21.755V26.54C11.9514 26.675 12.0064 26.8975 12.1014 27.0438C12.2789 27.325 12.5814 27.4775 12.8914 27.4775C13.0639 27.4775 13.2376 27.43 13.3939 27.33C13.7239 27.12 21.4851 22.155 23.5039 20.4475C25.8814 18.435 27.3039 15.485 27.3076 12.5575V12.5363C27.3001 7.07754 23.0201 2.80254 17.5576 2.80129V2.80254ZM22.2914 19.0175C20.8739 20.2175 16.2139 23.2738 13.8264 24.8213V20.8375C13.8264 20.32 13.4076 19.9 12.8889 19.9H12.3939C7.81887 19.9 4.49637 16.805 4.49637 12.5425C4.49637 8.12504 7.95637 4.66504 12.3714 4.66504L17.5551 4.67754H17.5576C21.9726 4.67754 25.4326 8.13504 25.4351 12.5475C25.4314 14.935 24.2576 17.3525 22.2926 19.0175H22.2914Z" fill="#657786"/>
                </svg>
                <strong> {{ user.tweetCounts }} </strong>
              </span>
              <span class="card__counts-likes">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 27.0473H14.9825C11.7537 26.9873 2.4375 18.5698 2.4375 10.5973C2.4375 6.76728 5.59375 3.40479 9.19125 3.40479C12.0537 3.40479 13.9787 5.37979 14.9987 6.81729C16.0162 5.38229 17.9412 3.40479 20.805 3.40479C24.405 3.40479 27.56 6.76729 27.56 10.5985C27.56 18.5685 18.2425 26.986 15.0137 27.0448H15V27.0473ZM9.1925 5.28104C6.5925 5.28104 4.31375 7.76603 4.31375 10.5998C4.31375 17.7748 13.1062 25.0948 15.0012 25.1723C16.8987 25.0948 25.6887 17.776 25.6887 10.5998C25.6887 7.76603 23.41 5.28104 20.81 5.28104C17.65 5.28104 15.885 8.95104 15.87 8.98729C15.5825 9.68979 14.425 9.68979 14.1362 8.98729C14.1187 8.94979 12.355 5.28104 9.19375 5.28104H9.1925Z" fill="#657786"/>
                </svg>
                <strong> {{ user.likeCounts }} </strong>
              </span>
            </p>
            <p class="card__follow">
              <span class="card__follow-following">
                <strong> {{ user.followships.followingCounts }} 個</strong><span>跟隨中</span>
              </span>
              <span class="card__follow-follower">
                <strong> {{ user.followships.followerCounts }} 位</strong><span>跟隨者</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { Toast } from './../mixins/helpers'
import adminAPI from './../apis/admin'
import Spinner from './../components/Spinner.vue'

export default {
  name: 'AdminUser',
  components: {
    Spinner
  },
  data () {
    return {
      users: [],
      isLoading: true
    }
  },
  methods: {
    async fetchAllUsers () {
      try {
        const { data } = await adminAPI.getUsers()
        this.users = data.filter(data => data.account !== 'root')
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法獲取資料，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchAllUsers()
  }
}
</script>

<style lang="scss">
.adminUsers {
  flex: 1;
  height: 100vh;
  border-left: 1px solid var(--border-color);
  &-header {
    padding: 1.5rem 0 1.5rem 2.6rem;
    border-bottom: 1px solid var(--border-color);
    font-weight: bold;
  }
}
.cards {
  height: 100vh;
  overflow: scroll;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 24.5rem);
  grid-auto-flow: row;
  gap: 1.5rem;
}

.card {
  background-color: var(--card-bg-color);
  aspect-ratio: calc(245/314);
  border-radius: 0 0 1rem 1rem;
  position: relative;
  &__cover {
    background-color: #c4c4c4;
    height: 45%;
    border-radius: 1rem 1rem 0 0;
    &-img {
      border-radius: 1rem 1rem 0 0;
      object-fit: cover;
      object-position: center;
    }
  }
  &__avatar {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    position: absolute;
    border: 0.4rem solid white;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: grid;
    place-items: center;
    &-img {
      object-fit: cover;
    }
  }
  &__description {
    text-align: center;
    margin-top: 3.5rem;
    overflow-x: scroll;
    &-name {
      font-size: $font-md;
      line-height: 2.2rem;
      font-weight: 900;
    }
    &-account {
      color: var(--label-color);
    }
    &-person {
      width: 60%;
      margin: 0 auto;
      overflow-x: scroll;
      margin-bottom: 0.5rem;
    }
  }
  &__counts {
    display: flex;
    justify-content: center;
    &-tweets,
    &-likes {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      font-size: $font-md;
      line-height: $font-md;
      & > strong {
        line-height: $font-md;
      }
    }
    &-tweets {
      margin-right: 1.5rem;
    }
  }
  &__follow {
    &-following,
    &-follower {
      display: inline-block;
      margin: 0.5rem;
      & > span {
        color: var(--label-color);
      }
    }
  }
}
</style>
