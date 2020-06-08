import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    course: null,
    username: '',
    userId: '1',
    isLogin: false,
    token: '',
    widthOfSideBar: '15%',
    widthOfMain: '85%'
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setUserId (state, userId) {
      state.userId = userId
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
    changeSideBar (state) {
      if (state.widthOfSideBar === '15%') {
        state.widthOfSideBar = '0'
        state.widthOfMain = '100%'
      } else {
        state.widthOfSideBar = '15%'
        state.widthOfMain = '85%'
      }
    }
  },
  actions: {
    setUsername (context, username) {
      context.commit('setUsername', username)
    },
    setUserId (context, userId) {
      context.commit('setUserId', userId)
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
    changeSideBar (context) {
      context.commit('changeSideBar')
    }
  }
})

export default store
