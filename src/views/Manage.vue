<template>
<div style="height:100%">
  <el-container style="height:100%">

<!--侧边栏-->
        <Aside></Aside>

    <el-container>
<!--头部信息-->
      <el-header>
        <Head></Head>
      </el-header>

      <el-main>
<!--  表示当前页面的子路由会在router-view中展示 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Aside from "../components/Aside";
import Head from "../components/Head";

export default {
  name: "Home",
  components: {Head, Aside},
  data() {
    return {
    }
  },
  //方法
  methods:{

  }

}


</script>

<style scoped>
.el-header {
  background-color: #1c77ef;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 14px;
  background-color: rgb(15,15,16);
  box-shadow: 0 6px 0 6px #131212;
}

</style>
