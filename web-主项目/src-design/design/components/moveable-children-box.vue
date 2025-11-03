<template>
  <article
    ref="container"
    class="moveable-children-box"
    @dragover.stop="dragover"
    @drop.stop="drop"
  >
    <!-- 下为弹窗展示 && 子元素有弹窗时展示 -->
    <!-- <MoveableDialogs v-if="selfDialogs.length" :dialogConfigs="selfDialogs" /> -->

    <!-- children -->
    <template v-for="{ id, children } in layoutWidgetChildren" :key="id">
      <section
        v-if="
          CFG[id].propConfig['childwrap-v-if']
            ? CFG[id].propConfig['childwrap-v-if'].value
            : true
        "
        class="childwrap"
        :class="CFG[id].widgetLabel"
        :id="'childwrap_' + CFG[id].id"
        :style="{
          left: CFG[id].widgetDesignFull ? 0 : CFG[id].left + 'px',
          top: CFG[id].widgetDesignFull ? 0 : CFG[id].top + 'px',
          width: CFG[id].widgetDesignFull ? '100%' : CFG[id].width + 'px',
          height: CFG[id].widgetDesignFull ? '100%' : CFG[id].height + 'px',
        }"
      >
        <h1 class="child-left-cover" @click.stop="chooseWidget(id)"></h1>
        <!-- component -->
        <component
          :is="CFG[id].widgetName"
          :widget="CFG[id]"
          :widgetConfig="CFG"
          :addChildWidget="addChildWidget"
          :deleteChildWidget="deleteChildWidget"
          :layoutWidgetChildren="children"
          status="dev"
        >
          <!-- 递归 -->
          <MoveableChildrenBox :layoutWidgetChildren="children" />
        </component>
      </section>
    </template>
    <!-- 下为moveable插件 && 活动组件为自身的child时出现-->

    <Moveable
      className="moveable"
      v-if="isChildActiveWidget"
      :key="activeWidget.id"
      :target="'#childwrap_' + activeWidget.id"
      :verticalGuidelines="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :draggable="true"
      :resizable="true"
      :scalable="false"
      :rotatable="false"
      :renderDirections="['e', 's', 'se']"
      :padding="{ left: 0, top: 0, right: 0, bottom: 0 }"
      :origin="/*中心点*/ false"
      :throttleDrag="/*拖拽step*/ 2"
      :throttleResize="/*缩放step*/ 2"
      :snappable="/*是否磁吸*/ true"
      :bounds="/*磁吸边界点*/ moveBounds"
      :elementGuidelines="/*对比辅助线dom列表*/ moveElementGuidelines"
      :snapThreshold="/*辅助线阈值 ,即元素与辅助线间距小于x,则自动贴边*/ 20"
      :snapDirections="/*辅助线方向*/ {
        top: true,
        right: true,
        bottom: true,
        left: true,
        center: true,
        middle: true,
      }"
      :elementSnapDirections="/*元素捕捉方向*/ {
        top: true,
        right: true,
        bottom: true,
        left: true,
        center: true,
        middle: true,
      }"
      @drag="moveDrag"
      @resize="moveResize"
    />
  </article>
