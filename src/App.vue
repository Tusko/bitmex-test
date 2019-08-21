<template>
  <div id="app">
    <app-menu />
    <router-view />
    <notifications group="app" />
  </div>
</template>

<style lang="scss" src="./assets/style.scss"></style>

<script>
export default {
  name: "App",
  components: {
    "app-menu": () => import("./components/menu")
  }
};
</script>