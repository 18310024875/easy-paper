export default {
  props: {
    // 组件配置
    widget: { required: true, type: Object },
    // 必须收到组件状态(开发阶段, 线上阶段)
    status: { required: true, type: String, default: "dev" },
    // *** 添加子组件用的
    widgetConfig: { type: Object },
    layoutWidgetChildren: { type: Array },
    addChildWidget: { type: Function },
    deleteChildWidget: { type: Function },
  },
  computed: {
    widgetId() {
      return this.widget.id
    },
    propConfig() {
      return this.widget.propConfig
    },
    eventConfig() {
      return this.widget.eventConfig
    },
    isDev() {
      return this.status === "dev";
    },
    isDevPreview() {
      return this.status === "dev-preview";
    },
    isProd() {
      return this.status === "prod";
    },
  },
  methods: {
    handleEvent(eventName, ...vals) {
      let itemEventConfig = this.eventConfig[eventName]
      if (itemEventConfig?.code?.trim()) {
        const target = new Function(itemEventConfig.code)
        target.call(this, ...vals)
      }
    }
  }
}