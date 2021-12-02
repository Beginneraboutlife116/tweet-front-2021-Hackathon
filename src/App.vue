<template>
  <div id="app">
    <Sidebar />
    <router-view />
    <!-- 切換sign-in, sign-up, admin-sign-in, tweets -->
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>
