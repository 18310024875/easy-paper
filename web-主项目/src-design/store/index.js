import customModule from './custom-module'
import pageModule from './page-module'
import widgetModule from './widget-module'

const searchParams = new URLSearchParams(location.search)
const companyId = searchParams.get('companyId')
const projectId = searchParams.get('projectId')

const createStore = ({
  createStore
}) => {
  return createStore({
    state: {
      companyId,
      projectId,
      keyDowns: []
    },
    getters: {
      companyId: state => state.companyId,
      projectId: state => state.projectId,
      keyDowns: state => state.keyDowns,
    },
    // mutations: {},
    // actions: {},
    modules: {
      customModule,
      pageModule,
      widgetModule
    }
  })
}

export default createStore