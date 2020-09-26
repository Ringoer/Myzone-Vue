<template>
    <div id="register-app">
        <div class="main-bottom" style="width:100%;height:100%"></div>
        <div class="main">
            <div class="aside">
                <div class="loginArea normalForm">
                    <div class="loginType">
                        <div class="f-fl" style="color:white">
                            <h3>用户注册</h3>
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
                                                    <input class="u-input" type="password" name="password" v-model="password" id="password" placeholder="密码" tabindex="2" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-form-item u-form-item-1 forPassword">
                                        <div class="wrapper">
                                            <label class="label"><i class="ti-lock"></i></label>
                                            <div class="input-wrapper">
                                                <div class="sub-input-wrapper">
                                                    <input class="u-input" type="password" name="password" v-model="confirmPassword" id="confirmPassword" placeholder="确认密码" tabindex="3" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-form-item u-form-item-1 forPassword">
                                        <div class="wrapper">
                                            <label class="label"><i class="ti-email"></i></label>
                                            <div class="input-wrapper">
                                                <div class="sub-input-wrapper">
                                                    <input class="u-input" type="email" name="email" v-model="email" id="email" placeholder="电子邮件" tabindex="4" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <div class="u-form-item u-form-item-2">
                                    <button class="u-btn u-btn-primary submit" type="button" v-on:click="MySubmit" style="width: 100%">
                                        注册
                                    </button>
                                </div>
                                <div style="display: flex; justify-content: flex-end">
                                    <a class="reg-login" href="javascript:void(0)" @click="$router.push('/login')">已有账号？立即登录</a>
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
      password: '',
      confirmPassword: '',
      email: ''
    }
  },
  mounted () {
    if (this.$store.state.isLogin) {
      this.$router.push('/')
    }
  },
  methods: {
    MyCheck () {
      if (this.username.match(/\w+/)[0] !== this.username ||
      this.password !== this.confirmPassword ||
      this.email.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)[0] !== this.email) {
        return false
      }
      return true
    },
    MySubmit () {
      if (!this.MyCheck()) {
        this.$swal({
          title: '失败',
          text: '用户名中只能包含英文字符以及数字',
          type: 'error'
        })
        return
      }
      let user = {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.email
      }
      this.$axios.post('/api/user/register', user)
        .then((response) => {
          console.log(response)// 打印服务端返回的数据(调试用)
          if (response.data.errno === 0) {
            this.$swal({
              title: '提交成功',
              text: '注册邮件已经发送到指定邮箱，请确认',
              type: 'info'
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
                this.password = ''
                this.confirmPassword = ''
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
