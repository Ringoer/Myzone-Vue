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
                                        <h1 style="text-align:center">发送消息</h1>
                                    </div>
                                    <div class="card-body">
                                        <div class="basic-elements">
                                            <form id="form" method="post">
                                                <div class="row">
                                                    <div class="col-lg-4">
                                                        <div class="form-group" style="height: 90%">
                                                            <label> 选择好友 </label>
                                                            <select id="target" name="target" v-model="target" multiple  class="form-control" style="height: 100%">
                                                                <option v-for="(user, index) in friends" :key="index" :value="user.id" @click="select">{{user.username}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-8">
                                                        <div class="form-group">
                                                            <label>标题</label>
                                                            <input id="topic" name="topic" v-model="topic" type="text" class="form-control" placeholder="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label>正文</label>
                                                            <textarea id="content" name="content" v-model="content" class="form-control" style="height: 250px" placeholder=""></textarea>
                                                        </div>
                                                        <div class="form-group" style="text-align: right">
                                                            <label>剩余{{count}}字</label>
                                                        </div>
                                                        <button type="button" class="btn btn-danger btn-rounded m-b-10 m-l-5" style="width:48%" @click="MyClear"> 重置 </button>
                                                        <button id="button" type="button" class="btn btn-primary btn-rounded m-b-10 m-l-5" style="width:48%;float:right" @click="MyCheck"> 提交 </button>
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
      friends: [{id: 1, username: 'Ringoer', nickname: 'Ringoer'}, {id: 2, username: '1', nickname: 'Ringo'}, {id: 5, username: 'chotholly', nickname: 'chotholly'}],
      target: [],
      selectedIds: [],
      topic: '',
      content: '',
      count: 1000
    }
  },
  watch: {
    content: function (val) {
      this.count = 1000 - this.content.length
    }
  },
  methods: {
    select (even) {
      var id = parseInt(even.target.value)
      var pos = this.selectedIds.indexOf(id)
      if (pos < 0) {
        this.selectedIds.push(id)
      } else {
        this.selectedIds.splice(pos, 1)
      }
    },
    MyError (str) {
      this.$swal({
        title: '提交异常！',
        text: str,
        type: 'error'
      })
    },
    MyClear () {
      console.log(this.selectedIds)
      this.selectedIds.length = 0
      this.target = []
      this.topic = ''
      this.content = ''
    },
    MySubmit (str) {
      this.$swal({
        title: '发送',
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
          let messageData = {
            fromId: this.$store.state.user.id,
            topic: this.topic,
            content: this.content.replace(/[\r\n]/g, '<br/>'),
            type: '好友'
          }
          this.$axios.post('/api/message', {message: messageData, ids: this.selectedIds})
            .then((response) => {
              if (response.data.errno === 0) {
                let message = '消息发送成功！'
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
              let str = '消息系统正在维护中...\r' + error
              this.MyError(str)
            })
        })
    },
    MyCheck () {
      if (this.selectedIds.length < 1) {
        let str = '请选择发送目标！'
        this.MyError(str)
        return 0
      }
      if (this.topic.length < 1) {
        let str = '标题不能为空！'
        this.MyError(str)
        return 0
      }
      if (this.content.length < 1) {
        let str = '正文不能为空！'
        this.MyError(str)
        return 0
      }

      if (this.count < 0) {
        let str = '正文字数过多！'
        this.MyError(str)
        return 0
      }

      var str = '确定要发送吗？'

      this.MySubmit(str)
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
