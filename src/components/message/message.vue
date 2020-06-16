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
                    <h1 style="text-align:center">我的消息</h1>
                    <div class="col-lg-1" style="float:left">
                      <a href="javascript:void(0)" @click="AllDelete" type="button" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="fa fa-trash"></i> 批量删除 </a>
                    </div>
                    <div class="col-lg-1" style="float:left">
                      <a href="javascript:void(0)" @click="$router.push('/message/add')" type="button" class="btn btn-success btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i> 发送消息 </a>
                    </div>
                    <div class="col-lg-1" style="float:left">
                      <a href="javascript:void(0)" @click="updateMessages(true)" type="button" class="btn btn-info btn-flat btn-addon m-b-10 m-l-5"><i class="fa fa-check"></i> 标为已读 </a>
                    </div>
                    <div class="col-lg-1" style="float:left">
                      <a href="javascript:void(0)" @click="updateMessages(false)" type="button" class="btn btn-default btn-flat btn-addon m-b-10 m-l-5"><i class="fa fa-close"></i> 标为未读 </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                        <tr>
                          <td style="text-align:center">
                            <input type="checkbox" id="selectAll" @click="selectAll">
                          </td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MySearchByType('')">
                              类型
                            </a>
                          </td>
                          <td style="text-align:center">标题</td>
                          <td style="text-align:center">发件人</td>
                          <td style="text-align:center">发送时间</td>
                          <td style="text-align:center">未读/已读</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(message, index) in messages" :key="index">
                          <td style="text-align:center">
                            <input type="checkbox" name="selectedMessage">
                          </td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="MySearchByType(message.type)">
                              <span v-if="message.beRead">{{message.type}}</span>
                              <b v-else>{{message.type}}</b>
                            </a>
                          </td>
                          <td style="text-align:center">
                            <a href="javascript:void(0)" @click="$router.push('/message/' + message.id)">
                              <span v-if="message.beRead">{{message.topic}}</span>
                              <b v-else>{{message.topic}}</b>
                            </a>
                          </td>
                          <td style="text-align:center">
                            <span v-if="message.beRead">{{message.fromNickname}}</span>
                            <b v-else>{{message.fromNickname}}</b>
                          </td>
                          <td style="text-align:center">
                            <span v-if="message.beRead">{{message.sendTime.replace('T', ' ')}}</span>
                            <b v-else>{{message.sendTime.replace('T', ' ')}}</b>
                          </td>
                          <td style="text-align:center">
                            <span v-if="message.beRead">已读</span>
                            <b v-else>未读</b>
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
      messages: [],
      message: null,
      queryString: '',
      queryPage: '',
      page: 1,
      tabs: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.getMessages()
  },
  methods: {
    selectAll () {
      var obj = document.getElementById('selectAll')
      var checkboxs = document.getElementsByName('selectedMessage')
      if (obj.checked) {
        for (var i = 0; i < checkboxs.length; i++) {
          checkboxs[i].checked = true
        }
      } else {
        for (i = 0; i < checkboxs.length; i++) {
          checkboxs[i].checked = false
        }
      }
    },
    getMessages () {
      this.$axios.get('/api/message', {params: {q: this.queryString, p: this.page}})
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
    },
    updateMessages (isRead) {
      var str = (isRead) ? '已读' : '未读'
      var checkboxs = document.getElementsByName('selectedMessage')
      var i = 0
      var selectedMessageIds = []
      for (i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          selectedMessageIds.push(this.messages[i].id)
        }
      }
      this.$swal({
        title: '确定',
        text: '确定要标为' + str + '吗？',
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
          this.$axios.put('/api/message', {ids: selectedMessageIds, isRead: isRead})
            .then((response) => {
              this.$swal({
                title: '成功',
                text: '标为' + str + '成功！',
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
    AllDelete () {
      var checkboxs = document.getElementsByName('selectedMessage')
      var i = 0
      var selectedMessageIds = []
      for (i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          selectedMessageIds.push(this.messages[i].id)
        }
      }
      this.$swal({
        title: '确定要删除吗？',
        text: '此操作不可撤销',
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
          this.$axios.delete('/api/message/all', {data: selectedMessageIds})
            .then((response) => {
              this.$swal({
                title: '成功',
                text: '删除成功！',
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
    MyError (str) {
      this.$swal({
        title: '提交异常！',
        text: str,
        type: 'error'
      })
    },
    MySearchByType (type) {
      this.queryString = type
      this.getMessages()
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
      this.getMessages()
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
