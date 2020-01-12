<template>
    <div id="index-app">
        <!-- <sideHeader></sideHeader> -->
        <!-- <sideBar></sideBar> -->
        <div class="content-wrap">
            <div class="main">
                <div class="container-fluid">
                    <section id="main-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-title">
                                        <h1 style="text-align:center">今日课程表</h1>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <td style="text-align:center">课程名称</td>
                                                    <td style="text-align:center">上课时间</td>
                                                    <td style="text-align:center">上课地点</td>
                                                    <td style="text-align:center">任课教师</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(course, index) in courses" :key="index">
                                                    <td style="text-align:center">{{course.courseName}}</td>
                                                    <td style="text-align:center">{{course.date}}</td>
                                                    <td style="text-align:center">{{course.place}}</td>
                                                    <td style="text-align:center">{{course.teacher}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="card">
                                    <div class="card-title">
                                        <h4>艾尔之光新闻</h4>
                                    </div>
                                    <div class="recent-comment m-t-15">
                                        <ul>
                                            <li v-for="(elsInfo, index) in elsInfos" :key="index">
                                                <div class="media">
                                                    <div class="media-body">
                                                        <a v-bind:href="elsInfo.url" target="_blank">
                                                            <h4 class="media-heading color-info" style="text-align:left">{{elsInfo.type}}&emsp;{{elsInfo.title}}</h4>
                                                        </a>
                                                        <p class="comment-date">{{elsInfo.date}}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /# row -->
                        <!-- <sideFooter></sideFooter> -->
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      courses: [],
      elsInfos: []
    }
  },
  created () {
    this.getElsInfos()
  },
  mounted () {
    this.getTodayCourses()
  },
  watch: {
    $route () {
      window.location.reload()
    }
  },
  methods: {
    getTodayCourses () {
      this.$axios.get('/api/course/today')
        .then((response) => {
          this.courses = response.data.data
        })
    },
    getElsInfos () {
      this.$axios.get('/api/news/elsInfo')
        .then((response) => {
          this.elsInfos = response.data.data
        })
    }
  }
}
</script>

<style scoped>
    @import '../assets/css/lib/font-awesome.min.css';
    @import '../assets/css/lib/themify-icons.css';
    @import '../assets/css/lib/menubar/sidebar.css';
    @import '../assets/css/lib/bootstrap.min.css';
    @import '../assets/css/lib/helper.css';
    @import '../assets/css/style.css';
</style>
