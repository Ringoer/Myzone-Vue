<template>
    <div class="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
        <div class="nano">
            <div class="nano-content">
                <ul>
                    <br/>
                    <div class="logo">
                        <span style="text-align:center;color:white" v-text="message">Myzone</span>
                         <br/>
                         <!-- <span style="text-align:center"> -->
                            <!-- <span th:text="'第' + ${week} + '周'"></span> -->
                            <!-- <span th:text="${weekday}"></span> -->
                        <!-- </span> -->
                    </div>
                    <li class="label">菜单</li>
                    <li>
                        <a @click="jump('/')">
                            <i class="ti-home"></i> 主页
                        </a>
                    </li>
                    <li>
                      <a @click="jump('/score')">
                        <i class="fa fa-file-text-o"></i>
                        我的成绩
                      </a>
                    </li>
                    <li>
                      <a @click="jump('/friend')">
                        <i class="fa fa-users"></i>
                        我的好友
                      </a>
                    </li>
                    <li>
                      <a @click="jump('/friend/message')">
                        <i class="fa fa-comments-o"></i>
                        好友动态
                      </a>
                    </li>
                    <li>
                      <a @click="jump('/message')">
                        <i class="fa fa-comment-o"></i>
                        我的说说
                      </a>
                    </li>
                    <li>
                        <a @click="change('course')">
                            <i class="ti-layout-grid4-alt"></i>
                            我的课程
                            <span class="sidebar-collapse-icon ti-angle-down"></span>
                        </a>
                    </li>
                    <div>
                      <li>
                        <a @click="jump('/course')" v-show="this.isCourse">
                        课程一览
                        </a>
                      </li>
                      <li>
                        <a @click="jump('/course/add')" v-show="this.isCourse">
                        添加课程
                        </a>
                      </li>
                    </div>
                    <li>
                      <a @click="jump('/setting')">
                        <i class="fa fa-cog"></i>
                        个人设置
                      </a>
                    </li>
                    <li><a @click="test">store测试</a></li>
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
      isCourse: false
    }
  },
  watch: {
    $route () {
      this.message = 'Hello ' + this.$store.state.username + '!'
    }
  },
  methods: {
    test () {
      console.log(this.$store.state)
    },
    change (opt) {
      if (opt === 'course') {
        this.isCourse = !this.isCourse
      }
    },
    jump (curPath) {
      // console.log(curPath)
      if (!(this.$route.path === curPath)) {
        this.$router.push(curPath)
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
