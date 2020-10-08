<template>
    <div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
        <div class="nano">
            <div class="nano-content">
                <ul>
                    <br/>
                    <div class="logo">
                        <span style="text-align:center;color:white" v-text="message">菜单</span>
                         <br/>
                    </div>
                    <li class="label">
                        <span @click="$store.dispatch('setIsSideBar')">
                            &lt;&lt;收起
                        </span>
                    </li>
                    <li :class="(isIndex)?'active':''">
                        <a @click="jump('/')">
                            <i class="ti-home"></i> 我的主页
                        </a>
                    </li>
                    <li :class="(isUserInfo)?'active':''">
                      <a @click="jump('/user/info')">
                        <i class="ti-user"></i>
                        个人信息
                      </a>
                    </li>
                    <li :class="(isCourse)?'active':''">
                      <a @click="jump('/course')">
                        <i class="fa fa-file-text-o"></i>
                        课程一览
                      </a>
                    </li>
                    <li :class="(isMessage)?'active':''">
                      <a @click="jump('/message')">
                        <i class="fa fa-list-ul"></i>
                        消息一览
                      </a>
                    </li>
                    <li v-show="false">
                      <a @click="jump('/friend')">
                        <i class="fa fa-users"></i>
                        我的好友
                      </a>
                    </li>
                    <li v-show="false">
                      <a @click="jump('/friend/dynamics')">
                        <i class="fa fa-comments-o"></i>
                        好友动态
                      </a>
                    </li>
                    <li :class="(isDynamics)?'active':''">
                      <a @click="jump('/dynamics')">
                        <i class="fa fa-comment-o"></i>
                        我的说说
                      </a>
                    </li>
                    <li v-show="false">
                      <a @click="change('course')">
                        <i class="ti-layout-grid4-alt"></i>
                        我的课程
                        <span class="sidebar-collapse-icon ti-angle-down"></span>
                      </a>
                    </li>
                    <div>
                      <li>
                        <a @click="jump('/course')" v-show="false">
                        课程一览
                        </a>
                      </li>
                      <li>
                        <a @click="jump('/course/add')" v-show="false">
                        添加课程
                        </a>
                      </li>
                    </div>
                    <li v-show="false">
                      <a @click="jump('/setting')">
                        <i class="fa fa-cog"></i>
                        个人设置
                      </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Myzone',
      isIndex: true,
      isUserInfo: false,
      isCourse: false,
      isMessage: false,
      isDynamics: false
    }
  },
  mounted () {
    this.isIndex = false
    this.isUserInfo = false
    this.isCourse = false
    this.isMessage = false
    this.isDynamics = false
    if (this.$route.path === '/') {
      this.isIndex = true
    } else if (this.$route.path === '/user/info') {
      this.isUserInfo = true
    } else if (this.$route.path === '/course') {
      this.isCourse = true
    } else if (this.$route.path === '/message') {
      this.isMessage = true
    } else if (this.$route.path === '/dynamics') {
      this.isDynamics = true
    }
  },
  watch: {
    $route () {
      this.isIndex = false
      this.isUserInfo = false
      this.isCourse = false
      this.isMessage = false
      this.isDynamics = false
      if (this.$route.path === '/') {
        this.isIndex = true
      } else if (this.$route.path === '/user/info') {
        this.isUserInfo = true
      } else if (this.$route.path === '/course') {
        this.isCourse = true
      } else if (this.$route.path === '/message') {
        this.isMessage = true
      } else if (this.$route.path === '/dynamics') {
        this.isDynamics = true
      }
    }
  },
  methods: {
    change (opt) {
      if (opt === 'course') {
        this.isCourse = !this.isCourse
      }
    },
    jump (curPath) {
      // console.log(curPath)
      if (!(this.$route.path === curPath)) {
        this.$router.push(curPath)
        this.$store.dispatch('setIsSideBar')
      }
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/lib/menubar/sidebar.css';
  @import '../../assets/css/lib/font-awesome.min.css';
  @import '../../assets/css/lib/themify-icons.css';
</style>
