import { h } from 'vue'
import initApp from 'common'
import Login from './login.vue'

initApp({
  appConfig: {
    render: () => h(Login)
  },
}).then(({
  app
}) => {

})