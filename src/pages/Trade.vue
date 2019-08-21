<template>
  <div class="trade-details">
    <header class="app-title">
      <span @click="$router.go(-1)">&#8249;</span>
      <h1>Trade for {{ symbol }}</h1>
    </header>
    <loader v-if="rows.length === 0" />
    <table v-else>
      <thead>
        <th>Time</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Gross Value</th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td>{{ new Date(row.timestamp) | date('DD.MM.YYYY HH:mm:ss') }}</td>
          <td>{{ row.open }}</td>
          <td>{{ row.high }}</td>
          <td>{{ row.low }}</td>
          <td>{{ row.close }}</td>
          <td>{{ row.volume }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { has } from "lodash";
import { dateFilter } from "vue-date-fns"; // https://date-fns.org/docs/Getting-Started

export default {
  name: "trade",
  components: {
    loader: () => import("@/components/loader")
  },
  filters: {
    date: dateFilter
  },
  data: () => ({
    symbol: null,
    rows: []
  }),
  created() {
    this.$set(this, "symbol", this.$route.params.symbol);

    this.$http
      .get(
        "/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=" +
          this.symbol
      )
      .then(response => {
        this.rows = response.data;
      })
      .catch(e => {
        this.$notify({
          group: "app",
          type: "error",
          title: "Error",
          text: e.message
        });
      });
  },
  beforeMount() {
    const vm = this;

    vm.$socket.onopen = () => {
      console.log("Socket connected");
      vm.$socket.send(
        `{"op": "subscribe", "args": "tradeBin1m:` + this.symbol + `"}`
      );
    };

    vm.$socket.onmessage = response => {
      const update = JSON.parse(response.data);
      if (has(update, "data") && update.action === "insert") {
        const updatedRows = [...update.data, ...vm.rows];
        vm.rows = updatedRows.splice(0, 99);
      }
    };
  }
};
</script>

<style lang="scss">
.trade-details {
  header {
    align-items: center;
    display: flex;
    span {
      cursor: pointer;
      font-size: 40px;
      margin: 0 20px;
      &:hover {
        color: red;
      }
    }
  }
}
</style>