<template>

<el-row class="wrapper">
<el-col :span="24">
  <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">文档中心</el-menu-item>
  </el-menu>
</el-col>
  <el-col :span="6">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">导航一</template>
        <el-menu-item-group title="分组一">
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">导航二</el-menu-item>
      <el-menu-item index="3">导航三</el-menu-item>
    </el-menu>
  </el-col>

  <el-col :span="18">
    <div class="grid-content bg-purple-dark">Main</div>
  </el-col>
</el-row>
</template>

<script>
import {Button,Row,Col,Menu,MenuGroup,MenuItem,Submenu} from 'element-ui';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  width:1024px;
  margin:0 auto;
}
</style>
