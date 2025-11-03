import initApp from 'common'
import createStore from './store'
import createRouter from './router'

initApp({
  createStore,
  createRouter
}).then(({
  store,
  router,
  app
}) => {
  import('./tailwind.less')
})