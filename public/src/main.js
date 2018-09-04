// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import VueHighlightJS from 'vue-highlightjs'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
import client from './vendors/feathers'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  async created () {
    try {
      await client.authenticate()
    } catch (error) {
      console.log(error)
    }
  },
  template: '<App/>'
})
