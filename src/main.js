import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

// vue-socket.io範例
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://metinseylan.com:1992',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '//' }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
