<template>
    <div style="height: 65px; background-color: white;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="float-left">
                        <div class="hamburger sidebar-toggle" @click="$store.dispatch('setIsSideBar')">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                        </div>
                    </div>
                    <!-- /# 选项卡开关 -->
                    <div class="float-right">
                        <div :class="messageDropdownClass">
                            <div class="header-icon" data-toggle="dropdown" @click="changeMessageClass">
                                <i class="ti-bell"></i>
                                <div :class="messageClass" style="position: absolute; transform: translate(-100px, 40px); top: 0px; left: 0px; will-change: transform;">
                                    <div class="dropdown-content-heading">
                                        <span class="text-left">通知</span>
                                    </div>
                                    <div class="dropdown-content-body">
                                        <ul>
                                            <li v-for="(message,index) in messages" :key="index">
                                                <a href="#">
                                                    <div class="notification-content">
                                                        <small class="notification-timestamp pull-right"> {{ message.sendTime }} </small>
                                                        <div class="notification-heading"> {{ message.topic }} </div>
                                                        <div class="notification-text"> {{ message.content }} </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="text-center">
                                                <a href="javasrcipt:void(0)" @click="jump('/message')" class="more-link"> 查看更多 </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="infoDropdownClass">
                            <div class="header-icon" data-toggle="dropdown" @click="changeInfoClass">
                                <img :src="this.$store.state.user.avatar" style="width:30px; height:30px; border-radius:50%; "/>
                                <span class="user-avatar" v-text="this.$store.state.user.nickname">
                                  user
                                  <i class="ti-angle-down f-s-10"></i>
                                </span>
                                <div :class="infoClass" style="position: absolute; transform: translate(-80px, 40px); top: 0px; left: 0px; will-change: transform;">
                                    <div class="dropdown-content-body">
                                        <ul>
                                            <li>
                                                <a @click="jump('/user/info')">
                                                    <i class="ti-user"></i>
                                                    <span> 个人信息 </span>
                                                </a>
                                            </li>
                                            <li v-show="false">
                                                <a @click="jump('/settings')">
                                                    <i class="ti-settings"></i>
                                                    <span> 我的设置 </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="logout">
                                                    <i class="ti-power-off"></i>
                                                    <span> 退出登录 </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      infoShow: false,
      messages: [],
      messageClass: 'drop-down dropdown-menu dropdown-menu-right',
      messageDropdownClass: 'dropdown dib',
      infoClass: 'drop-down dropdown-profile dropdown-menu dropdown-menu-right',
      infoDropdownClass: 'dropdown dib'
    }
  },
  watch: {
    $route () {
      this.setDefault()
    }
  },
  methods: {
    setDefault () {
      this.messageClass = 'drop-down dropdown-menu dropdown-menu-right'
      this.messageDropdownClass = 'dropdown dib'
      this.infoClass = 'drop-down dropdown-profile dropdown-menu dropdown-menu-right'
      this.infoDropdownClass = 'dropdown dib'
    },
    jump (curPath) {
      this.setDefault()
      if (!(this.$route.path === curPath)) {
        this.$router.push(curPath)
      }
    },
    logout () {
      this.$store.dispatch('setIsLogin', false)
      this.$store.dispatch('setToken', '')
      localStorage.removeItem('token')
      this.$swal({
        title: '成功',
        text: '退出成功！',
        type: 'success'
      })
        .then(() => {
          this.$router.push('/login')
        })
    },
    changeMessageClass () {
      this.getLatestMessages()
      if (this.messageClass === 'drop-down dropdown-menu dropdown-menu-right') {
        this.messageClass = 'drop-down dropdown-menu dropdown-menu-right show'
      } else {
        this.messageClass = 'drop-down dropdown-menu dropdown-menu-right'
      }
      if (this.messageDropdownClass === 'dropdown dib') {
        this.messageDropdownClass = 'dropdown dib show'
      } else {
        this.messageDropdownClass = 'dropdown dib'
      }
      this.infoClass = 'drop-down dropdown-profile dropdown-menu dropdown-menu-right'
      this.infoDropdownClass = 'dropdown dib'
    },
    changeInfoClass () {
      if (this.infoClass === 'drop-down dropdown-profile dropdown-menu dropdown-menu-right') {
        this.infoClass = 'drop-down dropdown-profile dropdown-menu dropdown-menu-right show'
      } else {
        this.infoClass = 'drop-down dropdown-profile dropdown-menu dropdown-menu-right'
      }
      if (this.infoDropdownClass === 'dropdown dib') {
        this.infoDropdownClass = 'dropdown dib show'
      } else {
        this.infoDropdownClass = 'dropdown dib'
      }
      this.messageClass = 'drop-down dropdown-menu dropdown-menu-right'
      this.messageDropdownClass = 'dropdown dib'
    },
    getLatestMessages () {
      this.$axios.get('/api/message/latest')
        .then((response) => {
          if (response.data.errno === 0) {
            this.messages = response.data.data
          } else {
            let str = '发生了某些不知名的错误...'
            this.$swal({
              title: '提交异常！',
              text: str,
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)// 打印服务端返回的数据(调试用)
          let str = '发生了某些不知名的错误...\n' + error
          this.$swal({
            title: '提交异常！',
            text: str,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/lib/menubar/sidebar.css';
  @import '../../assets/css/lib/bootstrap.min.css';
  @import '../../assets/css/style.css';
  @import '../../assets/css/lib/font-awesome.min.css';
  @import '../../assets/css/lib/themify-icons.css';
</style>
