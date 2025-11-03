const mLayoutmMap = import.meta.glob(`./layouts/*/index.js`, { eager: true, import: 'default' })
const mModuleMap = import.meta.glob(`./modules/*/index.js`, { eager: true, import: 'default' })
const mWidgetMap1 = import.meta.glob(`./widgets/*/index.js`, { eager: true, import: 'default' })
const mWidgetMap2 = import.meta.glob(`./widgets/*.vue`, { eager: true, import: 'default' })

const layouts = []
const modules = []
const widgets = []
for (let url in mLayoutmMap) {
  let el = mLayoutmMap[url]
  let match = url.match(/\.\/layouts\/([-\w]+)\/index\.js$/)
  if (match && match[1]) {
    el.widgetName = 'ep-layout-' + match[1]
    layouts.push(el)
  }
}
for (let url in mModuleMap) {
  let el = mModuleMap[url]
  let match = url.match(/\.\/modules\/([-\w]+)\/index\.js$/)
  if (match && match[1]) {
    el.widgetName = 'ep-module-' + match[1]
    modules.push(el)
  }
}
for (let url in mWidgetMap1) {
  let el = mWidgetMap1[url]
  let match = url.match(/\.\/widgets\/([-\w]+)\/index\.js$/)
  if (match && match[1]) {
    el.widgetName = 'ep-widget-' + match[1]
    widgets.push(el)
  }
}
for (let url in mWidgetMap2) {
  let el = mWidgetMap2[url]
  let match = url.match(/\.\/widgets\/([-\w]+)\.vue$/)
  if (match && match[1]) {
    el.widgetName = 'ep-widget-' + match[1]
    widgets.push(el)
  }
}

export default {
  name: 'easy-paper-public-ui',
  version: '1.0.0',
  layouts,
  modules,
  widgets
}