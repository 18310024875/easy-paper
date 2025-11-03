<template>
  <div class="design-part-main" ref="dom" v-if="activePage">
    <div class="center-title">
      <el-button size="small" @click="previewPage"> 预览 </el-button>
      <el-button type="primary" size="small" @click="savePage">保存</el-button>
    </div>
    {{ activePage.formData }}
    <div class="center-view" :style="{ width, height }">
      <main class="init" id="design-root-view">
        <!-- is root -->
        <MoveableChildrenBox
          :key="activePage.id"
          :layoutWidgetChildren="activePage.children"
        />
      </main>
    </div>
  </div>
</template>
<script>
import MoveableChildrenBox from "./components/moveable-children-box.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    MoveableChildrenBox,
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  computed: {
    ...mapGetters([
      "activePage",
      "companyId",
      "projectId",
      "activeWidgetId",
      "activeWidget",
    ]),
  },
  mounted() {
    this.initCenter();
  },
  methods: {
    ...mapActions(["setOnlinePageList", "updateActivePagePreviewImg"]),
    initCenter() {
      let dom = this.$refs.dom;
      if (!dom) return;
      let w = dom.offsetWidth;
      let h = dom.offsetHeight;
      let rate = w / h;
      if (rate < 1920 / 1080) {
        let width = w - 40;
        let height = (width / 1920) * 1080;
        this.width = width + "px";
        this.height = height + "px";
      } else {
        let height = h - 40;
        let width = (h / 1080) * 1920;
        this.width = width + "px";
        this.height = height + "px";
      }
    },
    previewPage() {
      this.updateActivePagePreviewImg();
      window.open(
        `/preview.html?companyId=${this.companyId}&projectId=${this.projectId}`
      );
    },
    savePage() {
      this.updateActivePagePreviewImg();
      this.setOnlinePageList();
    },
  },
};
</script>
<style scoped lang="less">
.design-part-main {
  height: 100%;
  position: relative;
  .center-title {
    margin-top: 6px;
    margin-left: 12px;
    font-weight: bold;
  }
  .center-view {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ededed;
    box-shadow: 0ch 0ch 10ch #ccc;
    overflow: auto;
    .init {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}
</style>
