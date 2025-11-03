import { createApp } from 'vue'
import App from './app.vue'
import createRouter from './router'
import createStore from './store'
import request from "./request"
import './index.less'

// 自开发组件集合
import widgetModules from 'widgets'

Promise.all([
  window.System.import('vue-router'),
  window.System.import('vuex'),
  window.System.import('element-plus')
]).then(([
  VueRouter,
  Vuex,
  ElementPlus
]) => {
  const router = createRouter(VueRouter)
  const store = createStore(Vuex)

  const app = createApp({
    provide: {
      VueRouter,
      Vuex,
      ElementPlus
    },
    ...App
  }).use(router).use(store).use(ElementPlus)

  app.config.globalProperties.request = request

  for (const [key, component] of Object.entries(ElementPlus.ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // 注册所有自开发组件
  widgetModules.map(module => {
    if (module.init) module.init(app)
    if (module.name && module.widget) app.component(module.name, module.widget)
  })

  app.mount('#app')
})