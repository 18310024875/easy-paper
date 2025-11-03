<template>
  <div class="dialogs-wrap" v-if="dialogs.length">
    <el-tooltip
      v-for="widget in dialogs"
      :key="widget.id"
      class="box-item"
      effect="dark"
      placement="left"
      :content="'弹窗-' + widget.propConfig['title'].value"
    >
      <div class="dialog" @click="showDialog(widget)">dialog</div>
    </el-tooltip>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    dialogConfigs: {
      required: true,
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["activePage", "activeWidget"]),
    dialogs() {
      let dialogConfigs = this.dialogConfigs;
      if (dialogConfigs.length === 0) return [];
      dialogConfigs.map((widget) => {
        widget.propConfig["showDialog"].closeDialog = (a) => {
          this.removeActiveWidget();
        };
      });
      return dialogConfigs;
    },
  },
  methods: {
    ...mapMutations(["setActiveWidget", "removeActiveWidget"]),
    showDialog(widget) {
      let propConfig = widget.propConfig["showDialog"];
      propConfig.value = true;
      // 设置活动组件
      this.setActiveWidget(widget.id);
    },
  },
};
</script>
<style lang="less" scoped>
.dialogs-wrap {
  position: absolute;
  z-index: 2;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .dialog {
    background: rgba(0, 0, 0, 0.3);
    margin-top: 10px;
    padding: 5px 2px 5px 10px;
    color: white;
    border-radius: 5px 0 0 5px;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
