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
                                    <div class="card-title" style="background: rgb(239,245,251)">
                                        <br/>
                                        <p style="text-align: left; margin-left: 20px"><b> {{message.topic}} </b></p>
                                        <p style="text-align: left; margin-left: 20px"> 发件人：{{message.fromNickname + ' &lt; ' + message.fromUsername + ' &gt;'}} </p>
                                        <p style="text-align: left; margin-left: 20px"> 时&emsp;间：{{message.sendTime.replace('T', ' ')}} </p>
                                        <p style="text-align: left; margin-left: 20px"> 收件人：{{message.toNickname + ' &lt; ' + message.toUsername + ' &gt;'}} </p>
                                        <br/>
                                    </div>
                                    <br/>
                                    <div class="card-body">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <p style="text-align: left" v-html="message.content"></p>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-default btn-outline m-b-10" @click="$router.push('/message')" style="float: left"> 返回 </button>
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
      message: {
        topic: '',
        content: '',
        sendTime: '',
        fromNickname: '',
        fromId: '',
        toNickname: '',
        toId: ''
      }
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      this.$axios.get('/api' + this.$route.path)
        .then((response) => {
          if (response.data.errno === 0) {
            this.message = response.data.data
          } else {
            let str = '消息系统正在维护中...'
            this.MyError(str)
          }
        })
        .catch((error) => {
          console.log(error)// 打印服务端返回的数据(调试用)
          let str = '消息系统正在维护中...\n' + error
          this.MyError(str)
        })
    },
    MyError (str) {
      this.$swal({
        title: '提交异常！',
        text: str,
        type: 'error'
      })
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
