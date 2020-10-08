import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    course: null,
    isLogin: false,
    token: '',
    isSideBar: false
    // widthOfSideBar: '15%',
    // widthOfMain: '85%'
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setToken (state, token) {
      state.token = token
    },
    setCourse (state, course) {
      state.course = course
    },
    setIsSideBar (state) {
      state.isSideBar = !state.isSideBar
    }
    // changeSideBar (state) {
    //   if (state.widthOfSideBar === '15%') {
    //     state.widthOfSideBar = '0'
    //     state.widthOfMain = '100%'
    //   } else {
    //     state.widthOfSideBar = '15%'
    //     state.widthOfMain = '85%'
    //   }
    // }
  },
  actions: {
    setUser (context, user) {
      context.commit('setUser', user)
    },
    setIsLogin (context, isLogin) {
      context.commit('setIsLogin', isLogin)
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setCourse (context, course) {
      context.commit('setCourse', course)
    },
    setIsSideBar (context) {
      context.commit('setIsSideBar')
    }
    // changeSideBar (context) {
    //   context.commit('changeSideBar')
    // }
  }
})

export default store
