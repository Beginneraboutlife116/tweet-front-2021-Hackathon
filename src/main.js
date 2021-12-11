/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";

import SocketIO from "socket.io-client";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: SocketIO("http://5149-81-31-74-124.ngrok.io"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  sockets: {
    connect: function () {
      console.log("Connected");
    },
    disconnect: function () {
      console.log('disconnected');
    }
  },
  router,
  store,
  store,
  render: (h) => h(App),
}).$mount("#app");
