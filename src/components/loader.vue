<template>
  <transition name="fade">
    <div class="loader">
      <h3>Loading</h3>
      <img src="https://arsmoon.com/brand-wp-admin/spin.php?color=e12e27" alt="Loader" />
    </div>
  </transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loader {
  background: rgba(255, 255, 255, 0.95);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #e12e27;
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  h3 {
    text-transform: uppercase;
  }
  img {
    width: 75px;
  }
}
</style>