</template>
<script>
import Moveable from "vue3-moveable";
import MoveableDialogs from "./moveable-dialogs.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Moveable,
    MoveableDialogs,
  },
  name: "MoveableChildrenBox",
  props: {
    layoutWidgetChildren: { required: true, type: Array },
  },
  data() {
    return {
      moveBounds: {},
    };
  },
  computed: {
    ...mapGetters([
      "activePage",
      "activeWidget",
      "createWidgetFunction",
      "keyDowns",
    ]),
    CFG() {
      return this.activePage.widgetConfig;
    },
    // 是否自己的child是活动元素
    isChildActiveWidget() {
      return this.layoutWidgetChildren.find(
        (v) => v.id === this.activeWidget?.id
      );
    },
    moveElementGuidelines() {
      return this.layoutWidgetChildren.map(
        (widget) => "#childwrap_" + widget.id
      );
    },
    selfDialogs() {
      let widgetName = "ep-widget-dialog";
      return this.layoutWidgetChildren.filter(
        (v) => v.widgetName === widgetName
      );
    },
    isCtrlDown() {
      // return this.keyDowns.includes("Control");
    },
  },
  mounted() {
    // 设置边界
    setTimeout(() => this.setMoveBounds());
  },
  methods: {
    ...mapMutations([
      "addWidget",
      "deleteWidget",
      "setActiveWidget",
      "removeActiveWidget",
    ]),
    // moveable 设置边界
    setMoveBounds() {
      let dom = this.$refs.container;
      let rectObj = dom.getBoundingClientRect();
      this.moveBounds = {
        top: 0,
        left: 0,
        right: rectObj.width - 5,
        bottom: rectObj.height - 5,
      };
    },
    // moveable 位置改变
    moveDrag(e) {
      if (this.activeWidget.widgetDesignFull) return;

      let childwrapId = "#childwrap_" + this.activeWidget.id;
      let dom = document.querySelector(childwrapId);
      dom.style.left = e.left + "px";
      dom.style.top = e.top + "px";

      this.activeWidget.left = e.left;
      this.activeWidget.top = e.top;
      // 设置边界
      setTimeout(() => this.setMoveBounds());
    },
    // moveable 尺寸改变
    moveResize(e) {
      if (this.activeWidget.widgetDesignFull) return;

      let childwrapId = "#childwrap_" + this.activeWidget.id;
      let dom = document.querySelector(childwrapId);
      dom.style.width = e.width + "px";
      dom.style.height = e.height + "px";

      this.activeWidget.width = e.width;
      this.activeWidget.height = e.height;
      // 设置边界
      setTimeout(() => this.setMoveBounds());
    },
    // 选中 layout/module/widget 时候设置活动组件为当前
    chooseWidget(widgetId) {
      if (this.activeWidget?.id === widgetId) {
        // 删除活动组件
        this.removeActiveWidget();
      } else {
        // 设置活动组件
        this.setActiveWidget(widgetId);
      }
    },
    // 拖拽中阻止默认事件
    dragover(e) {
      e.preventDefault();
    },
    // 在当前元素区域, 拖拽结束后 处理事件
    drop(e) {
      // 获取拖拽信息
      const dragDataKey = e.dataTransfer.getData("dragDataKey");
      const data = window[dragDataKey];
      if (!dragDataKey || !data) return;
      console.log("----------------drop-----------------", data);
      // 处理组件信息
      const config = {
        type: data.type,
        widgetName: data.widgetName,
        widgetLabel: data.widgetLabel,
        propConfig: data?.getPropConfig?.() || {},
        eventConfig: data?.getEventConfig?.() || {},
        left: e.offsetX,
        top: e.offsetY,
        width: data.defaultWidth,
        height: data.defaultHeight,
        widgetDesignFull: data.widgetDesignFull,
      };
      // widget
      const widget = this.createWidgetFunction(config);
      // *** 如果是表单组件 默认绑定关系
      const vModel = widget.propConfig["v-model"];
      if (vModel) vModel.modelName = widget.id;
      // add widget
      this.addWidget({
        pageId: this.activePage.id,
        container: this.layoutWidgetChildren,
        widget,
      });
      // 默认活动组件
      this.setActiveWidget(widget.id);
    },
    // 给子组件传的-支持添加元素
    addChildWidget(config, container) {
      // widget
      const widget = this.createWidgetFunction(config);
      // *** 如果是表单组件 默认绑定关系
      const vModel = widget.propConfig["v-model"];
      if (vModel) vModel.modelName = widget.id;
      // add widget
      this.addWidget({
        pageId: this.activePage.id,
        container,
        widget,
      });
      return widget;
    },
    // 给子组件传的-支持删除元素
    deleteChildWidget(widgetId) {
      // delete widget
      this.deleteWidget({
        pageId: this.activePage.id,
        widgetId,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.moveable-children-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  border: 1px dashed red;
  overflow: hidden;
  .childwrap {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    .child-left-cover {
      background: rgba(53, 58, 146, 0.5);
      position: absolute;
      left: -17px;
      top: -17px;
      width: 40px;
      height: 40px;
      transform: rotate(45deg);
      border: 1px dashed rgba(53, 58, 146, 1);
      z-index: 100;
      display: none;
      z-index: 3;
    }
    &:hover > .child-left-cover {
      display: block;
    }
  }
}
</style>
