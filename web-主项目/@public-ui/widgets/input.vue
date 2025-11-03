<template>
{{propConfig['v-model']}}
  <el-input
    class="self-input"
    :placeholder="propConfig['placeholder'].value"
    :type="propConfig['type'].value"
    :maxlength="propConfig['maxlength'].value"
    :disabled="propConfig['disabled'].value"
    :clearable="propConfig['clearable'].value"
    :prefix-icon="propConfig['prefix-icon'].value"
    :suffix-icon="propConfig['suffix-icon'].value"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-input {
  width: 100%;
  height: 100%;
}
</style>
<script>
const widgetLabel = "输入框";
const defaultWidth = 120;
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
    options: ["string", "paddword"],
    value: "string",
  },
  maxlength: {
    widget: "input",
    value: "",
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
  "suffix-icon": {
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
