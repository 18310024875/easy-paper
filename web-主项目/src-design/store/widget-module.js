import { reactive, computed } from 'vue'
import request from "common/request"

const getUniqueId = () => {
  return Math.random().toString(36).substr(2)
}
const getStore = () => {
  return window.store
}
// 创建一个widget
const createWidgetFunction = (config) => {
  let id = `${config.type}_${getUniqueId()}`
  let widget = reactive({
    id,
    // type: config.type,
    widgetName: config.widgetName,
    widgetLabel: config.widgetLabel,
    propConfig: config.propConfig,
    eventConfig: config.eventConfig,

    left: config.left,
    top: config.top,
    width: config.width,
    height: config.height,
    widgetDesignFull: config.widgetDesignFull,
  })
  return widget
}
// 从page 中找widget
const pageFindWidget = (list, widgetId) => {
  for (let child of list) {
    if (child.id === widgetId) {
      return child
    } else {
      let it = pageFindWidget(child.children || [], widgetId)
      if (it) return it
    }
  }
}

export default {
  state: {
    activeWidgetId: null,
  },
  getters: {
    createWidgetFunction: () => createWidgetFunction,
    activeWidgetId: state => state.activeWidgetId,
    activeWidget: state => {
      // let pageList = getStore().getters.pageList
      // let activePage = getStore().getters.activePage
      // let list = activePage ? activePage.children : pageList
      // return pageFindWidget(list, state.activeWidgetId)
      let activePage = getStore().getters.activePage
      return activePage?.widgetConfig?.[state.activeWidgetId]
    },
  },
  mutations: {
    // 添加widget
    addWidget: (state, { widget, container, pageId }) => {
      let pageList = getStore().getters.pageList
      let page = pageList.find(v => v.id === pageId)
      // add widget layout
      let layoutWidget = {
        id: widget.id,
        label: widget.widgetLabel,
        children: []
      }
      container.push(layoutWidget)
      // add widget config
      page.widgetConfig[widget.id] = widget
    },
    // 删除widget
    deleteWidget: (state, { widgetId, pageId }) => {
      let pageList = getStore().getters.pageList
      let page = pageList.find(v => v.id === pageId)
      // 删除响应数据结构
      let render = (list) => {
        for (let i = 0; i < list.length; i++) {
          let el = list[i]
          if (el.id === widgetId) {
            // delete widget layout
            list.splice(i, 1)
            // delete widget config
            delete page.widgetConfig[widgetId]
            return
          } else {
            if (el?.children?.length) render(el.children)
          }
        }
      }
      render(pageList)
    },
    // 设置活动widget
    setActiveWidget: (state, widgetId) => {
      state.activeWidgetId = widgetId
    },
    // 删除互动widget
    removeActiveWidget: (state) => {
      state.activeWidgetId = null
    },
  },
  actions: {

  }
}
