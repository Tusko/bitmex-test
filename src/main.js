import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import config from "./config";
const WebSocket = require("isomorphic-ws");

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: config.apiUrl,
  headers: { "Access-Control-Allow-Origin": "*" }
});

Vue.prototype.$socket = new WebSocket(config.socketUrl);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
