import Vue from 'vue'
import Router from 'vue-router'
import User from "../views/User";
Vue.use(Router)


  const routes = [
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
  const router = new Router({
    mode:'history',
    base:process.env.BASH_URL,
    routes
  })
  export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  if(storeMenus){
    //拼装动态路由
     const manageRoute = { path: '/', name: 'Manage', component: () => import('../views/Manage.vue'), redirect: "/home", children: []}
     const menus = JSON.parse(storeMenus)
    menus.forEach(item =>{
      //因为父菜单中的path为null,直接拼接会报错,我们需要进行判断
      if(item.path){ //path不为空的时候才去拼接
        let itemMenus = {path:item.path.replace("/",""),name:item.name,component: () => import('../views/'+item.pagepath+'.vue')}
        manageRoute.children.push(itemMenus)
      }else if(item.children.length){
        item.children.forEach(item =>{
          if(item.path){
            let itemMenus = {path:item.path.replace("/",""),name:item.name,component: () => import('../views/'+item.pagepath+'.vue')}
            manageRoute.children.push(itemMenus)
          }
        })
      }
    })
    //获取当前的路由对象名称数组
    const currentRoutName = router.getRoutes().map(v => v.name)
    if(!currentRoutName.includes('Manage')){
      //动态添加到现在的路由信息中
      router.addRoute(manageRoute)
    }
  }
  }

  //重置路由的话就重新再set一次
   setRoutes();

router.beforeEach((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name) //设置当前路由名称

  if(!to.matched.length){
    const  storeMenu = localStorage.getItem("menus")
    if(storeMenu){
      next("/404")
    }else {
      next("/login")
    }
  }
  next()
})

export default router
