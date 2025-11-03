<template>
  <el-cascader
    class="self-cascader"
    :placeholder="propConfig['placeholder'].value"
    :disabled="propConfig['disabled'].value"
    :clearable="propConfig['clearable'].value"
    :filterable="propConfig['filterable'].value"
    :options="propConfig['options'].value"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-cascader {
  width: 100%;
  height: 100%;
}
</style>
<script>
const widgetLabel = "级联选择器";
const defaultWidth = 120;
const defaultHeight = 32;
const getPropConfig = () => ({
  "v-model": {
    value: "",
  },
  "v-model-name": {
    widget: "input-model",
    value: "",
  },
  placeholder: {
    widget: "input",
    value: widgetLabel,
  },
  disabled: {
    widget: "boolean",
    value: false,
  },
  clearable: {
    widget: "boolean",
    value: false,
  },
  filterable: {
    widget: "boolean",
    value: false,
  },
  options: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "选项1",
    value: "value1",
    children: [
      {
        label: "选项1-1",
        value: "value1-1",
      },
    ],
  },
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
  data() {
    return {};
  },
};
</script>
