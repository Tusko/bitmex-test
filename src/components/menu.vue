<template>
  <section class="app-header">
    <figure class="app-name">Bitmex-text</figure>
    <nav>
      <router-link to="/" exact>Instruments</router-link>
      <router-link to="/history" exact>Orders History</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  name: "appMenu"
};
</script>

<style lang="scss">
.app-header {
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 20px;
  .app-name {
    font: 700 24px/1 "Roboto";
  }
  nav {
    a {
      text-decoration: none;
      font-weight: 500;
      color: #000;
      &.router-link-active,
      &:hover {
        color: red;
      }
      & + a {
        margin-left: 40px;
      }
    }
  }
}
</style>