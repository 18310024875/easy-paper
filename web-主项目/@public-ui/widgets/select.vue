<template>
  <el-select
    class="self-select"
    :placeholder="propConfig['placeholder'].value"
    :multiple="propConfig['multiple'].value"
    :disabled="propConfig['disabled'].value"
    :clearable="propConfig['clearable'].value"
    :filterable="propConfig['filterable'].value"
    :loading="propConfig['loading'].value"
    :prefix-icon="propConfig['prefix-icon'].value"
    :suffix-icon="propConfig['suffix-icon'].value"
    :options="propConfig['options'].value"
    v-model="propConfig['v-model'].value"
  />
</template>
<style lang="less">
.self-select {
  width: 100%;
  height: 100%;
  .el-select__wrapper {
    height: 100%;
  }
}
</style>
<script>
const widgetLabel = "下拉框";
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
  multiple: {
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
  filterable: {
    widget: "boolean",
    value: false,
  },
  loading: {
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
  "bind-ajax": {
    type: "url",
    widget: "input",
    placeholder: "http://*****",
  },
  options: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "选项1",
    value: "value1",
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
  created() {
    if (this.propConfig["bind-ajax"]?.value) {
      this.request
        .get(this.propConfig["bind-ajax"].value)
        .then((res) => {
          let options = res.data.map((v) => ({
            label: v,
            value: v,
          }));
          this.propConfig["options"].value = options;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
</script>
