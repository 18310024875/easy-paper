<template>
  <div class="libin-new-layout">
    <img class="bg" src="./imgs/month-3-left.png" />
    <div class="init">
      <div class="top-part">
        <img class="img" src="./imgs/logo.png" />
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
        <div class="left-part">
          <div
            v-for="(item, ind) in leftMenus"
            :key="ind"
            :class="item.active ? 'active' : ''"
            class="item"
            @click="handleClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="content-part">
          <div class="slot-wrap">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const widgetLabel = "礼宾接待新版layout";
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
    label: "我的工作台",
    path: "/tabs/drive",
    children: [
      {
        label: "数字驾驶舱",
        path: "/tabs/drive"
      },
      {
        label: "我的待办",
        path: "/tabs/undo"
      },
      {
        label: "接待单管理",
        path: "/tabs/jddgl"
      },
      {
        label: "管家管理",
        path: "/tabs/gjgl"
      },
      {
        label: "接待总结",
        path: "/tabs/jdzj"
      },
      {
        label: "我的数字藏品",
        path: "/tabs/wdszcp"
      },
    ]
  },
  {    
    label: "月度/年度账单",
    path: "/bills"
  },
  {    
    label: "数据看板",
    path: "/dashboard"
  },
  {    
    label: "博物馆管理",
    path: "/bwg"
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
  computed: {
    leftMenus() {
      let menus = this.propConfig["menus"]?.value || [];
      let activeEl = menus.find((v) => v.active);
      if (activeEl && activeEl.children) return activeEl.children;
      return [];
    },
  },
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
.libin-new-layout {
  height: 100%;
  width: 100%;
  position: relative;
  background: white;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
  }
  .init {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .top-part {
      height: 80px;
      position: relative;
      .img {
        position: absolute;
        left: 50px;
        top: 20px;
        width: 195px;
      }
      ul {
        margin-left: 300px;
        display: flex;
        align-items: center;
        height: 100%;
        li {
          font-size: 18px;
          font-weight: bold;
          color: rgb(171, 177, 187);
          padding-left: 20px;
          padding-right: 20px;
          font-weight: bold;
          cursor: pointer;
        }
        li.active {
          color: rgb(22, 22, 22);
        }
      }
    }
    .main-part {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
      .left-part {
        width: 200px;
        padding-top: 30px;
        .item {
          width: 176px;
          height: 56px;
          line-height: 56px;
          margin-left: 24px;
          padding-left: 30px !important;
          border-radius: 10px 0px 0px 10px;
          cursor: pointer;
        }
        .item.active {
          color: #a58f6c !important;
          background-color: #dddbcf !important;
          font-weight: bold;
        }
      }
      .content-part {
        flex: 1;
        overflow: hidden;
        position: relative;
        border-radius: 16px 0 0 16px;
        background: #dddbcf;
        padding: 16px;
        display: flex;
        flex-direction: column;
        .slot-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
      }
    }
  }
}
</style>
