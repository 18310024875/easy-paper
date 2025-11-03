<template>
  <div
    class="self-text"
    :style="{
      fontSize: propConfig['fontSize'].value + 'px',
      lineHeight: propConfig['lineHeight'].value + 'px',
      textIndent: propConfig['textIndent'].value + 'px',
      color: propConfig['color'].value,
      backgroundColor: propConfig['backgroundColor'].value,
      fontWeight: propConfig['fontWeight'].value,
      textAlign: propConfig['textAlign'].value,
    }"
  >
    {{ propConfig["contentText"].value }}
  </div>
</template>
<style lang="less">
.self-text {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
<script>
const widgetLabel = "文字";
const defaultWidth = 100;
const defaultHeight = 32;
const getPropConfig = () => ({
  contentText: {
    widget: "textarea",
    value: widgetLabel,
  },
  fontSize: {
    widget: "number",
    value: "14",
  },
  lineHeight: {
    widget: "number",
    value: "28",
  },
  textIndent: {
    widget: "number",
    value: "0",
  },
  color: {
    widget: "input",
    value: "",
  },
  backgroundColor: {
    widget: "input",
    value: "",
  },
  fontWeight: {
    widget: "select",
    options: ["100", "500", "900"],
    value: "string",
  },
  textAlign: {
    widget: "select",
    options: ["left", "center", "right"],
    value: "string",
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
