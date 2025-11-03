import 'vant/lib/index.css'
import vant from 'vant'
import widget from './widget.vue'

export default {
  init: app => app.use(vant),
  name: 'v-btn',
  widget
}