<template>
  <div class="self-table">
    <el-table
      style="width: 100%"
      :border="propConfig['border'].value"
      :fit="propConfig['fit'].value"
      :show-header="propConfig['show-header'].value"
      :highlight-current-row="propConfig['highlight-current-row'].value"
      :empty-text="propConfig['empty-text'].value"
      :default-expand-all="propConfig['default-expand-all'].value"
    >
      <template v-if="propConfig['columns']?.value">
        <SelfTableColumn
          v-for="(item, index) in propConfig['columns'].value"
          :key="index"
          :config="item"
        >
        </SelfTableColumn>
      </template>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="50" />
  </div>
</template>
<style lang="less">
.self-table {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .el-table {
    flex: 1;
    overflow: hidden;
  }
  .el-pagination {
    flex: 0 0 auto;
    align-self: end;
  }
}
</style>
<script>
import SelfTableColumn from "./table-column.vue";
const widgetLabel = "表格";
const defaultWidth = 510;
const defaultHeight = 300;
const getPropConfig = () => ({
  border: {
    widget: "boolean",
    value: false,
  },
  fit: {
    widget: "boolean",
    value: true,
  },
  "show-header": {
    widget: "boolean",
    value: true,
  },
  "highlight-current-row": {
    widget: "boolean",
    value: false,
  },
  "empty-text": {
    widget: "input",
    value: "暂无数据",
  },
  "default-expand-all": {
    widget: "boolean",
    value: false,
  },
  columns: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    type: "selection",
    width: 50
  },
  {
    label: "公司",
    prop: "company",
    minWidth: 80
  },
  {
    label: "创建时间",
    render: (row, h, elementPlus) => row.createTime,
    minWidth: 110
  },
  {
    label: "预算",
    headerAlign: "center",
    children: [
      {
        label: "上半年",
        prop: "money1",
        width: 80
      },
      {
        label: "下半年",
        prop: "money2",
        width: 80
      }
    ]
  },
  {
    label: "操作",
    width: 110,
    render: (row, h, elementPlus) => h(elementPlus.ElButton, {size: "small", type: "primary"}, "预览" + row.company)
  }
]`;
      let value = new Function("return" + code)();
      return {
        value,
        code,
      };
    })(),
  },
});
const getEventConfig = () => ({});
import mixin from "@public-ui/mixin";
export default {
  widgetLabel,
  defaultWidth,
  defaultHeight,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  components: {
    SelfTableColumn,
  },
  data() {
    return {
      data: [
        {
          company: "adidas",
          createTime: "2020-12-01",
          money1: "1231",
          money2: "4567",
        },
      ],
    };
  },
};
</script>
