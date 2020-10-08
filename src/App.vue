<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="!this.$store.state.isLogin" name="login"/>
    <router-view v-if="!this.$store.state.isLogin" name="register"/>
    <router-view v-if="this.$route.path.endsWith('verify')" name="verify"/>
    <div v-if="this.$store.state.isLogin">
      <sideBar id="sideBar" v-show="this.$store.state.isSideBar"></sideBar>
      <!-- <div :style="{width:this.$store.state.widthOfMain}" class="mainBody"> -->
      <div class="mainBody">
        <sideHeader class="sideHeader" v-if="this.$store.state.isLogin"></sideHeader>
        <router-view class="mainContent" v-if="this.$store.state.isLogin && this.isRouterAlive" name="default"/>
        <sideFooter class="sideFooter" v-if="this.$store.state.isLogin"></sideFooter>
      </div>
    </div>
  </div>
</template>

<script>
import sideHeader from './components/common/header'
import sideBar from './components/common/sidebar'
import sideFooter from './components/common/footer'
export default {
  name: 'App',
  components: {
    sideHeader,
    sideBar,
    sideFooter
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    change () {
      this.$store.dispatch('setIsLogin', !this.$store.state.isLogin)
    },
    isLogin () {
      if (!this.$store.state.isLogin) {
        let localToken = localStorage.getItem('token')
        if (localToken) {
          this.$axios.get('/api/user/info', {
            headers: {
              'authorization': localToken
            }}).then((resp) => {
            if (resp.data.errno === 0) {
              this.$store.dispatch('setUser', resp.data.data)
              this.$store.dispatch('setIsLogin', true)
              this.$store.dispatch('setToken', localToken)
            } else {
              this.$router.replace('/login')
            }
          })
        } else if (this.$route.path !== '/register') {
          this.$router.replace('/login')
        }
      }
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
#sideBar {
  display:inline-block;
  width: 200px;
}
.mainBody {
  /* float:right; */
  position: relative;
  height: 95vh;
  -webkit-transition:width 0.5s;
  width: 1480px;
  margin: auto;
}
.sideHeader .mainContent .sideFooter {
  width: 100%;
}
.sideHeader {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
.mainContent {
  min-height: 780px;
}
/* .sideFooter {
  position: absolute;
  bottom: 0;
  width: 100%;
} */
@media screen and (max-width: 1500px) {
  .mainBody {
    width: 90%;
  }
}
@media screen and (max-width: 800px) {
  .sideHeader {
    width: 100vw;
  }
}
</style>
