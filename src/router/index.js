import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/others/HelloWorld'
import login from '@/components/others/login'
import index from '@/components/others/index'
import userInfo from '@/components/others/userInfo'
import course from '@/components/course/course'
import courseAdd from '@/components/course/courseAdd'
import courseEdit from '@/components/course/courseEdit'
import dynamics from '@/components/dynamics/dynamics'
import message from '@/components/message/message'
import messageAdd from '@/components/message/messageAdd'
import messageView from '@/components/message/messageView'

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
      path: '/user/info',
      name: 'userInfo',
      component: userInfo
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
    },
    {
      path: '/course/edit',
      name: 'courseEdit',
      component: courseEdit
    },
    {
      path: '/dynamics',
      name: 'dynamics',
      component: dynamics
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/message/add',
      name: 'messageAdd',
      component: messageAdd
    },
    {
      path: '/message/:messageId',
      name: 'messageView',
      component: messageView
    }
  ]
})
