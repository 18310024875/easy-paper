<template>
  <div class="self-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(el, index) in propConfig['options'].value"
        :key="index"
      >
        <a
          v-if="el.cover"
          @click="to(el)"
          :style="{ cursor: el.path ? 'pointer' : '' }"
          >{{ el.label }}</a
        >
        <span
          v-else
          @click="to(el)"
          :style="{ cursor: el.path ? 'pointer' : '' }"
          >{{ el.label }}</span
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="less">
.self-breadcrumb {
  width: 100%;
  height: 100%;
}
</style>
<script>
const widgetLabel = "面包屑";
const defaultWidth = 280;
const defaultHeight = 50;
const getPropConfig = () => ({
  options: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "首页",
    cover: true,
    path: "/a"
  },
  {
    label: "活动管理",
    cover: true,
    path: "/b"
  },
  {
    label: "活动管理",
    path: "/c"
  },
  {
    label: "活动详情",
    value: "path3"
  }
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
  methods: {
    to(el) {
      if (el.path && this.$router) this.$router.push(el.path);
    },
  },
};
</script>
