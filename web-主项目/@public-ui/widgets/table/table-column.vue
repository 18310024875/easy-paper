<template>
  <el-table-column
    v-if="config.render"
    key="1"
    v-bind="config"
    :formatter="
      (row, column, cellValue, index) =>
        selfRender(config, row, column, cellValue, index)
    "
  ></el-table-column>

  <el-table-column v-else key="2" v-bind="config">
    <template v-if="config?.children?.length">
      <SelfTableColumn
        v-for="(item, index) in config.children"
        :key="index"
        :config="item"
      >
      </SelfTableColumn>
    </template>
  </el-table-column>
</template>
<script>
import { h } from "vue";
export default {
  name: "SelfTableColumn",
  props: {
    config: { type: String },
  },
  methods: {
    selfRender(item, row, column, cellValue, index) {
      return item.render(row, h, this.elementPlus);
    },
  },
};
</script>
