<template>
  <div class="home">
    <section class="home-grid">
      <instruments @trade="tradeChosenEv" @order="createOrderEv" />
      <trade v-if="tradeSymbol" :symbol="tradeSymbol" @clear="tradeChosenEv" />
      <order-create
        v-if="orderSymbol"
        :key="orderSymbol"
        :symbol="orderSymbol"
        @clear="createOrderEv"
      />
    </section>
    <history />
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    tradeSymbol: null,
    orderSymbol: null
  }),
  components: {
    instruments: () => import("@/components/Instruments"),
    trade: () => import("@/components/Trade"),
    history: () => import("@/components/History"),
    "order-create": () => import("@/components/OrderCreate")
  },
  methods: {
    tradeChosenEv(e) {
      this.$set(this, "tradeSymbol", e);
      this.$set(this, "orderSymbol", null);
    },
    createOrderEv(e) {
      this.$set(this, "orderSymbol", this.orderSymbol == e ? null : e);
      this.$set(this, "tradeSymbol", null);
    }
  }
};
</script>

<style lang="scss">
.home {
  &-grid {
    justify-content: space-between;
    align-items: flex-start;
    display: flex;
  }
}
</style>