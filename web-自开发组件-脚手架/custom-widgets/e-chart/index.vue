<template>
  <div ref="dom" style="width: 300px; height: 200px"></div>
</template>
<script>
import { init } from "echarts";

const option = {
  series: [
    {
      tooltip: {
        trigger: "item",
      },
      type: "pie",
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

export default {
  mounted() {
    const chart = init(this.$refs.dom);
    chart.setOption(option);
  },
};
</script>
