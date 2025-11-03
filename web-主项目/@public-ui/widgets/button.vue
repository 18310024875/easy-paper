<template>
  <el-button
    class="self-button"
    :type="propConfig['type'].value"
    :text="propConfig['text'].value"
    :plain="propConfig['plain'].value"
    :loading="propConfig['loading'].value"
    :disabled="propConfig['disabled'].value"
    :icon="propConfig['icon'].value"
    @click="(...vals) => handleEvent('click', ...vals)"
  >
    <span>{{ propConfig["contentText"].value }}</span>
  </el-button>
</template>
<style lang="less">
.self-button {
  width: 100%;
  height: 100% !important;
}
</style>
<script>
const widgetLabel = "按钮";
const defaultWidth = 60;
const defaultHeight = 32;
const getPropConfig = () => ({
  contentText: {
    widget: "input",
    value: widgetLabel,
  },
  type: {
    options: ["primary", "success", "warning", "danger", "info"],
    value: "primary",
  },
  text: {
    widget: "boolean",
    value: false,
  },
  plain: {
    widget: "boolean",
    value: false,
  },
  loading: {
    widget: "boolean",
    value: false,
  },
  disabled: {
    widget: "boolean",
    value: false,
  },
  icon: {
    type: "IconName",
    widget: "input",
    placeholder: "Search",
  },
});
const getEventConfig = () => ({
  click: {
    widget: "function",
    code: `console.log(this)`,
  },
});
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
