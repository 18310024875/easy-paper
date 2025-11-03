<template>
  <div class="design-part-right">
    <template v-if="activeWidget">
      <div style="margin-bottom: 10px; font-weight: bold">
        {{ activeWidget.widgetLabel }}
      </div>
      <div>{{ activeWidget.props }}</div>
      <div>{{ activeWidget.events }}</div>
      <ComponentControl
        :key="activeWidget.id"
        :options="activeWidget.propConfig"
        :valueObj="activeWidget.props"
      />
      <ComponentControl
        :key="activeWidget.id"
        :options="activeWidget.eventConfig"
        :valueObj="activeWidget.events"
      />
    </template>
    <template v-else-if="activePage">
      <div style="margin-bottom: 5px; font-weight: bold">页面名称</div>
      <el-input style="margin-bottom: 5px" v-model="activePage.title" />
      <div style="margin-bottom: 5px; font-weight: bold">路由地址</div>
      <el-input style="margin-bottom: 5px" v-model="activePage.path" />
      <ComponentControl
        :key="activePage.id"
        :options="activePage.eventConfig"
      />
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ComponentControl from "./components/component-control.vue";
export default {
  components: {
    ComponentControl,
  },
  data() {
    return {
      code: "",
      extensions: "",
    };
  },
  computed: {
    ...mapGetters(["activeWidget", "activePage"]),
  },
};
</script>

<style lang="less" scoped>
.design-part-right {
  height: 100%;
  position: relative;
  padding: 10px;
  font-size: 13px;
  overflow: auto;
}
</style>
