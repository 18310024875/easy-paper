import './index.less'
import { h, createApp } from 'vue'
import request from "./request"
import publicUI from '@public-ui'

const sParams = new URLSearchParams(location.search)
console.log('-----', sParams.get('companyId'), sParams.get('projectId'));

// 请求自开发包
// const getCustomWdidgets = async () => {
//   try {
//     const res = await request.post("/api/module/getModulesByProjectid", {
//       companyId: sParams.get('companyId'),
//       projectId: sParams.get('projectId')
//     })
//     let customUrls = (res.data || []).map(v => v.serverPath)
//     return customUrls
//   } catch (e) {
//     return []
//   }
// }

// 请求项目详情
// const getProjectInfo = async () => {
//   try {
//     const res = await request.post("/api/project/getProjectsByCompanyid", {
//       companyId: sParams.get('companyId'),
//       projectId: sParams.get('projectId')
//     })
//     let project = res.data?.[0]
//     return project
//   } catch (e) {
//     return null
//   }
// }

// 渲染app
export default async function ({
  createStore,
  createRouter,
  appConfig
}) {
  // const isReadyToGetProject = sParams.get('companyId') && sParams.get('projectId')
  // const customUrls = isReadyToGetProject ? await getCustomWdidgets() : []
  // const customAsyncs = customUrls.map(url => System.import(url))
  // promise
  return new Promise((resolve, rejected) => {
    Promise.all([
      System.import('vue-router'),
      System.import('vuex'),
      System.import('element-plus'),
      // ...customAsyncs
    ]).then(([
      vueRouter,
      vuex,
      elementPlus,
      // ...customModules
    ]) => {
      const app = createApp(appConfig || {
        render: () => h(vueRouter.RouterView)
      }).use(elementPlus)

      const store = createStore && createStore(vuex)
      if (store) app.use(store)

      const router = createRouter && createRouter(vueRouter)
      if (router) app.use(router)

      // 定义在window上 
      window.app = app
      window.store = store
      window.router = router
      // prototype上定义模块
      app.config.globalProperties.vueRouter = vueRouter
      app.config.globalProperties.vuex = vuex
      app.config.globalProperties.elementPlus = elementPlus
      app.config.globalProperties.request = request
      // 注册element-plus组件
      for (const [key, component] of Object.entries(elementPlus.ElementPlusIconsVue)) {
        app.component(key, component)
      }
      // 注册自带ui组件
      publicUI.layouts.map(el => app.component(el.widgetName, el))
      publicUI.modules.map(el => app.component(el.widgetName, el))
      publicUI.widgets.map(el => app.component(el.widgetName, el))
      // 遍历自开发包
      // if (isReadyToGetProject) {
      //   const customWidgets = []
      //   customModules.map(m => {
      //     // 注册所有自开发组件
      //     const widgetModules = m.default || []
      //     widgetModules.map(module => {
      //       if (module.init) module.init(app)
      //       if (module.name && module.widget) app.component(module.name, module.widget), customWidgets.push(module)
      //     })
      //   })
      //   store.commit('SET_CUSTOM_WIDGETS', customWidgets)
      // }
      // // 请求项目详情
      // if (isReadyToGetProject) {
      //   getProjectInfo()
      // }
      // mounted
      app.mount('#app')
      // resolve
      resolve({
        app,
        router,
        store
      })
    })
  })
}