<template>
  <div class="libin-layout">
    <div class="top-part">
      <div class="logo">礼宾接待系统</div>
      <ul v-if="propConfig['menus']?.value">
        <li
          v-for="(item, ind) in propConfig['menus'].value"
          :key="ind"
          :class="item.active ? 'active' : ''"
          @click="handleClick(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="main-part">
      <div class="slot-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
const widgetLabel = "旧版礼宾layout";
const defaultWidth = 1000;
const defaultHeight = 600;
const widgetDesignFull = true;
const getPropConfig = () => ({
  menus: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "首页",
    path: "/home",
    active: true
  },
  {    
    label: "接待管理",
    path: "/jdgl"
  },
  {    
    label: "系统管理",
    path: "/xtgl"
  },
  {    
    label: "资源管理",
    path: "/zygl"
  },
  {    
    label: "更多",
    path: "/more"
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
  widgetDesignFull,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  mounted() {},
  methods: {
    handleUrl() {},
    handleClick(item) {
      if (this.isProd) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.libin-layout {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  .top-part {
    height: 58px;
    background: #001529;
    display: flex;
    padding-left: 30px;
    .logo {
      color: white;
      font-size: 18px;
      line-height: 58px;
      margin-right: 30px;
    }
    ul {
      color: rgb(191, 191, 195);
      display: flex;
      li {
        font-size: 15px;
        padding-left: 16px;
        padding-right: 16px;
        line-height: 58px;
        cursor: pointer;
      }
      li.active {
        color: white;
        font-weight: bold;
      }
    }
  }
  .main-part {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background: #f0f2f5;
    .slot-wrap {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
