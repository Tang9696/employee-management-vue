<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="departmentName"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
    <el-button type="success" @click="roleAdd" icon="el-icon-circle-plus-outline">Add Department</el-button>

  </div>
  <!--    部门信息展示   -->
  <el-table :data="tableData" :border="true" >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="80">
    </el-table-column>
    <el-table-column prop="departmentName" label="DepartmentName">
    </el-table-column>
    <el-table-column prop="createtime" label="Createtime">
    </el-table-column>
    <el-table-column prop="updatetime" label="Updatetime">
    </el-table-column>
    <el-table-column label="">
      <template slot-scope="scope">
        <el-button size="mini" type="success" @click="handleEdit(scope.row)">edit</el-button>
        <el-popconfirm
          confirm-button-text='yes'
          cancel-button-text='no'
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure？"
          @confirm="handleDelete(scope.row.id)"
        >
          <el-button size="mini" type="danger" slot="reference">delete</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--     分页模块      -->
  <div style="padding-top: 20px;text-align: center">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!--    添加部门窗口    -->
  <el-dialog title="Add Department" :visible.sync="dialogFormVisible">
    <el-form label-width="160px">
      <el-form-item label="DepartmentName" >
        <el-input v-model="form.departmentName"autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">cancel</el-button>
      <el-button type="primary" @click="save">Ok</el-button>
    </div>
  </el-dialog>


  <!--    修改窗口    -->
  <el-dialog title="Update Department" :visible.sync="dialogFormUpdate">
    <el-form label-width="160px">
      <el-form-item label="DepartmentName" >
        <el-input v-model="form.departmentName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">cancel</el-button>
      <el-button type="primary" @click="updateemp">Ok</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "Role",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      departmentName:"",
      dialogFormVisible:false,
      dialogFormUpdate:false,
      dialogFormMenu:false,
      form: {},
      multipleSelection:[],
      pid:1,
      id:0,
    }
  },
  created() {
    this.load();
  },
  methods:{
    //分页查询方法
    load: function () {
      //请求分页查询
      this.axios.get("/wang/dept/page",{
        params:{
          pageNum:this.pageNum,
          pageSize: this.pageSize,
          departmentName: this.departmentName
        }
      }).then((res) => {
        this.tableData = res.data.depts
        this.total = res.data.total
      })
    },

    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum;
      this.load();
    },
    //添加页面
    roleAdd(){
        this.dialogFormVisible = true,
        this.form = {}
    },
    //添加方法
    save(){
      this.axios.post("/wang/dept/adddept",this.form).then(res =>{
        if(res.code === '200'){
          this.$message.success("Add Success")
          this.dialogFormVisible = false
          this.load()
        }else {
          this.$message.error("Add Error")
        }
      })
    },
    //修改方法
    updateemp(){
      this.axios.post("/wang/dept/updatedept",this.form).then(res =>{
        if(res.code === '200'){
          this.$message.success("Update Success")
          this.dialogFormUpdate = false
          this.load()
        }else {
          this.$message.error("Update Error")
        }
      })
    },
    //修改页面
    handleEdit(row){
      this.form = Object.assign({},row)
      this.dialogFormUpdate = true
    },
    //删除方法
    handleDelete(id){
      this.axios.delete("/wang/dept/" + id).then(res =>{
        if(res.code === '200'){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    }
  }
}
</script>

<style scoped>
.el-table{
  width: 100%;
  margin-top:30px;
  padding-top: 20px;
  border-color: #a19f9f;
  border-bottom: 1px solid #a19f9f;
  border-right:1px solid #a19f9f;
}
</style>
