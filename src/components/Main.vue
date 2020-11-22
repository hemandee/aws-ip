<template>
  <div>
    <w-form>
      <w-input
        v-model="inputip"
        label="IP Address"
        :validators="[validators.ip]"
      ></w-input>
      <div class="text-right mt3">
        <w-button :disabled="loading" @click="getIp(inputip)" type="submit"
          >Submit</w-button
        >
      </div>
    </w-form>
    <div v-if="loading">
      <p>{{progressLabel}}</p>
      <w-progress class="ma1" circle="circle" :value="progress" size="5em"
        ><strong>{{ progress }}%</strong></w-progress
      >
    </div>
    <div v-if="selectRange" class="mt3">
      <w-card title="Details" title-class="blue-light5--bg">
        <h2>Service : {{ selectRange.service }}</h2>
        <h2>Region : {{ selectRange.region }}</h2>
        <h2>IP Prefix : {{ selectRange.ip_prefix }}</h2>
      </w-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ipInt from "../utils/ipcheck";
export default {
  name: "Main",
  props: {},

  data() {
    return {
      // ips: {},
      cfips: {},
      // URL : "https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips",
      URL: "https://ip-ranges.amazonaws.com/ip-ranges.json",
      selectRange: null,
      loading: true,
      inputip: "",
      progressLabel : "Loading AWS IPs",
      progress: 0,
      validators: {
        ip: (value) => {
          value = value.trim();
          if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
              value
            )
          ) {
            return true;
          } else {
            return "Invalid IP";
          }
        },
      },
    };
  },
  mounted() {
    this.getCFIPs();
  },
  methods: {
    getCFIPs: function() {
      axios
        .get(this.URL, {
          onDownloadProgress: (event) => {
            this.progress = Math.round((event.loaded * 100) / event.total);
          },
        })
        .then((response) => {
          if (response.status != 200) {
            throw response;
          } else {
            this.cfips = this.filterCFips(response.data);
          }
        })

        .catch((error) => console.log("Error : ", error));
    },
    filterCFips: function(ips) {
      var ipTable = new Map();
      var counter = 0;
      var totalCounter = ips["prefixes"].length;
      this.progress = 0
      this.progressLabel = "Loading Data"
      Object.keys(ips["prefixes"]).filter((key) => {
        var [range, bits = 32] = ips["prefixes"][key]["ip_prefix"].split("/");
        var mask = ~(2 ** (32 - parseInt(bits)) - 1);
        var ipint = this.ipInt(range);
        ips["prefixes"][key]["bits"] = parseInt(bits);
        ips["prefixes"][key]["mask"] = mask;
        ipTable.set(ipint & mask, ips["prefixes"][key]);
        counter = counter + 1;
        this.progress = (counter / totalCounter) * 100;
      });
      this.loading = false;
      return ipTable;
    },
    checkIp: function(address) {
      console.log(address);
    },
    getIp: function(inputVal) {
      var inputInt = this.ipInt(inputVal);
      let counter = 0;
      for (let elem of this.cfips.entries()) {
        if ((inputInt & elem[1].mask) === elem[0]) {
          this.selectRange = elem[1];
          break;
        } else {
          counter = counter + 1;
        }
        this.selectRange = {
          service: "Not Found",
          ip_prefix: "Not Found",
          region : "Not Found"
        }
      }
    },
    ipInt,
  },
};
</script>
