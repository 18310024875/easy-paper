<template>
  <el-input-number
    class="self-input-number"
    :placeholder="propConfig['placeholder'].value"
    :disabled="propConfig['disabled'].value"
    :max="Number(propConfig['max'].value) ? propConfig['max'].value : Infinity"
    :min="Number(propConfig['min'].value) ? propConfig['min'].value : -Infinity"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-input-number {
  width: 100% !important;
  height: 100%;
}
</style>
<script>
const widgetLabel = "数字输入框";
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
  disabled: {
    widget: "boolean",
    value: false,
  },
  max: {
    widget: "input",
    value: "",
  },
  min: {
    widget: "input",
    value: "",
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
