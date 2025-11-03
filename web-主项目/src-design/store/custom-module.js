export default {
  state: {
    customWidgets: []
  },
  getters: {
    customWidgets: state => state.customWidgets,
  },
  mutations: {
    setCustomWidgets: (state, current) => {
      state.customWidgets = current
    },
  },
  actions: {}
}
