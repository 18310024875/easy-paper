<template>
  <div class="design-view">
    <div class="top-view">
      <PartTop />
    </div>
    <div class="main-view">
      <div class="main-left-view">
        <PartLeft />
      </div>
      <div class="main-center-view">
        <PartMain />
      </div>
      <div class="main-right-view">
        <PartRight />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.design-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .top-view {
    height: 120px;
    flex: 0 0 auto;
  }
  .main-view {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    .main-left-view {
      border-right: 1px solid #ccc;
      width: 200px;
      position: relative;
      flex: 0 0 auto;
    }
    .main-center-view {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .main-right-view {
      border-left: 1px solid #ccc;
      width: 300px;
      position: relative;
      flex: 0 0 auto;
    }
  }
}
</style>
<style lang="less">
.design-view {
  /*滚动条宽高 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* 滚动条上的滚动滑块。样式 */
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.2);
  }

  /* 鼠标悬停时，设置滑块的背景颜色为深灰色 */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999999;
  }

  /* 鼠标按下时，设置滑块的背景颜色为灰色 */
  ::-webkit-scrollbar-thumb:active {
    background-color: #666666;
  }
}
</style>
<script>
import PartTop from "./part-top.vue";
import PartLeft from "./part-left.vue";
import PartMain from "./part-main.vue";
import PartRight from "./part-right.vue";
export default {
  components: {
    PartTop,
    PartLeft,
    PartMain,
    PartRight,
  },
};
</script>
