import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function getRouteTpl(tpl) {
  /*
    @ is an alias to /src
  */
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${tpl}`);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: getRouteTpl("Home")
    },
    {
      path: "/trade/:symbol",
      name: "tradeRable",
      component: getRouteTpl("Trade")
    },
    {
      path: "/order/:symbol",
      name: "orderForm",
      component: getRouteTpl("OrderCreate")
    },
    {
      path: "/history",
      name: "orderHistory",
      component: getRouteTpl("History")
    }
  ]
});
