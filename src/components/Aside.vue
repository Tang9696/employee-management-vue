<template>
  <el-aside width="250px" style="background-color: rgb(15,15,16);height:100%;box-shadow: 2px 0 6px #131212">
  <el-menu :default-openeds="opens" style="min-height:100%;overflow-x:hidden" background-color="rgb(15,15,16)" text-color="white" router @select="handleSelect">

    <div style="height: 60px;line-height: 60px;text-align: center">
      <b style="color: #e51926">Employee System</b>
    </div>
    <div v-for="item in menus" :key="item.id">
<!-- 如果该菜单有path，那么他不会有二级菜单-->
        <div v-if="item.path">
          <el-menu-item :index="item.path">
             <i :class="item.icon"></i>
             <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </div>
<!--反之,如果该菜单没有path,那么他会有二级菜单,需要将其遍历出来-->
        <div v-else>
          <el-submenu :index="item.id">
             <template slot="title">
               <i :class="item.icon"></i>
               <span slot="title">{{item.name}}</span>
             </template>
            <div v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.path">
                <i :class="subitem.icon"></i>
                <span slot="title">{{subitem.name}}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </div>
    </div>

  </el-menu>

  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  props:{
  },
  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : {},
      opens:localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id) : {}
    }
  },
  methods:{
    handleSelect(){
      this.$router.options.routes
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #e03535;
}
</style>
