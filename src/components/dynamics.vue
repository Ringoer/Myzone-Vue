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
                    <h1 style="text-align:center">动态一览</h1>
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
                          <td style="text-align:center">{{adynamics.dynamics}}</td>
                          <td style="text-align:center">{{adynamics.favorited}}</td>
                          <td style="text-align:center">{{adynamics.gmtCreate}}</td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MyDelete(adynamics)">
                              <i class="fa fa-trash fa-lg"></i>
                            </a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
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
      dynamicss: []
    }
  },
  mounted () {
    this.getDynamicss()
  },
  methods: {
    getDynamicss () {
      this.$axios.get('/api/dynamics')
        .then((response) => {
          if (response.data.errno === 0) {
            this.dynamicss = response.data.data
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
    postDynamics () {
      return null
    },
    MyDelete (adynamics) {
      var dynamicsId = adynamics.id
      var dynamicsUserId = adynamics.userId
      var dynamicsDynamics = adynamics.dynamics
      var dynamicsFavorited = adynamics.favorited
      var dynamicsCreate = adynamics.gmtCreate
      var str = '动态信息' +
              '\n动态ID：' + dynamicsId +
              '\n发布者：' + dynamicsUserId +
              '\n动态内容：' + dynamicsDynamics +
              '\n点赞数量：' + dynamicsFavorited +
              '\n发布时间：' + dynamicsCreate
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
              this.$swal({
                title: '成功',
                text: '删除id为 ' + dynamicsId + ' 的动态成功！',
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
  @import '../assets/css/lib/sweetalert/sweetalert.css';
</style>
