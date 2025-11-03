<template>
  <el-input
    class="self-input-textarea"
    type="textarea"
    :placeholder="propConfig['placeholder'].value"
    :rows="propConfig['rows'].value"
    :maxlength="propConfig['maxlength'].value"
    :disabled="propConfig['disabled'].value"
    :clearable="propConfig['clearable'].value"
    :prefix-icon="propConfig['prefix-icon'].value"
    :suffix-icon="propConfig['suffix-icon'].value"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-input-textarea {
  width: 100%;
  height: 100%;
}
</style>
<script>
const widgetLabel = "多行入框";
const defaultWidth = 150;
const defaultHeight = 75;
const getPropConfig = () => ({
  "v-model": {
    value: "",
    modelName: "",
  },
  placeholder: {
    widget: "input",
    value: widgetLabel,
  },
  rows: {
    widget: "input",
    value: "3",
  },
  maxlength: {
    widget: "number",
    value: "",
  },
  autosize: {
    widget: "boolean",
    value: false,
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
