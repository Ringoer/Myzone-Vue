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
                            <h1 style="text-align:center">新动态</h1>
                        </div>
                        <div class="card-body">
                            <div class="basic-elements">
                                <form id="form" method="post">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <textarea id="dynamics" name="dynamics" v-model="dynamics" class="form-control" style="height: 250px" placeholder=""></textarea>
                                            </div>
                                            <br/>
                                            <button type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5" style="width:48%" @click="MyClear"> 重置 </button>
                                            <button id="button" type="button" class="btn btn-primary btn-rounded m-b-10 m-l-5" style="width:48%;float:right" @click="MyCheck"> 发送 </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-title">
                    <h1 style="text-align:center">我的动态</h1>
                  </div>
                  <br/>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                        <tr>
                          <td style="text-align:center">动态ID</td>
                          <td style="text-align:center">发布者</td>
                          <td style="text-align:center">动态内容</td>
                          <td style="text-align:center">点赞数量</td>
                          <td style="text-align:center">发布时间</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(adynamics, index) in dynamicss" :key="index">
                          <td style="text-align:center">{{adynamics.id}}</td>
                          <td style="text-align:center">{{adynamics.userId}}</td>
                          <td style="text-align:center">
                            <p v-html="adynamics.dynamics"></p>
                          </td>
                          <td style="text-align:center">{{adynamics.favorited}}</td>
                          <td style="text-align:center">{{adynamics.gmtCreate.replace('T', ' ')}}</td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MyDelete(adynamics)">
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
      dynamicss: [],
      dynamics: '',
      queryPage: '',
      page: 1,
      tabs: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.getDynamicss()
  },
  methods: {
    getDynamicss () {
      this.$axios.get('/api/dynamics', {params: {p: this.page}})
        .then((response) => {
          if (response.data.errno === 0) {
            this.dynamicss = response.data.data
          } else {
            let str = response.data.errmsg
            this.MyError(str)
          }
        })
        .catch((error) => {
          console.log(error)// 打印服务端返回的数据(调试用)
          let str = '动态系统正在维护中...\n' + error
          this.MyError(str)
        })
    },
    postDynamics () {
      return null
    },
    MyDelete (adynamics) {
      var dynamicsId = adynamics.id
      var str = '动态ID：' + dynamicsId
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
          let selectdDynamics = {
            id: dynamicsId
          }
          this.$axios.delete('/api/dynamics', {data: selectdDynamics})
            .then((response) => {
              if (response.data.errno === 0) {
                this.$swal({
                  title: '成功',
                  text: '删除id为 ' + dynamicsId + ' 的动态成功！',
                  type: 'success'
                })
                  .then(() => {
                    this.reload()
                  })
              } else {
                let str = response.data.errmsg
                this.MyError(str)
              }
            })
            .catch((error) => {
              console.log(error)// 打印服务端返回的数据(调试用)
              let str = '动态系统正在维护中...\n' + error
              this.MyError(str)
            })
        })
    },
    MyError (str) {
      this.$swal({
        title: '提交异常！',
        text: str,
        type: 'error'
      })
    },
    MyClear () {
      this.dynamics = ''
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
          let dynamicsData = {
            dynamics: this.dynamics.replace(/[\r\n]/g, '<br/>')
          }
          this.$axios.post('/api/dynamics', dynamicsData)
            .then((response) => {
              if (response.data.errno === 0) {
                let message = '发送动态成功！'
                this.$swal({
                  title: '成功',
                  text: message,
                  type: 'success'
                })
                  .then(() => {
                    this.reload()
                  })
              } else {
                let str = response.data.errmsg
                this.MyError(str)
              }
            })
            .catch((error) => {
              console.log(error)// 打印服务端返回的数据(调试用)
              let str = '动态系统正在维护中...\r' + error
              this.MyError(str)
            })
        })
    },
    MyCheck () {
      if (this.dynamics === '') {
        let str = '动态不能为空！'
        this.MyError(str)
        return 0
      }

      var str = '新动态：' + this.dynamics

      this.MySubmit(str)
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
      this.getDynamicss()
    },
    MyTurnTo () {
      var n = Math.floor(Number(this.queryPage))
      if (!(n !== Infinity && String(n) === this.queryPage && n > 0)) {
        let str = '跳转页码不合法！'
        this.MyError(str)
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
