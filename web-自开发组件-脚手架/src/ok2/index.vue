<template>
  <div class="libin-layout">
    <div class="top-part">
      <div class="logo">礼宾接待系统</div>
      <ul>
        <li>首页</li>
        <li>接待管理</li>
        <li>系统管理</li>
        <li>资源管理</li>
        <li>更多</li>
      </ul>
    </div>
    <div class="main-part">
      <div class="slot-wrap"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.libin-layout {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .top-part {
    height: 58px;
    background: #001529;
    display: flex;
    padding-left: 30px;
    .logo {
      color: white;
      font-size: 18px;
      line-height: 58px;
      margin-right: 30px;
    }
    ul {
      color: white;
      display: flex;
      li {
        font-size: 15px;
        padding-left: 16px;
        padding-right: 16px;
        line-height: 58px;
        cursor: pointer;
      }
    }
  }
  .main-part {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background: #f0f2f5;
    .slot-wrap {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
