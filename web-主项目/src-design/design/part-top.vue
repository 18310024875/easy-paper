<template>
  <div class="design-part-top">
    <div class="init">
      <div style="margin-top: 12px; margin-right: 10px">
        颜色<br />
        <el-color-picker v-model="primaryColor" />
      </div>
      <!-- layouts -->
      <div class="layout-part" style="padding-left: 0">
        <div
          class="layout-item"
          v-for="item in gLayouts"
          :key="item.widgetName"
          draggable="true"
          @dragstart="dragstartCreateData(item, $event)"
        >
          <div class="text">{{ item.widgetLabel }}</div>
          <el-icon
            class="icon cp"
            @mouseenter="previewMouseenter(item, $event)"
            @mouseleave="previewMouseleave"
          >
            <View />
          </el-icon>
        </div>
      </div>
      <!-- modules -->
      <div class="module-part">
        <div
          class="module-item"
          v-for="item in gModules"
          :key="item.widgetName"
          draggable="true"
          @dragstart="dragstartCreateData(item, $event)"
        >
          <div class="text">{{ item.widgetLabel }}</div>
          <el-icon
            class="icon cp"
            @mouseenter="previewMouseenter(item, $event)"
            @mouseleave="previewMouseleave"
          >
            <View />
          </el-icon>
        </div>
      </div>
      <!-- widgets -->
      <div class="widget-part">
        <!-- 自开发组件 -->
        <div
          class="widget-item cp"
          v-for="item in gCustomWidgets"
          :key="item.widgetName"
          draggable="true"
          @dragstart="dragstartCreateData(item, $event)"
        >
          <div class="text">{{ item.widgetLabel }}</div>
          <el-icon
            class="icon cp"
            @mouseenter="previewMouseenter(item, $event)"
            @mouseleave="previewMouseleave"
          >
            <View />
          </el-icon>
        </div>
        <!-- 默认组件 -->
        <div
          class="widget-item cp"
          v-for="item in gWidgets"
          :key="item.widgetName"
          draggable="true"
          @dragstart="dragstartCreateData(item, $event)"
        >
          <div class="text">{{ item.widgetLabel }}</div>
          <el-icon
            class="icon cp"
            @mouseenter="previewMouseenter(item, $event)"
            @mouseleave="previewMouseleave"
          >
            <View />
          </el-icon>
        </div>
      </div>
    </div>
    <!-- preview component -->
    <ComponentPreivew :config="previewConfig" />
  </div>
</template>
<script>
import publicUI from "@public-ui";
import ComponentPreivew from "./components/component-preview.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ComponentPreivew,
  },
  data() {
    return {
      previewConfig: null,
      primaryColor: "#409EFF",
    };
  },
  watch: {
    primaryColor() {
      setTimeout(() => {
        let s = document.createElement("style");
        s.innerHTML = `:root { --el-color-primary: ${this.primaryColor} }`;
        document.head.append(s);
      });
    },
  },
  computed: {
    ...mapGetters(["customWidgets", "createWidgetFunction"]),
    gLayouts() {
      return this.getWidgetConfigs(publicUI.layouts, "layout");
    },
    gModules() {
      return this.getWidgetConfigs(publicUI.modules, "module");
    },
    gWidgets() {
      return this.getWidgetConfigs(publicUI.widgets, "widget");
    },
    gCustomWidgets() {
      return this.getWidgetConfigs(this.customWidgets, "customWidget");
    },
  },
  methods: {
    // 生成配置list
    getWidgetConfigs(mArr, type) {
      return mArr.map((el) => ({
        type,
        widgetName: el.widgetName,
        widgetLabel: el.widgetLabel,
        defaultWidth: el.defaultWidth,
        defaultHeight: el.defaultHeight,
        widgetDesignFull: el.widgetDesignFull,
        getPropConfig: el.getPropConfig,
        getEventConfig: el.getEventConfig,
      }));
    },
    // 开始拖拽瞬间记录数据
    dragstartCreateData(elConfig, e) {
      const dragDataKey = `ddk_${new Date().valueOf()}`;
      window[dragDataKey] = elConfig;
      e.dataTransfer.setData("dragDataKey", dragDataKey);
    },
    // 鼠标hover预览
    previewMouseenter(elConfig, e) {
      const { x, y } = e.target.getBoundingClientRect();
      // 处理组件信息
      const config = {
        type: elConfig.type,
        widgetName: elConfig.widgetName,
        widgetLabel: elConfig.widgetLabel,
        propConfig: elConfig?.getPropConfig?.() || {},
        eventConfig: elConfig?.getEventConfig?.() || {},
        left: x - 10,
        top: y + 25,
        width: elConfig.defaultWidth,
        height: elConfig.defaultHeight,
        widgetDesignFull: false
      };
      // widget
      const widget = this.createWidgetFunction(config);
      this.previewConfig = widget
    },
    // 鼠标拿开 预览结束
    previewMouseleave() {
      this.previewConfig = null;
    },
  },
};
</script>
<style lang="less" scoped>
.design-part-top {
  height: 100%;
  position: relative;
  padding: 10px 15px;
  padding-bottom: 0;
  .init {
    height: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 15px;
    display: flex;
    padding-right: 10px;
    .layout-part,
    .module-part {
      flex: 0 0 auto;
      overflow: hidden;
      padding: 0 15px;
      padding-top: 10px;
      border-right: 1px solid #ccc;
      .layout-item,
      .module-item {
        position: relative;
        width: 100px;
        flex: 0 0 auto;
        float: left;
        overflow: hidden;
        margin-right: 10px;
        .text {
          height: 60px;
          border: 1px dashed #ccc;
          padding-left: 5px;
          padding-top: 5px;
          word-break: break-all;
        }
        .icon {
          position: absolute;
          right: 3px;
          bottom: 0;
          font-size: 16px;
          color: #555;
          display: none;
          z-index: 1;
        }
      }
      .layout-item:nth-last-child(1),
      .module-item:nth-last-child(1) {
        margin-right: 0;
      }
      .layout-item:hover,
      .module-item:hover {
        .icon {
          display: block;
        }
      }
    }
    .widget-part {
      flex: 1;
      overflow-x: auto;
      margin-left: 15px;
      margin-bottom: -15px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      .widget-item {
        font-size: 13px;
        width: 120px;
        height: 30px;
        line-height: 30px;
        border: 1px dashed #ccc;
        margin-right: 10px;
        padding-right: 20px;
        position: relative;
        text-indent: 10px;
        margin-top: 5px;
        .text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .icon {
          position: absolute;
          right: 2px;
          top: 7px;
          font-size: 16px;
          color: #555;
          display: none;
          z-index: 1;
        }
      }
      .widget-item:hover {
        .icon {
          display: inline-flex;
        }
      }
      // .widget-item {
      //   width: 120px;
      //   height: 30px;
      //   border: 1px solid red;
      //   float: left;
      // }
    }
  }
}
</style>
