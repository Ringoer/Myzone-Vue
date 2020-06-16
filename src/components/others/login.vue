<template>
    <div id="login-app">
        <div class="main-bottom" style="width:100%;height:100%"></div>
        <div class="main">
            <div class="aside">
                <div class="loginArea normalForm">
                    <div class="loginType">
                        <div class="f-fl" style="color:white">
                            <h3>用户登录</h3>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <span class="arrow"></span>
                        <div class="formLogin">
                            <form id="form" method="post" class="j-login-form u-form">
                                <div class="inputArea">
                                    <div class="u-form-item u-form-item-1 forUid">
                                        <div class="wrapper">
                                            <label class="label actived"><i class="ti-user"></i></label>
                                            <div class="input-wrapper">
                                                <div class="sub-input-wrapper">
                                                    <input class="u-input" type="text" name="username" v-model="username" autocomplete="off" id="username" tabindex="1" placeholder="用户名" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-form-item u-form-item-1 forPassword">
                                        <div class="wrapper">
                                            <label class="label"><i class="ti-lock"></i></label>
                                            <div class="input-wrapper">
                                                <div class="sub-input-wrapper">
                                                    <input class="u-input" type="password" name="password" v-model="password" id="password" placeholder="密  码" tabindex="2" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                <div class="u-form-item u-form-item-2">
                                    <button class="u-btn u-btn-primary submit j-submit" type="button" v-on:click="MySubmit">
                                        登录
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type = "text/javascript">
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    if (this.$store.state.isLogin) {
      this.$router.push('/')
    }
  },
  methods: {
    MySubmit () {
      let user = {
        username: this.username,
        password: this.password
      }
      console.log(user)
      this.$axios.post('/api/user/login', user)
        .then((response) => {
          console.log(response)// 打印服务端返回的数据(调试用)
          if (response.data.errno === 0) {
            this.$swal({
              title: '成功',
              text: '登录成功！',
              type: 'success'
            })
              .then(() => {
                this.$store.dispatch('setIsLogin', true)
                this.$store.dispatch('setToken', response.data.data.token)

                this.$axios.get('/api/user/info', {
                  headers: {
                    'authorization': response.data.data.token
                  }}).then((resp) => {
                  this.$store.dispatch('setUser', resp.data.data)
                  this.$router.push('/')
                })
              })
          } else {
            this.$swal({
              title: '失败',
              text: response.data.errmsg,
              type: 'error'
            })
              .then(() => {
                location.href = '/'
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
