// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as VueGoogleMaps from 'vue2-google-maps'
import Element from 'element-ui'

Vue.use(Element)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBbwAXuthv8rUd5LlWf2H6_r7hrxij_Pr8',
    v: '3.29',
    installComponents: false
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
