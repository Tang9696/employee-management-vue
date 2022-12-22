<template>
  <el-card style="width: 600px">
    <el-form label-width="120px">
      <el-form-item label="User name" >
        <el-input v-model="form.lastname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Role">
          <span style="color: red">Non-modifiable</span>
        <el-input v-model="form.role" autocomplete="off" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="Dept">
        <span style="color: red">Non-modifiable</span>
        <el-input v-model="form.department.departmentName" autocomplete="off" readonly="readonly" ></el-input>
      </el-form-item>
      <el-form-item label="Password" >
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email" >
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0">Woman</el-radio>
          <el-radio :label="1">man</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Birth" >
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateemp">Ok</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Person.vue",
  data(){
    return{
      form:{},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.axios.get("/wang/empid/" + this.user.id).then(res =>{
      if(res){
        this.form = res.emp;
      }
    })
  },
  methods:{
    updateemp(){
      this.axios.post("/wang/updateemp",this.form).then(res =>{
        if(res){
          this.$message.success("Update Success")
          this.load()
        }else {
          this.$message.error("Update Error")
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
