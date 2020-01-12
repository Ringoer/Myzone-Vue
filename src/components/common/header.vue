<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="float-left">
                        <div class="hamburger sidebar-toggle" @click="$store.dispatch('changeSideBar')">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                        </div>
                    </div>
                    <!-- /# 选项卡开关 -->
                    <div class="float-right">
                        <div class="dropdown dib">
                            <div class="header-icon" data-toggle="dropdown">
                                <i class="ti-bell"></i>
                                <div class="drop-down dropdown-menu dropdown-menu-right">
                                    <div class="dropdown-content-heading">
                                        <span class="text-left">通知</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown dib">
                            <div class="header-icon" data-toggle="dropdown">
                                <i class="ti-email"></i>
                                <div class="drop-down dropdown-menu dropdown-menu-right">
                                    <div class="dropdown-content-heading">
                                        <span class="text-left">私信</span>
                                        <a href="email.html">
                                            <i class="ti-pencil-alt pull-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown dib">
                            <div class="header-icon" data-toggle="dropdown">
                                <span class="user-avatar" v-text="this.$store.state.username" @click="isShow = !isShow">user
                                    <i class="ti-angle-down f-s-10"></i>
                                </span>
                                <div v-if="isShow" class="card" style="margin-left:-150px;width:200px;display:block;position:fixed;z-index:999999">
                                    <div class="dropdown-content-body">
                                        <ul style>
                                            <li>
                                                <a @click="jump('/info')">
                                                    <i class="ti-user"></i>
                                                    <span>个人信息</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="jump('/settings')">
                                                    <i class="ti-settings"></i>
                                                    <span>设置</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="logout">
                                                    <i class="ti-power-off"></i>
                                                    <span>登出</span>
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
      isShow: false
    }
  },
  methods: {
    jump (curPath) {
      console.log(this.$route.path)
      if (!(this.$route.path === curPath)) {
        this.$router.push(curPath)
      }
    },
    logout () {
      this.$store.dispatch('setIsLogin', false)
      this.$router.push('/login')
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
