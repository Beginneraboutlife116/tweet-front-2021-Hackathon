<template>
  <div class="main-container">
    <Sidebar />
    <router-view />
    <NewTweet />
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'
import NewTweet from './../components/NewTweet.vue'

export default {
  name: 'Main',
  components: {
    Sidebar,
    NewTweet
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
}
</style>
