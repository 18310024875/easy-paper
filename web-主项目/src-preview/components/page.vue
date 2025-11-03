<template>
  <div class="page" v-if="selfPage">
    <PageChildrenBox
      :layoutWidgetChildren="selfPage.children"
      :selfPage="selfPage"
    />
  </div>
</template>
<script>
import PageChildrenBox from "./page-children-box.vue";
export default {
  components: {
    PageChildrenBox,
  },
  data() {
    console.log(this.selfPage);
    return {};
  },
  mounted() {
    let { eventConfig } = this.selfPage;
    let el = eventConfig["mounted"];
    if (el && el.code && el.code.trim()) {
      try {
        let fn = new Function(el.code);
        fn.call(this);
      } catch (error) {
        console.error(error);
      }
    }
  },
  unmounted() {
    let { eventConfig } = this.selfPage;
    let el = eventConfig["unmounted"];
    if (el && el.code && el.code.trim()) {
      try {
        let fn = new Function(el.code);
        fn.call(this);
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
  position: relative;
}
</style>
