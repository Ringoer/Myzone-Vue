<template>
  <div></div>
</template>
<script type = "text/javascript">
export default {
  data () {
    return {
    }
  },
  mounted () {
    let path = this.$route.path
    let query = this.$route.query
    if (path === '/register/verify') {
      this.MySubmit('/api/user/register/verify', query, '恭喜您注册成功！')
    } else if (path === '/user/password/verify') {
      this.MySubmit('/api/user/password/verify', query, '修改密码成功！')
    } else if (path === '/user/email/verify') {
      this.MySubmit('/api/user/email/verify', query, '验证邮箱成功！请注意确认邮件')
    } else {
      this.$swal({
        title: '无此页面',
        text: '页面走丢啦',
        type: 'error'
      })
    }
  },
  methods: {
    MySubmit (uri, query, info) {
      this.$axios.put(uri, query)
        .then((response) => {
          console.log(response)// 打印服务端返回的数据(调试用)
          if (response.data.errno === 0) {
            this.$swal({
              title: '验证成功',
              text: info,
              type: 'success'
            })
              .then(() => {
                this.$router.push('/login')
              })
          } else {
            this.$swal({
              title: '失败',
              text: response.data.errmsg,
              type: 'error'
            })
              .then(() => {
                this.$router.push('/login')
              })
          }
        })
        .catch((error) => {
          console.log(error)
          let str = '服务器维护中，请联系管理员...'
          this.$swal({
            title: '提交异常！',
            text: str,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style scoped>
    @import '../../assets/css/lib/font-awesome.min.css';
    @import '../../assets/css/lib/themify-icons.css';

    @import '../../assets/css/lib/login-custom.css';
</style>
