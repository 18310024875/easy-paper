import { h } from 'vue'
import initApp from 'common'
import createStore from './store'
import Design from './design'
// import {cloneDeep} from 'lodash'

initApp({
  createStore,
  appConfig: {
    render: () => h(Design)
  },
}).then(({
  store,
  app,
}) => {
  // 更新自身的pageList
  store.dispatch('syncPageListFromOnline', true)

  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault()

  //   console.log(123123, e);
  // })

  window.addEventListener("keydown", e => {
    let keys = store.getters.keyDowns
    if (!keys.includes(e.key)) keys.push(e.key)
  })

  window.addEventListener('keyup', e => {
    if (e.key === 'Delete') {
      let { ElMessageBox } = app.config.globalProperties.elementPlus
      let activePage = store.getters.activePage
      let activeWidget = store.getters.activeWidget
      if (activePage && activeWidget) {
        ElMessageBox.confirm(
          '是否要删除当前组件?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            store.commit('removeActiveWidget')
            // delete widget
            store.commit('deleteWidget', {
              widgetId: activeWidget.id,
              pageId: activePage.id
            })
          })
          .catch(() => {

          })
      } else if (activePage && !activeWidget) {
        ElMessageBox.confirm(
          '是否要删除当页面? 删除后不可恢复',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            // delete page
            store.commit('deletePage', activePage.id)
          })
          .catch(() => {

          })
      }
    }

    let keys = store.getters.keyDowns
    if (keys.includes(e.key)) {
      let index = keys.findIndex(v => v === e.key)
      if (index > -1) keys.splice(index, 1)
    }
  })
})