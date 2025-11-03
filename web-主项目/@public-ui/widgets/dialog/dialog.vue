<template>
  <Teleport to="#design-root-view" v-if="isDev || isProd">
    <DialogContent
      :propConfig="propConfig"
      :eventConfig="eventConfig"
      @close="close"
    >
      <slot></slot>
    </DialogContent>
  </Teleport>

  <DialogContent
    v-if="isDevPreview"
    :propConfig="propConfig"
    :eventConfig="eventConfig"
    @close="close"
  >
    <slot></slot>
  </DialogContent>
</template>
<script>
const widgetLabel = "弹窗";
const defaultWidth = 1000;
const defaultHeight = 600;
const widgetDesignFull = true;
const getPropConfig = () => ({
  width: {
    widget: "number",
    value: 600,
  },
  title: {
    widget: "input",
    value: "标题",
  },
  contentText: {
    widget: "textarea",
    value: "",
  },
  cancelButtom: {
    widget: "boolean",
    value: true,
  },
  cancelText: {
    widget: "input",
    value: "取消",
  },
  submitButtom: {
    widget: "boolean",
    value: true,
  },
  submitText: {
    widget: "input",
    value: "确定",
  },
  showDialog: {
    value: true,
  },
});
const getEventConfig = () => ({});
import mixin from "@public-ui/mixin";
import DialogContent from "./dialog-content.vue";
export default {
  widgetLabel,
  defaultWidth,
  defaultHeight,
  widgetDesignFull,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  components: {
    DialogContent,
  },
  data() {
    return {};
  },
  mounted() {
    // 弹窗特殊情况, 创建后隐藏child-wrap div
    let dom = document.querySelector("#childwrap_" + this.widgetId);
    if (dom) dom.style.zIndex = -1;
  },
  methods: {
    close() {
      this.propConfig["showDialog"].value = false;
      this.propConfig["showDialog"]?.closeDialog?.();
    },
  },
};
</script>
