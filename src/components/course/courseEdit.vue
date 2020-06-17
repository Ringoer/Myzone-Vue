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
                                        <h1 style="text-align:center">添加课程</h1>
                                    </div>
                                    <div class="card-body">
                                        <div class="basic-elements">
                                            <form id="form" method="post">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label>课程名称</label>
                                                            <input id="courseName" name="courseName" v-model="courseName" type="text" class="form-control" placeholder="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label>任课教师</label>
                                                            <input id="teacher" name="teacher" v-model="teacher" type="text" class="form-control" placeholder="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label>上课地点</label>
                                                            <input id="place" name="place" v-model="place" type="text" class="form-control" placeholder="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label>课程学分</label>
                                                            <input id="credit" name="credit" v-model="credit" type="text" class="form-control" placeholder="">
                                                        </div>
                                                        <br/>
                                                        <button type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5" style="width:48%" @click="MyClear"> 重置 </button>
                                                        <button id="button" type="button" class="btn btn-primary btn-rounded m-b-10 m-l-5" style="width:48%;float:right" @click="MyCheck"> 提交 </button>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label>上课日期</label>
                                                            <select id="weekday" v-model="weekday" class="form-control">
                                                                <option>周一</option>
                                                                <option>周二</option>
                                                                <option>周三</option>
                                                                <option>周四</option>
                                                                <option>周五</option>
                                                                <option>周六</option>
                                                                <option>周日</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>单双周</label>
                                                            <select id="isOddWeek" v-model="isOddWeek" class="form-control">
                                                                <option>每周</option>
                                                                <option>单周</option>
                                                                <option>双周</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>开始上课节次</label>
                                                            <select id="beginTime" v-model="beginTime" class="form-control">
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                                <option>11</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>结束上课节次</label>
                                                            <select id="endTime" v-model="endTime" class="form-control">
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                                <option>11</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>上课时间</label>
                                                            <input id="date" name="date" v-model="date" class="form-control" type="text" value="周一1-1节" readonly="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
      course: this.$store.state.course,
      courseName: '',
      teacher: '',
      credit: 0,
      place: '',
      weekday: '',
      isOddWeek: '',
      beginTime: 1,
      endTime: 2,
      date: ''
    }
  },
  mounted () {
    if (this.course == null) {
      this.$router.push('/')
    } else {
      this.courseName = this.course.courseName
      this.teacher = this.course.teacher
      this.credit = this.course.credit
      this.place = this.course.place
      this.weekday = this.course.weekday
      this.isOddWeek = this.course.isOddWeek
      this.beginTime = this.course.beginTime
      this.endTime = this.course.endTime
      this.date = this.course.date
    }
  },
  watch: {
    weekday: function (val) {
      this.MyChange()
    },
    isOddWeek: function (val) {
      this.MyChange()
    },
    beginTime: function (val) {
      this.MyChange()
    },
    endTime: function (val) {
      this.MyChange()
    }
  },
  methods: {
    MyError (str) {
      this.$swal({
        title: '提交异常！',
        text: str,
        type: 'error'
      })
    },
    MyClear () {
      this.courseName = ''
      this.teacher = ''
      this.credit = 0
      this.place = ''
      this.isOddWeek = ''
      this.weekday = ''
      this.beginTime = 1
      this.endTime = 2
      this.date = ''
    },
    MySubmit (str) {
      this.$swal({
        title: '确定要提交吗？',
        text: str,
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '确定'
      })
        .then((isConfirm) => {
          if (isConfirm.value == null) {
            return 0
          }
          let courseData = {
            id: this.course.id,
            userId: this.course.userId,
            courseName: this.courseName,
            teacher: this.teacher,
            credit: this.credit,
            place: this.place,
            weekday: this.weekday,
            isOddWeek: this.isOddWeek,
            beginTime: this.beginTime,
            endTime: this.endTime,
            date: this.date
          }
          this.$axios.put('/api/course', courseData)
            .then((response) => {
              if (response.data.errno === 0) {
                let message = '编辑 ' + this.courseName + ' 课程成功！'
                this.$swal({
                  title: '成功',
                  text: message,
                  type: 'success'
                })
                  .then(() => {
                    this.$store.dispatch('setCourse', null)
                    this.$router.push('/course')
                  })
              } else {
                let str = response.data.errmsg
                this.MyError(str)
              }
            })
            .catch((error) => {
              console.log(error)// 打印服务端返回的数据(调试用)
              let str = '发生了某些不知名的错误...\r' + error
              this.MyError(str)
            })
        })
    },
    MyCheck () {
      if (this.courseName === '') {
        let str = '课程名称不能为空！'
        this.MyError(str)
        return 0
      }
      if (this.date === '') {
        let str = '上课时间不能为空！'
        this.MyError(str)
        return 0
      }
      if (this.place === '') {
        let str = '上课地点不能为空！'
        this.MyError(str)
        return 0
      }
      if (this.teacher === '') {
        let str = '任课教师不能为空！'
        this.MyError(str)
        return 0
      }
      if (this.credit === '') {
        let str = '课程学分不能为空！'
        this.MyError(str)
        return 0
      }

      if (parseInt(this.beginTime) > parseInt(this.endTime)) {
        let str = '课程起止时间错误！'
        this.MyError(str)
        return 0
      }

      var str = '课程信息' +
          '\n课程名称：' + this.courseName +
          '\n上课时间：' + this.date +
          '\n上课地点：' + this.place +
          '\n任课教师：' + this.teacher +
          '\n课程学分：' + this.credit

      this.MySubmit(str)
    },
    MyChange () {
      let str = this.weekday

      if (this.isOddWeek === '单周') {
        str = str + '(单周)'
      } else if (this.isOddWeek === '双周') {
        str = str + '(双周)'
      }

      str = str + this.beginTime + '-' + this.endTime + '节'

      this.date = str
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
