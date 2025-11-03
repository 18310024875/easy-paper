<template>
  <div class="self-tabs">
    <el-tabs
      class="tabs"
      v-model="propConfig['v-model'].value"
      :type="propConfig['type'].value"
      @tab-change="changeTab"
    >
      <template v-if="propConfig['options'].value">
        <el-tab-pane
          v-for="(item, index) in propConfig['options'].value"
          :key="item.value + '-' + index"
          :label="item.value"
          :name="item.value"
        >
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tabs-content-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
let vm = null;
const widgetLabel = "标签页";
const defaultWidth = 500;
const defaultHeight = 300;
const getPropConfig = () => ({
  "v-model": {
    value: "苹果",
    modelName: "",
  },
  type: {
    widget: "select",
    options: ["card", "border-card", ""],
    value: "card",
  },
  options: {
    widget: "option-labels",
    value: [],
    string: "",
    add(item) {
      let str = item.string.trim();
      if (str) {
        let option = { value: str, widgetId: "" };
        vm.propConfig["options"].value.push(option);
        vm.addTabDivTarget(option);
        item.string = "";
      }
    },
    delete(item, i) {
      let option = item.value[i];
      if (option.widgetId) {
        vm.deleteChildWidget(option.widgetId);
        vm.propConfig["options"].value.splice(i, 1);
      }
    },
  },
});
const getEventConfig = () => ({});
import mixin from "@public-ui/mixin";
import Div from "./d-div.vue";
export default {
  widgetLabel,
  defaultWidth,
  defaultHeight,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  components: {
    Div,
  },
  data() {
    vm = this;
    return {};
  },
  mounted() {
    // for (let option of this.propConfig["options"].value) {
    //   this.addTabDivTarget(option);
    // }
  },
  methods: {
    changeTab(a) {
      let tabValue = this.propConfig["v-model"].value;
      let tabList = this.propConfig["options"].value;
      let activeOption = tabList.find((v) => v.value === tabValue);
      tabList.map((tab) => {
        let el = this.widgetConfig[tab.widgetId];
        if (activeOption && tab.value === activeOption.value) {
          el.propConfig["childwrap-v-if"].value = true;
        } else {
          el.propConfig["childwrap-v-if"].value = false;
        }
      });
    },
    addTabDivTarget(option) {
      let tabValue = this.propConfig["v-model"].value;
      let tabList = this.propConfig["options"].value;
      let activeOption = tabList.find((v) => v.value === tabValue);
      let isShow = activeOption && activeOption.widgetId === widget.id;
      const config = {
        type: "widget",
        widgetName: "ep-widget-d-div",
        widgetLabel: "DIV",
        propConfig: {
          "childwrap-v-if": reactive({
            type: "boolean",
            value: isShow,
          }),
        },
        eventConfig: {},
        left: null,
        top: null,
        width: null,
        height: null,
        widgetDesignFull: true,
      };
      const widget = this.addChildWidget(config, this.layoutWidgetChildren);
      option.widgetId = widget.id;
    },
  },
};
</script>
<style lang="less">
.self-tabs {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .tabs {
    flex: 0 0 auto;
    position: relative;
  }
  .el-tabs--card > .el-tabs__header {
    margin: 0;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
  .tabs-content-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
}
</style>
