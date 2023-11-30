<template>
  <div class="big-border">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/Login">Login</router-link> -->

    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './components/ImageManage.vue'
// import Login from './components/LoginView.vue'
export default {
  name: 'App',
  // components: {
  //   Login
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.big-border {
  margin: 5% 10%;
}
</style>
