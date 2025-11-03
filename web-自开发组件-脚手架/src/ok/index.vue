<template>
  <div class="libin-new-layout">
    <img class="bg" src="./imgs/month-3-left.png" />
    <div class="init">
      <div class="top-part">
        <img class="img" src="./imgs/logo.png" />
        <ul>
          <li>首页</li>
          <li class="active">我的工作台</li>
          <li>月度/年度账单</li>
          <li>数据看板</li>
          <li>博物馆管理</li>
        </ul>
      </div>
      <div class="main-part">
        <div class="left-part">
          <div class="item active">数字驾驶舱</div>
          <div class="item">我的代办</div>
          <div class="item">接待单详情</div>
          <div class="item">接待项目管理</div>
          <div class="item">资源管理</div>
          <div class="item">管家管理</div>
          <div class="item">我的申请</div>
          <div class="item">接待总结</div>
          <div class="item">我的数字藏品</div>
        </div>
        <div class="content-part">
          <div class="slot-wrap"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.libin-new-layout {
  height: 100%;
  width: 100%;
  position: relative;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
  }
  .init {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .top-part {
      height: 80px;
      position: relative;
      .img {
        position: absolute;
        left: 50px;
        top: 20px;
        width: 195px;
      }
      ul {
        margin-left: 300px;
        display: flex;
        align-items: center;
        height: 100%;
        li {
          font-size: 18px;
          font-weight: bold;
          color: rgb(171, 177, 187);
          padding-left: 20px;
          padding-right: 20px;
          font-weight: bold;
          cursor: pointer;
        }
        li.active {
          color: rgb(22, 22, 22);
        }
      }
    }
    .main-part {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
      .left-part {
        width: 200px;
        padding-top: 30px;
        .item {
          width: 176px;
          height: 56px;
          line-height: 56px;
          margin-left: 24px;
          padding-left: 30px !important;
          border-radius: 10px 0px 0px 10px;
          cursor: pointer;
        }
        .item.active {
          color: #a58f6c !important;
          background-color: #dddbcf !important;
          font-weight: bold;
        }
      }
      .content-part {
        flex: 1;
        overflow: hidden;
        position: relative;
        border-radius: 16px 0 0 16px;
        background: #dddbcf;
        padding: 16px;
        display: flex;
        flex-direction: column;
        .slot-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
      }
    }
  }
}
</style>
