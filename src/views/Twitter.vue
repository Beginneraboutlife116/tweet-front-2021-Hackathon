<template>
  <div class="twitter-container">
    <router-view @after-toggle-follow="afterToggleFollow"/>
    <Top :to-change-follow-status="toChangeFollowStatus"/>
  </div>
</template>

<script>
import Top from '../components/Top.vue'
export default {
  components: {
    Top
  },
  data () {
    return {
      toChangeFollowStatus: []
    }
  },
  methods: {
    afterToggleFollow (payload) {
      this.toChangeFollowStatus = payload
    }
  }
}
</script>

<style lang="scss">
.twitter-container {
  flex: calc(100% - 26.25%);
  display: grid;
  grid-template-columns: 1fr calc( 462 / 1062 * 100% );
}
</style>
