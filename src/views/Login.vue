<template>
  <div class="login-container" >
    <div class="box">
      <h1>高校学报订阅管理后台系统</h1>
      <div class="login-username font-style ">
        <label for="username">用户名称：</label>
        <input type="text" v-model="username" class="input-username" id="username" placeholder="请输入用户名"
          autocomplete="off" />
      </div>
      <div class="login-password font-style ">
        <label for="password">用户密码：</label>
        <input type="password" v-model="password" class="input-password" id="password" placeholder="请输入密码" />
      </div>
      <div class="btn">
        <!-- <el-button type="info">重置</el-button>
        <el-button type="info">登陆</el-button> -->
        <button ref="reset" type="button" class="reset-btn" @click="reset()" @mousedown="pressStyle($event)" @mouseup="upStyle($event)">重置</button>
        <button ref="login" type="button" class="login-btn" @click="login()" @mousedown="pressStyle($event)" @mouseup="upStyle($event)"  @keyup.enter="login">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../components/home/eventBus.js'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 登陆判断
    login () {
      if (this.username === 'admin' && this.password === 'admin') {
        // login success
        this.loginSuccess()
        localStorage.setItem('token', 'Beaner xxx')
        localStorage.setItem('username', this.username)
        // jump homepage
        this.$router.push('/home')
      } else {
        // login error
        localStorage.removeItem('token')
        this.loginError()
      }
    },
    // 重置
    reset () {
      this.username = ''
      this.password = ''
    },
    // 登陆成功的消息提醒
    loginSuccess () {
      this.$message({
        showClose: true,
        message: '登陆成功',
        type: 'success',
        duration: 1000
      })
    },
    // 登陆失败的消息提醒
    loginError () {
      this.$message({
        showClose: true,
        message: '请检查用户名或密码',
        type: 'error',
        duration: 2000
      })
    },
    // 按钮点击时效果
    pressStyle (e) {
      e.target.style.boxShadow = 'inset 5em 1em rgba(255, 255, 255,.2)'
    },
    // 按钮松开时效果
    upStyle (e) {
      e.target.style.boxShadow = 'none'
    },
    keyupEnter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    sendUsername () {
      bus.$emit('shareUsername', this.username)
    }
  },
  mounted () {
    window.addEventListener('keyup', this.keyupEnter)
  },
  destroyed () {
    window.removeEventListener('keyup', this.keyupEnter, false)
    this.sendUsername()
  }
}
</script>

<style scoped>
  .login-container {
    background: url(../assets/5d5e9a068f709.jpg) no-repeat fixed center;
    background-size: cover;
    background-color: #cbfbfb;
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 650px;
  }

  .box {
    box-sizing: border-box;
    width: 600px;
    height: 400px;
    background-color: rgba(255, 255, 255, .8);
    box-shadow: rgba(0, 0, 0, .1) 0px 0px 5px 5px;
    border-radius: 20px;
    padding: 60px;
  }

  .font-style {
    font-size: 20px;
  }

  .login-username {
    margin-top: 50px;
  }

  .login-password {
    margin: 40px 0;
  }

  .box input {
    width: 260px;
    height: 30px;
    padding-left: 10px;
    border-radius: 10px;
    /* border: solid #2C3E50 1px; */
    border: none;
    box-shadow : inset 0px 0px 5px 2px rgba(0,0,0,.1);
    outline: none;
    background-color: transparent;
  }

  .btn button {
    width: 100px;
    height: 40px;
    font-size: 20px;
    font-weight: 600;
    color: #FFFFFF;
    /*    border: #50b2f6 3px solid;
    background-color: #50b2f6; */
    border: none;
    background-color: #2C3E50;
    box-shadow: rgba(0, 0, 0, .1) 0px 0px 6px 2px;
  }

  .btn .reset-btn {
    margin-right: 30px;

  }
</style>
