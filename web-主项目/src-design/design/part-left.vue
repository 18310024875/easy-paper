<template>
  <div class="design-part-left">
    <!-- <div class="title">页数</div> -->
    <div class="page-list">
      <div
        class="page-item cp"
        v-for="(item, index) in pageList"
        :key="item.id"
        :class="activePage.id === item.id ? 'active' : ''"
        @click="choosePage(item)"
      >
        <div class="name">
          <span style="color:black">{{ item.title }}</span> ({{ item.path }})
        </div>
        <div class="index">{{ index + 1 }}</div>
        <div class="init">
          <img v-if="item.previewImg" :src="item.previewImg" />
        </div>
        <div class="create cp" @click.stop="createPage(item)">+</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["pageList", "activePage", "createPageFunction"]),
  },
  methods: {
    ...mapMutations(["addPage", "setActivePage", "removeActiveWidget"]),
    ...mapActions(["updateActivePagePreviewImg"]),
    createPage(page) {
      // page
      let newPage = this.createPageFunction("new page");
      // add page
      this.addPage({
        page: newPage,
        prevPageId: page.id,
      });
    },
    choosePage(page) {
      this.updateActivePagePreviewImg();
      this.removeActiveWidget();
      this.setActivePage(page.id);
    },
  },
};
</script>
<style lang="less" scoped>
.design-part-left {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  & > .title {
    height: 40px;
    flex: 0 0 auto;
    text-align: center;
    line-height: 40px;
  }
  & > .page-list {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding: 0 15px;
    margin-top: -10px;
    padding-top: 10px;
    overflow: auto;
    .page-item {
      position: relative;
      height: 120px;
      margin-bottom: 20px;
      .name {
        position: absolute;
        left: 25px;
        font-size: 12px;
        color: #666;
      }
      .index {
        position: absolute;
        left: 0;
        top: 23px;
        line-height: 1;
      }
      .init {
        position: absolute;
        left: 15px;
        top: 23px;
        bottom: 0;
        right: 0;
        border-radius: 4px;
        box-shadow: 0 0 10px #ccc;
        img {
          width: 100%;
        }
      }
      .create {
        position: absolute;
        right: 20px;
        bottom: -12px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: red;
        opacity: 0.5;
        font-size: 20px;
        text-align: center;
        line-height: 24px;
        color: white;
        display: none;
        cursor: pointer;
      }
    }
    .page-item:hover {
      .create {
        display: block;
      }
    }
    .page-item.active {
      .init {
        border: 1px solid;
        border-image-source: linear-gradient(to right, #8f41e9, #578aef);
        border-image-slice: 1;
        box-shadow: #578aef 0px 0px 10px;
      }
    }
  }
}
</style>
