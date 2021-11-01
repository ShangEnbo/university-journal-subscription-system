<template>
  <div class="menu">
    <el-menu default-active='1' class="el-menu-vertical-demo"
      background-color="rgb(255,255,255)" text-color="rgb(145, 147, 152)" active-text-color="rgba(109, 183, 83,1)">
      <el-menu-item index="1">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-management"></i>
        <span slot="title">学报管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">订阅管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-s-operation"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
</script>

<style>
  .menu {
    width: 200px;
    height: 764px;
    background-color: rgba(255, 255, 255, 1);
    border-right: solid 2px rgb(230, 230, 230);
    padding-top: 10px;
    position: fixed;
    left: 0;
  }
</style>
