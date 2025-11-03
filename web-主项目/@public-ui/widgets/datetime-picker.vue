<template>
  <el-date-picker
    class="self-date-picker"
    :placeholder="propConfig['placeholder'].value"
    :type="propConfig['type'].value"
    :value-format="propConfig['value-format'].value"
    :disabled="propConfig['disabled'].value"
    :clearable="propConfig['clearable'].value"
    :prefix-icon="propConfig['prefix-icon'].value"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-date-picker {
  width: 100% !important;
  height: 100% !important;
}
</style>
<script>
const widgetLabel = "日期时间选择器";
const defaultWidth = 150;
const defaultHeight = 32;
const getPropConfig = () => ({
  "v-model": {
    value: "",
    modelName: "",
  },
  placeholder: {
    widget: "input",
    value: widgetLabel,
  },
  type: {
    widget: "select",
    options: [
      "year",
      "month",
      "date",
      "dates",
      "datetime",
      "week",
      "datetimerange",
      "daterange",
      "monthrange",
    ],
    value: "date",
  },
  "value-format": {
    widget: "input",
    value: "YYYY-MM-DD HH:mm:ss",
  },
  disabled: {
    widget: "boolean",
    value: false,
  },
  clearable: {
    widget: "boolean",
    value: false,
  },
  "prefix-icon": {
    type: "IconName",
    widget: "input",
    placeholder: "Search",
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
  data() {
    return {};
  },
};
</script>
