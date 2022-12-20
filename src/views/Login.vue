<template>
  <div>
    <div class="login-box">
      <h2>Employee System</h2>
      <el-form :model="user" :rules="rules" ref="ruleForm">
        <div class="user-box">
          <el-form-item prop="lastname">
            <input type="text" required="" v-model="user.lastname"></input>
            <label>Username</label>
          </el-form-item>
        </div>
        <div class="user-box">
          <el-form-item prop="password">
            <input  type="password" required="" v-model="user.password"></input>
            <label>Password</label>
          </el-form-item>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="handleSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </a>
<!--        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--        <a @click="signUp_asd"></a>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import {setRoutes} from "../router";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        lastname: [
          { required: true, message: 'Please enter your username', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.axios.post("/wang/user/login",this.user).then(res => {
            if(res.code === '200'){
              localStorage.setItem("user",JSON.stringify(res.data))  //存储用户信息到浏览器
              localStorage.setItem("menus",JSON.stringify(res.data.menus))
              //动态设置当前用户的路由
              setRoutes();
              this.$router.push("/")
              this.$message.success("Login Success")
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      });

    },
  },
}
;
</script>

<style>
body {
  /*background-image: url(https://r4.wallpaperflare.com/wallpaper/625/724/967/simple-background-texture-black-textured-wallpaper-4b268c0dd361cfc945545be97dfc3cd0.jpg);*/
  background-image: url(https://r4.wallpaperflare.com/wallpaper/50/8/6/space-star-map-pattern-wallpaper-c0a005897f268e8308cfc7d6aba62428.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -50px;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 20px 0;
  font-size: 17px;
  color: #fff;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}
</style>
