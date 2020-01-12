import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import index from '@/components/index'
import course from '@/components/course'
import courseAdd from '@/components/courseAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      components: {
        login: login
      }
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/course',
      name: 'course',
      component: course
    },
    {
      path: '/course/add',
      name: 'courseAdd',
      component: courseAdd
    }
  ]
})