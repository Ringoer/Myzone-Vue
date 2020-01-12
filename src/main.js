// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
import axios from 'axios'
import swal from 'sweetalert2'

import store from './store/index'

Vue.prototype.$axios = axios
Vue.prototype.$swal = swal

Vue.use(VueRouter)

Vue.config.productionTip = false

axios.defaults.headers.common['authorization'] = store.state.token

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  computed: {
    getToken () {
      return store.state.token
    }
  },
  watch: {
    getToken (cur, old) {
      axios.defaults.headers.common['authorization'] = cur
    }
  }
})
