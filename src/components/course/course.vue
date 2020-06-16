<template>
  <div>
    <!-- <div th:replace="Common/sidebar::sidebar"></div> -->
        <!-- <div th:replace="Common/header::header"></div> -->
    <div class="content-wrap">
      <div class="main">
        <div class="container-fluid">
          <section id="main-content">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-title">
                    <h1 style="text-align:center">我的课程</h1>
                    <div class="col-lg-10" style="float:left">
                      <input id="queryString" name="queryString" type="text" v-model="queryString" class="form-control" placeholder="搜索关键词请使用空格隔开（不支持模糊搜索）">
                      <a href="javascript:void(0)" @click="MySearch" style="position:absolute;top:20px;right:35px"><i class="ti-search"></i></a>
                    </div>
                    <div class="col-lg-2" style="float:right">
                      <a href="javascript:void(0)" @click="$router.push('/course/add')" type="button" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5" style="float:right"><i class="ti-plus"></i>添加课程</a>
                    </div>
                  </div>
                  <br/>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                        <tr>
                          <td style="text-align:center">课程ID</td>
                          <td style="text-align:center">课程名称</td>
                          <td style="text-align:center">上课日期</td>
                          <td style="text-align:center">上课地点</td>
                          <td style="text-align:center">任课教师</td>
                          <td style="text-align:center">课程学分</td>
                          <td style="text-align:center">编辑课程</td>
                          <td style="text-align:center">删除课程</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(course, index) in courses" :key="index">
                          <td style="text-align:center">{{course.id}}</td>
                          <td style="text-align:center">{{course.courseName}}</td>
                          <td style="text-align:center">{{course.date}}</td>
                          <td style="text-align:center">{{course.place}}</td>
                          <td style="text-align:center">{{course.teacher}}</td>
                          <td style="text-align:center">{{course.credit}}</td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MyEdit(course)">
                              <i class="fa fa-pencil-square-o fa-lg"></i>
                            </a>
                          </td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MyDelete(course)">
                              <i class="fa fa-trash fa-lg"></i>
                            </a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-lg-12" style="text-align:center">
                      <div class="card-body">
                        <a href="javascript:void(0)" @click="MyChangePage(page - 1)" type="button" class="btn btn-default btn-outline m-b-10">
                          &lt;
                        </a>
                        <a href="javascript:void(0)" @click="MyChangePage(tab)" type="button" class="btn btn-default btn-outline m-b-10" v-bind:style="{ 'background-color': (tab === page)?'grey':'', 'color': (tab === page)?'white':'' }" v-for="(tab, index) in tabs" :key="index">
                          {{ tab }}
                        </a>
                        <a href="javascript:void(0)" @click="MyChangePage(page + 1)" type="button" class="btn btn-default btn-outline m-b-10">
                          &gt;
                        </a>
                        &nbsp;
                        <span>
                          转到第
                          <input id="queryPage" name="queryPage" type="text" v-model="queryPage" style="width: 40px; text-align: center">
                          页
                        </span>
                        <a href="javascript:void(0)" @click="MyTurnTo" type="button" class="btn btn-success btn-sm m-b-10 m-l-5" style="margin-top: 10px"> 跳转 </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div th:replace="Common/footer::footer"></div> -->
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      courses: [],
      queryString: '',
      queryPage: '',
      page: 1,
      tabs: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.getCourses()
  },
  methods: {
    getCourses () {
      this.$axios.get('/api/course', {params: {q: this.queryString, p: this.page}})
        .then((response) => {
          if (response.data.errno === 0) {
            this.courses = response.data.data
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
    },
    postCourse () {
      return null
    },
    MyDelete (course) {
      var courseId = course.id
      var courseName = course.courseName
      var courseDate = course.date
      var coursePlace = course.place
      var courseTeacher = course.teacher
      var str = '课程信息' +
              '\n课程ID：' + courseId +
              '\n课程名称：' + courseName +
              '\n上课时间：' + courseDate +
              '\n上课地点：' + coursePlace +
              '\n任课教师：' + courseTeacher
      this.$swal({
        title: '确定要删除吗？',
        text: str,
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '确定'
      })
        .then((isConfirm) => {
          console.log(isConfirm)
          if (isConfirm.value == null) {
            return 0
          }
          let selectdCourse = {
            id: courseId
          }
          this.$axios.delete('/api/course', {data: selectdCourse})
            .then((response) => {
              this.$swal({
                title: '成功',
                text: '删除id为 ' + courseId + ' 的课程成功！',
                type: 'success'
              })
                .then(() => {
                  this.reload()
                })
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
        })
    },
    MySearch () {
      this.MyChangePage(1)
    },
    MyEdit (course) {
      this.$store.dispatch('setCourse', course)
      this.$router.push('/course/edit')
    },
    MyChangePage (tab) {
      this.page = tab
      let values = [0, 0, 0, 0, 0]
      if (tab >= 3) {
        for (var i = 0; i < 5; i++) {
          values[i] = tab - 2 + i
        }
      } else {
        for (i = 0; i < 5; i++) {
          values[i] = i + 1
        }
      }
      this.tabs = values
      this.getCourses()
    },
    MyTurnTo () {
      var n = Math.floor(Number(this.queryPage))
      if (!(n !== Infinity && String(n) === this.queryPage && n > 0)) {
        let str = '跳转页码不合法！'
        this.$swal({
          title: '提交异常！',
          text: str,
          type: 'error'
        })
      } else {
        this.MyChangePage(Number(this.queryPage))
      }
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/lib/font-awesome.min.css';
  @import '../../assets/css/lib/themify-icons.css';
  @import '../../assets/css/lib/menubar/sidebar.css';
  @import '../../assets/css/lib/bootstrap.min.css';
  @import '../../assets/css/lib/helper.css';
  @import '../../assets/css/style.css';
  @import '../../assets/css/lib/sweetalert/sweetalert.css';
</style>
