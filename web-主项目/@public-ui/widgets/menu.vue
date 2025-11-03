<template>
  <div class="self-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :mode="propConfig['mode'].value"
      :menu-trigger="propConfig['menu-trigger'].value"
    >
      <!-- 1 -->
      <template v-for="(el, index) in propConfig['options'].value" :key="index">
        <!-- 2 -->
        <el-sub-menu v-if="el?.children?.length" :index="el.value">
          <template #title>
            <el-icon :size="20" v-if="el.icon">
              <component :is="el.icon" />
            </el-icon>
            {{ el.label }}
          </template>
          <template
            v-for="(el2, index2) in el.children"
            :key="index + '-' + index2"
          >
            <el-sub-menu v-if="el2?.children?.length" :index="el2.value">
              <template #title>
                <el-icon :size="20" v-if="el2.icon">
                  <component :is="el2.icon" />
                </el-icon>
                {{ el2.label }}
              </template>
              <!-- 3 -->
              <el-menu-item
                v-for="(el3, index3) in el2.children"
                :key="index + '-' + index2 + '-' + index3"
                :index="el3.value"
              >
                <el-icon :size="20" v-if="el3.icon">
                  <component :is="el3.icon" />
                </el-icon>
                {{ el3.label }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="el2.value">
              <el-icon :size="20" v-if="el2.icon">
                <component :is="el2.icon" />
              </el-icon>
              {{ el2.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="el.value">
          <el-icon :size="20" v-if="el.icon">
            <component :is="el.icon" />
          </el-icon>
          <template #title>{{ el.label }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<style lang="less">
.self-menu {
  width: 100%;
  height: 100%;
  overflow: auto;
  .el-menu {
    height: 100%;
  }
}

</style>
<script>
const widgetLabel = "菜单";
const defaultWidth = 600;
const defaultHeight = 300;
const getPropConfig = () => ({
  mode: {
    widget: "select",
    options: ["horizontal ", "vertical"],
    value: "horizontal",
  },
  "menu-trigger": {
    widget: "select",
    options: ["click ", "hover"],
    value: "click",
  },
  options: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "苹果",
    value: "path1",
    icon: 'apple'
  },
  {
    label: "面条",
    value: "path2",
    icon: 'bowl',
    children: [
      {
        label: "网球",
        value: "path2-1",
        icon: 'baseball',
      },
      {
        label: "足球",
        value: "path2-2",
        icon: 'football',
      },
      {
        label: "篮球",
        value: "path2-3",
        icon: 'basketball',
        children: [
            {
              label: "阳光",
              value: "path2-3-1",
              icon: 'sunny',
            },
                  {
              label: "星星",
              value: "path2-3-2",
              icon: 'star',
            },
        ]
      }
    ]
  },
  {
    label: "葡萄",
    value: "path3",
    icon: 'cherry'
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
