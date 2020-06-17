<template>
    <div id="index-app">
        <!-- <sideHeader></sideHeader> -->
        <!-- <sideBar></sideBar> -->
        <div class="content-wrap">
            <div class="main">
                <div class="container-fluid">
                    <section id="main-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body" style="text-align: left">
                                        <div class="user-profile">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="user-photo m-b-30">
                                                    <img class="img-fluid" :src="user.avatar" alt="" width="100%" height="100%" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="custom-tab user-profile-tab">
                                                        <div class="tab-content">
                                                            <div role="tabpanel" class="tab-pane active" id="1">
                                                                <div class="basic-information">
                                                                    <h3> 基本信息 </h3>
                                                                    <br/>
                                                                    <div class="nickname-content">
                                                                        <span class="contact-title"> 昵称: </span>
                                                                        <span class="nickname"> {{user.nickname}} </span>
                                                                    </div>
                                                                    <div class="username-content">
                                                                        <span class="contact-title"> 用户名: </span>
                                                                        <span class="username"> {{user.username}} </span>
                                                                    </div>
                                                                    <div class="signature-content">
                                                                        <span class="contact-title"> 个性签名: </span>
                                                                        <span class="signature"> {{user.signature}} </span>
                                                                    </div>
                                                                    <div class="birthday-content">
                                                                        <span class="contact-title"> 生日: </span>
                                                                        <span class="birth-date"> {{user.birthday.split('T')[0]}} </span>
                                                                    </div>
                                                                    <div class="gender-content">
                                                                        <span class="contact-title"> 性别: </span>
                                                                        <span class="gender"> {{(user.gender) ? '男' : '女'}} </span>
                                                                    </div>
                                                                    <div class="registerTime-content">
                                                                        <span class="contact-title"> 注册时间: </span>
                                                                        <span class="registerTime"> {{user.gmtCreate.replace('T', ' ')}} </span>
                                                                    </div>
                                                                    <div class="role-content">
                                                                        <span class="contact-title"> 用户权限: </span>
                                                                        <span class="role"> {{roles[user.roleId]}} </span>
                                                                    </div>
                                                                </div>
                                                                <ul class="nav nav-tabs" role="tablist"></ul>
                                                                <div class="contact-information">
                                                                    <h3> 联系方式 </h3>
                                                                    <br/>
                                                                    <div class="phone-content">
                                                                        <span class="contact-title"> 电话号码: </span>
                                                                        <span class="phone-number"> {{user.mobile}} </span>
                                                                    </div>
                                                                    <div class="email-content">
                                                                        <span class="contact-title"> 电子邮件: </span>
                                                                        <span class="contact-email"> 未设置 </span>
                                                                    </div>
                                                                    <div class="website-content">
                                                                        <span class="contact-title"> 个人主页: </span>
                                                                        <span class="contact-website"> 未设置 </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /# row -->
                        <!-- <sideFooter></sideFooter> -->
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.user,
      roles: ['系统', '普通用户', '管理员']
    }
  },
  methods: {
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
</style>
