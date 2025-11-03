import { reactive, computed } from 'vue'
import request from "common/request"
import html2canvas from "html2canvas";

const getUniqueId = () => {
  return Math.random().toString(36).substr(2)
}
const getStore = () => {
  return window.store
}
// 创建一个page
const createPageFunction = (title) => {
  let id = 'page_' + getUniqueId()
  let path = '/' + id
  let page = reactive({
    id,
    path,
    title,
    widgetConfig: {},
    children: [],
    previewImg: '',
    eventConfig: {
      mounted: {
        widget: "function",
        code: ``,
      },
      unmounted: {
        widget: "function",
        code: ``,
      }
    }
  })
  // handle formdata
  return pageAddFormData(page)
}
// page 添加formData
const pageAddFormData = (page) => {
  page.formData = computed(() => {
    let obj = {}
    for (let key in page.widgetConfig) {
      let widget = page.widgetConfig[key]
      let el = widget.propConfig['v-model']
      if (el && el.modelName) {
        obj[el.modelName] = el.value
      }
    }
    return obj
  })

  page.setFormData = (modelName, value) => {
    for (let key in page.widgetConfig) {
      let widget = page.widgetConfig[key]
      let el = widget.propConfig['v-model']
      if (el && el.modelName === modelName) {
        obj[el.modelName] = el.value
        return
      }
    }
  }
  return page
}

const defaultPage = createPageFunction('默认页面')

export default {
  state: {
    pageList: [defaultPage],
    activePageId: defaultPage.id
  },
  getters: {
    createPageFunction: () => createPageFunction,
    pageList: state => state.pageList,
    activePageId: state => state.activePageId,
    activePage: state => state.pageList.find(v => v.id === state.activePageId)
  },
  mutations: {
    // 添加page
    addPage: (state, { page, prevPageId }) => {
      if (prevPageId) {
        let index = state.pageList.findIndex(v => v.id === prevPageId)
        state.pageList.splice(index + 1, 0, page)
      } else {
        state.pageList.push(page)
      }
    },
    // 删除page
    deletePage: (state, pageId) => {
      let ind = state.pageList.findIndex(v => v.id === pageId)
      state.pageList.splice(ind, 1)

      if (state.pageList[ind]) {
        getStore().commit('setActivePage', state.pageList[ind].id)
      } else if (state.pageList[ind - 1]) {
        getStore().commit('setActivePage', state.pageList[ind - 1].id)
      }
    },
    // 设置活动page
    setActivePage: (state, pageId) => {
      state.activePageId = pageId
    },
    // 删除活动page
    removeActivePage: () => {
      state.activePageId = null
    },
    // 同步pageList
    syncPageList: (state, pageList) => {
      state.pageList = pageList.map(pageConfig => {
        let page = reactive(pageConfig)
        // handle formdata
        return pageAddFormData(page)
      })
    },
  },
  actions: {
    async syncPageListFromOnline(contentText, isFirstInit) {
      try {
        let projectId = getStore().getters.projectId
        let res = await request.post("/api/project/get", { projectId })
        let project = res.data
        let pageListStr = project && project.pageListStr
        let pageList = pageListStr ? JSON.parse(pageListStr) : []
        if (pageList.length) {
          getStore().commit('syncPageList', pageList)
          if (isFirstInit) getStore().commit('setActivePage', pageList[0].id)
        }
        console.log('syncPageListFromOnline---', pageList);
      } catch (e) {
        console.error(e)
      }
    },

    async setOnlinePageList(contentText) {
      try {
        let projectId = getStore().getters.projectId
        let pageList = getStore().getters.pageList
        let pageListStr = JSON.stringify(pageList)
        let res = await request.post("/api/project/update", { id: projectId, pageListStr })
        console.log(res);
      } catch (e) {
        console.error(e)
      }
    },

    async updateActivePagePreviewImg() {
      let dom = document.querySelector("#design-root-view");
      try {
        let activePage = getStore().getters.activePage
        if (!activePage) return
        let canvas = await html2canvas(dom, {
          backgroundColor: "transparent",
          useCORS: true, //支持图片跨域
          scale: 1, //设置放大的倍数
        })
        let base64 = canvas.toDataURL("image/png");
        activePage.previewImg = base64
      } catch (e) {
        console.error(e)
      }
    },
  }
}
