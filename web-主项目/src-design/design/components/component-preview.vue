<template>
  <Teleport to="body" v-if="config">
    <div
      class="desion-component-preview"
      :style="{
        left: config.left ? config.left + 'px' : null,
        top: config.top ? config.top + 'px' : null,
      }"
    >
      <div
        class="init"
        :style="{
          width: config.width ? config.width + 'px' : null,
          height: config.height ? config.height + 'px' : null,
        }"
      >
        <component
          :is="config.widgetName"
          :widget="config"
          status="dev-preview"
        />
      </div>
    </div>
  </Teleport>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.desion-component-preview {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  // padding: 20px;
  border-radius: 4px;
  box-shadow: #999 0 0 30px;
  background: #f0f0f0;
  opacity: 1;
}
</style>
