<template>
  <article ref="container" class="page-children-box">
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
        <!-- component -->
        <component
          :is="CFG[id].widgetName"
          :widget="CFG[id]"
          :widgetConfig="CFG"
          status="prod"
        >
          <!-- 递归 -->
          <PageChildrenBox
            :layoutWidgetChildren="children"
            :selfPage="selfPage"
          />
        </component>
      </section>
    </template>
  </article>
</template>
<script>
export default {
  name: "PageChildrenBox",
  props: {
    layoutWidgetChildren: { required: true, type: Array },
    selfPage: { type: Object },
  },
  data() {
    return {};
  },
  computed: {
    CFG() {
      return this.selfPage.widgetConfig;
    },
  },
};
</script>
<style lang="less" scoped>
.page-children-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.1);
  .childwrap {
    position: absolute;
  }
}
</style>
