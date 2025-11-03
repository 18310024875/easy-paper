const createRouter = ({
  createRouter,
  createWebHashHistory
}) => {
  const routes = []
  return createRouter({
    history: createWebHashHistory('./'),
    routes
  })
}

export default createRouter