<template>
  <div class="self-div">
    <slot></slot>
  </div>
</template>
<style lang="less">
.self-div {
  display: inline-block;
  width: 100%;
  height: 100%;
  // border: 1px solid rgb(227, 235, 6);
}
</style>
<script>
const widgetLabel = "DIV";
const defaultWidth = 200;
const defaultHeight = 100;
const getPropConfig = () => ({});
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
