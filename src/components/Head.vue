<template>
  <div>
    <div style="width: 200px;display:inline-block;float: left;background-color: #ffffff;text-align: center;height: 30px;margin-top: 20px;">
      <el-breadcrumb separator="/" style="font-size: 15px;margin-top: 8px;margin-left: 8px">
        <el-breadcrumb-item :to="'/'">Profile</el-breadcrumb-item>
        <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  <el-dropdown style="width:100px;cursor: pointer;color:white">
    <span>{{user.lastname}}</span> <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>profile</el-dropdown-item>
      <el-dropdown-item>
        <span @click="logout" style="text-decoration: none">
        Log out
        </span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Head",
  props:{
    pathName: String,
  },
  watch:{
    '$route': function (){
      this.currentPathName = localStorage.getItem("currentPathName") //取出router的当前路由信息
    }
  },
  data(){
    return{
      currentPathName: '',
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods:{
    logout(){
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("Logout Success")
    }
  }
}
</script>

<style scoped>

</style>
