<template>
  <section class="order-history">
    <loader v-if="rows.length === 0" />
    <table v-else>
      <thead>
        <th>Order ID</th>
        <th>Symbol</th>
        <th>Quantity</th>
        <th>Timestamp</th>
        <th>Side type</th>
        <th>Price</th>
        <th>Order Status</th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td>{{ row.orderID }}</td>
          <td>{{ row.symbol }}</td>
          <td>{{ row.orderQty }}</td>
          <td>{{ new Date(row.timestamp) | date('DD.MM.YYYY HH:mm:ss') }}</td>
          <td>{{ row.side }}</td>
          <td>{{ row.price }}</td>
          <td>{{ row.ordStatus }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { apiAuthRequest } from "@/utils";
import { dateFilter } from "vue-date-fns"; // https://date-fns.org/docs/Getting-Started

export default {
  name: "orderHistory",
  components: {
    loader: () => import("@/components/loader")
  },
  filters: {
    date: dateFilter
  },
  data: () => ({
    rows: []
  }),

  created() {
    apiAuthRequest("GET", "/order")
      .then(response => {
        this.$set(this, "rows", response.data);
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
};
</script>