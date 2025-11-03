import Company from './views/company.vue'
import Project from './views/project.vue'
import Module from './views/module.vue'

const createRouter = ({
  createRouter,
  createWebHashHistory
}) => {
  const routes = [
    {
      path: '/company',
      component: Company
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/module',
      component: Module
    }, {
      path: '',
      redirect: 'company'
    }
  ]
  return createRouter({
    history: createWebHashHistory(),
    routes
  })
}

export default createRouter