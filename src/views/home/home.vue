<template>
  <div class="home-container">
    <el-container>
      <el-header height='50px'>
        <HomeHeader></HomeHeader>
      </el-header>
    </el-container>

    <el-container>
      <el-aside width='200px'>
        <Menu></Menu>
      </el-aside>
      <el-main>
        <component :is="sonComponent"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '../../components/home/Home-header.vue'
import Menu from '../../components/menu/Menu.vue'
import UserManage from '../../components/UserManage/userManage.vue'
export default {
  name: 'Home',
  data () {
    return {
      sonComponent: 'UserManage'
    }
  },
  components: {
    HomeHeader,
    Menu,
    UserManage
  },
  methods: {

  }
}
</script>

<style>
  .home-menu {
    /* float: left; */
    width: 100px;
    height: 800px;
    background-color: #42B;
  }
</style>
