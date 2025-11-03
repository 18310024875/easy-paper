<template>
  <div class="yangwang-layout">
    <div class="top-part">
      <div class="logo">仰望</div>
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
      <div class="m-left-part">
        <div class="text">素材类型</div>
        <div class="item">图片</div>
        <div class="item active">视频</div>
        <div class="item">文件</div>
      </div>
      <div class="m-main-part">
        <div class="mm-top-part">
          <div
            v-for="(item, ind) in mainMenus"
            :key="ind"
            :class="item.active ? 'active' : ''"
            class="item"
            @click="handleClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="mm-main-part">
          <div class="slot-wrap">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const widgetLabel = "仰望品牌layout";
const defaultWidth = 1100;
const defaultHeight = 600;
const widgetDesignFull = true;
const getPropConfig = () => ({
  menus: {
    type: "array",
    widget: "function-return",
    ...(() => {
      let code = `[
  {
    label: "仰望品牌故事",
    path: "/ywppgs",
  },
  {    
    label: "品牌规范与应用",
    path: "ppgfyyy"
  },
  {    
    label: "产品与品牌物料",
    path: "/cpywl/u9",
    active: true,
    children: [
      {
        label: "仰望U8系列",
        path: "/cpywl/u8",
      },
      {
        label: "仰望U9系列",
        path: "/cpywl/u9",
        active: true
      },
      {
        label: "仰望U7系列",
        path: "/cpywl/u7"
      },
      {
        label: "车型组合",
        path: "/cpywl/others"
      },
    ]
  },
  {    
    label: "零售市场物料",
    path: "/lsscwl"
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
  widgetDesignFull,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  computed: {
    mainMenus() {
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
.yangwang-layout {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  .top-part {
    height: 55px;
    display: flex;
    padding-left: 20px;
    border-bottom: 1px solid #dcdfe6;
    .logo {
      font-size: 16px;
      line-height: 55px;
      font-weight: bold;
    }
    ul {
      color: white;
      display: flex;
      padding-left: 60px;
      li {
        font-size: 15px;
        line-height: 55px;
        font-size: 14px;
        color: #b1b1b1;
        margin-left: 70px;
      }
      li.active {
        color: #000;
      }
    }
  }
  .main-part {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    .m-left-part {
      width: 150px;
      .text {
        height: 86px;
        line-height: 86px;
        text-align: center;
        color: #999;
        opacity: 0.7;
        font-size: 13px;
      }
      .item {
        width: 120px;
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        color: white;
        text-align: center;
        color: #000000;
        font-size: 14px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
      .item.active {
        background: #565294;
        color: white;
      }
    }
    .m-main-part {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .mm-top-part {
        height: 75px;
        background: #eff2ff;
        padding-left: 30px;
        display: flex;
        line-height: 75px;
        .item {
          font-size: 16px;
          margin-right: 130px;
          position: relative;
        }
        .item.active {
          color: #000000;
          font-weight: bold;
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            bottom: 10px;
            left: 15%;
            right: 15%;
            height: 2px;
            background: #565294;
          }
        }
      }
      .mm-main-part {
        background: #f9f9fb;
        flex: 1;
        overflow: hidden;
        padding: 20px;
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
