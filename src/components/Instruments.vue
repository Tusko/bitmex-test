<template>
  <div class="instruments">
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
          @click="instrumentChooseEvent('order', ins.symbol)"
        >
          <td>
            <div class="instrument-name">
              <i
                class="icon-detailed-price"
                @click.stop="instrumentChooseEvent('trade', ins.symbol)"
              >i</i>
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
const WebSocket = require("isomorphic-ws");
const appSocketIO = new WebSocket(config.socketUrl);
import config from "@/config";

export default {
  name: "Instruments",
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
        this.$set(this, "instruments", response.data);
      })
      .catch(e => {
        this.$notify({
          group: "app",
          type: "error",
          title: "Error",
          text: e.response.data.error.message
        });
      });
  },
  beforeMount() {
    const vm = this;

    appSocketIO.onopen = () => {
      appSocketIO.send(`{"op": "subscribe", "args": "instrument"}`);
    };

    appSocketIO.onmessage = response => {
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
    },
    instrumentChooseEvent(event, value) {
      this.$emit(event, value);
    }
  }
};
</script>

<style lang="scss">
.instruments {
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
