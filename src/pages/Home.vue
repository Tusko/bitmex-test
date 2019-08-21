<template>
  <div class="home">
    <loader v-if="instruments.length === 0" />
    <table v-else>
      <thead>
        <th>Symbol</th>
        <th>Last price</th>
      </thead>
      <tbody>
        <tr v-for="ins in instruments" :key="ins.symbol">
          <td>{{ ins.symbol }}</td>
          <td>{{ ins.lastPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { forEach } from "lodash";

export default {
  name: "home",
  components: {
    loader: () => import("@/components/loader")
  },
  data: () => ({
    instruments: []
  }),
  created() {
    this.$http
      .get("/instrument/active")
      .then(response => {
        this.instruments = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  },
  beforeMount() {
    const vm = this;

    vm.$socket.onopen = () => {
      console.log("Socket connected");
      vm.$socket.send(`{"op": "subscribe", "args": "instrument"}`);
    };

    vm.$socket.onmessage = response => {
      const update = JSON.parse(response.data);
      console.log(update.data);

      forEach(update.data, newobj => {
        console.log(vm.getUIndex(newobj.symbol));
        if (vm.getUIndex(newobj.symbol) === -1) {
          vm.instruments.push(newobj);
        } else {
          vm.instruments[vm.getUIndex(newobj.symbol)] = {
            ...vm.instruments[vm.getUIndex(newobj.symbol)],
            ...newobj
          };
        }
      });
    };
  },
  methods: {
    getUIndex(name) {
      return this.instruments.map(item => item.symbol).indexOf(name); // find index of your object
    }
  }
};
</script>

<style lang="scss">
.home {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  display: flex;
  table {
    border-collapse: collapse;
    width: 100%;
    th {
      letter-spacing: 0.5px;
      border-color: #e12e27;
      background: #e12e27;
      text-align: left;
      color: #fff;
    }
    th,
    td {
      border: 1px solid #f5f5f5;
      padding: 10px;
    }
    tr:hover td {
      background: #f8f8f8;
      cursor: pointer;
    }
  }
}
</style>
