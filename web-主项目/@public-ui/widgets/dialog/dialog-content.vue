<template>
  <div class="self-dialog" v-if="propConfig['showDialog'].value">
    <div
      class="init"
      :style="{
        width: propConfig['width'].value + 'px',
      }"
    >
      <div class="el-dialog" tabindex="-1" style="--el-dialog-width: 500px">
        <header class="el-dialog__header show-close">
          <span role="heading" aria-level="2" class="el-dialog__title">
            {{ propConfig["title"].value }}
          </span>
          <button
            aria-label="Close this dialog"
            class="el-dialog__headerbtn"
            type="button"
            @click="close"
          >
            <i class="el-icon el-dialog__close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                ></path>
              </svg>
            </i>
          </button>
        </header>
        <div class="el-dialog__body">
          <span v-if="propConfig['contentText'].value">
            {{ propConfig["contentText"].value }}
          </span>
          <div v-else class="content-wrap">
            <slot></slot>
          </div>
        </div>
        <footer class="el-dialog__footer">
          <div class="dialog-footer">
            <button
              v-if="propConfig['cancelButtom'].value"
              aria-disabled="false"
              type="button"
              class="el-button"
            >
              <span>{{ propConfig["cancelText"].value }}</span>
            </button>
            <button
              v-if="propConfig['submitButtom'].value"
              aria-disabled="false"
              type="button"
              class="el-button el-button--primary"
            >
              <span>{{ propConfig["submitText"].value }}</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.self-dialog {
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  .init {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-dialog {
      width: 100%;
      margin: 0;
      .content-wrap {
        position: relative;
        min-height: 200px;
      }
    }
  }
}
</style>
<script>
export default {
  props: ["propConfig", "eventConfig"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
