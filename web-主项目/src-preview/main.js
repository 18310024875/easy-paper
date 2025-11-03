import initApp from 'common'
import request from "common/request"
import createStore from './store'
import createRouter from './router'
import PageComponent from './components/page.vue'
import { reactive } from 'vue'

const searchParams = new URLSearchParams(location.search)
const companyId = searchParams.get('companyId')
const projectId = searchParams.get('projectId')

initApp({
  createStore,
  createRouter
}).then(async ({
  store,
  router,
  app
}) => {
  if (!projectId) return

  try {
    let res = await request.post("/api/project/get", { projectId })
    let project = res.data
    let pageListStr = project && project.pageListStr
    let pageList = pageListStr ? JSON.parse(pageListStr) : []
    console.log('---------pageList---------', pageList)

    let routes = pageList.map(page => ({
      path: page.path,
      component: {
        ...PageComponent,
        props: {
          selfPage: {
            required: true,
            type: Object,
            // 默认porps
            default: () => reactive(page)
          }
        },
      }
    }))

    routes.map(r => router.addRoute(r))

    setTimeout(() => {
      let p = location.hash.replace('#/', '')
      if (p) {
        router.push('/' + p)
      } else {
        router.push(routes[0].path)
      }
    })
  } catch (e) {
    console.error(e)
  }
})