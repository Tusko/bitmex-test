<template>
  <div class="trade-details">
    <header class="app-title">
      <span @click="$router.go(-1)">&#8249;</span>
      <h1>Create Order: {{ form.symbol }}</h1>
    </header>
    <loader v-if="!form.symbol" />
    <form v-else novalidate @submit.prevent="createOrder">
      <p class="form-row form-checkbox">
        <span>Buy</span>
        <input type="checkbox" v-model="orderCheck" />
        <span>Sell</span>
      </p>
      <p class="form-row">
        <label>Symbol</label>
        <input type="text" readonly disabled v-model="form.symbol" />
      </p>
      <p class="form-row">
        <label>
          Quantity
          <small>(min 1)</small>
        </label>
        <input type="number" min="1" step="1" v-model="form.orderQty" />
      </p>
      <div class="form-row">
        <button class="button">{{ form.side }} Now</button>
      </div>
    </form>
  </div>
</template>

<style src="@/assets/forms.scss" lang="scss"></style>

<style lang="scss">
form {
  max-width: 400px;
  margin: 0 auto;
}
</style>

<script>
import { apiAuthRequest } from "@/utils";
export default {
  name: "createOrder",
  components: {
    loader: () => import("@/components/loader")
  },
  data: () => ({
    orderCheck: false,
    form: {
      ordType: "Market",
      symbol: null,
      orderQty: 1,
      side: "Buy"
    }
  }),
  created() {
    this.$set(this.form, "symbol", this.$route.params.symbol);
  },
  watch: {
    orderCheck: function(val) {
      this.$set(this.form, "side", val ? "Sell" : "Buy");
    },
    "form.orderQty": function(val) {
      this.$set(this.form, "orderQty", +val);
    }
  },
  methods: {
    createOrder(e) {
      e.preventDefault();

      apiAuthRequest("POST", "/order", this.form)
        .then(response => {
          this.$notify({
            group: "app",
            type: "success",
            title: "Success!",
            text: "Jobs done. Redirection..."
          });
          this.$router.push({ path: "/history" });
        })
        .catch(e => {
          this.$notify({
            group: "app",
            type: "error",
            title: "Error",
            text: e.message
          });
        });
    }
  }
};
</script>