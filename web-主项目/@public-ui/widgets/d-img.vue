<template>
  <div class="self-img">
    <img :src="propConfig['file'].value || propConfig['src'].value" />
  </div>
</template>
<style lang="less">
.self-img {
  display: inline-block;
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
const widgetLabel = "图片";
const defaultWidth = 100;
const defaultHeight = 100;
const getPropConfig = () => ({
  file: {
    widget: "file",
    value: "",
  },
  src: {
    type: "url",
    widget: "textarea",
    placeholder: "图片地址",
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
