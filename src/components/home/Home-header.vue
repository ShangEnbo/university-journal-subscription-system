<template>
  <div class="header-container">
    <div class="header-logo">
      <a href="/#/home" alt="高校学报订阅管理后台系统">
        <img src="../../assets/logo-img.png" alt="高校学报订阅管理后台系统" height="50px">
      </a>

    </div>
    <div class="userInfo">
      <span>您好，{{ username }}</span>
      <button type="button" class="logout-btn" @click="loginOut()">退出登陆</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-Header',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    loginOut () {
      // console.log(this)
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$router.push('/')
    },
    getUsername () {
      this.username = localStorage.getItem('username')
    }
  },
  created () {
    this.getUsername()
  }
}
</script>

<style>
  .header-container {
    position: fixed;
    top:0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 50px;
    background-color: #42B983;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-logo {
  }
  .header-logo a {
    /* padding-top: 10px; */
    display: block;
    width: 300px;
    height: 50px;
    /* background-color: #2b7352; */
  }
  .header-logo img{
    /* height: 50px; */
  }
  .userInfo {
    color: #FFFFFF;
    font-weight: 600;
  }
  .logout-btn {
    display: inline-block;
    margin: 0 20px;
    background-color: rgb(121, 220, 162);
    border: 0;
    padding: 5px 10px 5px 10px;
    color: white;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0px 0px 2px 2px rgba(61, 110, 81,.1);
  }
</style>
