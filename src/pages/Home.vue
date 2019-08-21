<template>
  <div class="home">
    <loader v-if="instruments.length === 0" />
    <table v-else>
      <thead>
        <th>Symbol</th>
        <th>Last price</th>
      </thead>
      <tbody>
        <tr
          v-for="ins in instruments"
          :key="ins.symbol"
          @click="$router.push('/order/' + ins.symbol)"
        >
          <td>
            <div class="instrument-name">
              <i class="icon-detailed-price" @click.stop="$router.push('/trade/' + ins.symbol)">i</i>
              <span>{{ ins.symbol }}</span>
            </div>
          </td>
          <td>{{ ins.lastPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { forEach, has } from "lodash";

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
      forEach(update.data, newobj => {
        if (!has(newobj, "lastPrice")) return; //prevent updating if not has lastPrice key
        const inx = vm.getUIndex(newobj.symbol);

        if (inx === -1) {
          vm.instruments.push(newobj);
        } else {
          vm.instruments[inx].lastPrice = newobj.lastPrice;
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
  tr {
    cursor: pointer;
    &:hover td {
      background: #333;
      color: #fff;
    }
  }
}

.instrument-name {
  align-items: center;
  display: flex;
  i {
    font: normal 700 18px/24px "Roboto";
    border-radius: 50%;
    text-align: center;
    margin-right: 20px;
    background: red;
    cursor: pointer;
    color: #fff;
    width: 24px;
  }
}
</style>
