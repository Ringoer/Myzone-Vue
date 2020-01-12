<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="!this.$store.state.isLogin" name="login"/>
    <sideBar v-if="this.$store.state.isLogin" id="sideBar" :style="{width:this.$store.state.widthOfSideBar}" style="display:inline-block"></sideBar>
    <div :style="{width:this.$store.state.widthOfMain}" style="display:inline-block;float:right;-webkit-transition:width 0.5s">
      <sideHeader style="width:100%" v-if="this.$store.state.isLogin"></sideHeader>
      <router-view style="width:100%" v-if="this.$store.state.isLogin && this.isRouterAlive" name="default"/>
      <sideFooter style="width:100%" v-if="this.$store.state.isLogin"></sideFooter>
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
        this.$router.replace('/login')
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
</style>
