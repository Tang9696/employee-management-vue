<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="lastname"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
    <el-button type="success" @click="empAdd" icon="el-icon-circle-plus-outline">Add Staff</el-button>
    <el-popconfirm
      confirm-button-text='yes'
      cancel-button-text='no'
      icon="el-icon-info"
      icon-color="red"
      title="Are you sure？"
      @confirm="batchdel"
    >
      <el-button type="danger" round icon="el-icon-danger" slot="reference">Batch delete</el-button>
    </el-popconfirm>
    <el-upload
      action="http://127.0.0.1:8081/wang/import"
      :show-file-list="false"
      accept="xlsx"
      :on-success="handleExcelImportSuccess"
      style="display: inline-block">
    <el-button type="success" round icon="el-icon-circle-plus-outline">Import</el-button>
    </el-upload>
    <el-button type="success" round @click="exp" icon="el-icon-remove-outline">Export</el-button>
  </div>
  <!--    员工信息展示   -->
  <el-table :data="tableData" :border="true" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="140">
    </el-table-column>
    <el-table-column prop="lastname" label="Last Name" width="120">
    </el-table-column>
    <el-table-column label="Role" prop="role" width="120"></el-table-column>
    <el-table-column prop="email" label="Email">
    </el-table-column>
    <el-table-column prop="gender" label="Gender">
      <template slot-scope="scope">{{ scope.row.gender === 1 ? 'man' : 'woman' }}</template>
    </el-table-column>
    <el-table-column prop="department.departmentName" label="Department">
    </el-table-column>
    <el-table-column prop="birth" label="Birth">
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
  <!--    添加员工窗口    -->
  <el-dialog title="Add Employee" :visible.sync="dialogFormVisible">
    <el-form label-width="120px">
      <el-form-item label="User name" >
        <el-input v-model="form.lastname" prop="lastnamea" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role" placeholder="Choose">
          <el-option
            v-for="item in this.roles"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
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
      <el-form-item label="Dept">
        <el-select v-model="form.depId" placeholder="Choose">
          <el-option
            v-for="item in this.dept"
            :key="item.departmentName"
            :label="item.departmentName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Birth" >
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
  <!--    修改员工窗口    -->
  <el-dialog title="Update Employee" :visible.sync="dialogFormUpdate">
    <el-form label-width="120px">
      <el-form-item label="User name" >
        <el-input v-model="form.lastname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role" placeholder="Choose">
          <el-option
            v-for="item in this.roles"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
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
      <el-form-item label="Dept">
        <el-select v-model="form.depId" placeholder="Choose">
          <el-option
            v-for="item in this.dept"
            :key="item.departmentName"
            :label="item.departmentName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Birth" >
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateemp">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      lastname:"",
      msg:"hello",
      dialogFormVisible:false,
      dialogFormUpdate:false,
      form: {},
      multipleSelection:[],
      roles: [],
      rid: 0,
    }
  },
  created() {
    this.load();
  },
  methods:{
    //分页查询方法
    load: function () {
      //请求分页查询
      this.axios.get("/wang/page",{
        params:{
          pageNum:this.pageNum,
          pageSize: this.pageSize,
          lastname: this.lastname
        }
      }).then((res) => {
        console.log(res);
        this.tableData = res.data
        this.total = res.total

      }),
     this.axios.get("/wang/role/getroles").then(res => {
       this.roles = res.data
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
    //员工添加页面
    empAdd(){
      this.axios.get("/wang/emp").then(res =>{
        console.log(res);
        this.dept = res.data;
      }),
        this.dialogFormVisible = true,
        this.form = {}
    },
    //员工添加方法
    save(){
      this.axios.post("/wang/addemp/"+ this.rid,this.form).then(res =>{
        if(res.code === "200"){
          this.$message.success("Add Success")
          this.dialogFormVisible = false
          this.load()
        }else {
          this.$message.error("Add Error")
        }
      })
    },
    //修改员工方法
    updateemp(){
      this.axios.post("/wang/updateemp",this.form).then(res =>{
        if(res){
          this.$message.success("Update Success")
          this.dialogFormUpdate = false
          this.load()
        }else {
          this.$message.error("Update Error")
        }
      })
    },
    //修改员工页面
    handleEdit(row){
      this.axios.get("/wang/emp").then(res =>{
        console.log(res);
        this.dept = res.data;
      }),
        this.form = Object.assign({},row)
      this.dialogFormUpdate = true
    },
    //删除员工方法
    handleDelete(id){
      this.axios.delete("/wang/" + id).then(res =>{
        if(res){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    },
    //批量删除获取信息
    handleSelectionChange(val){
      //拿来的是一个个对象
      this.multipleSelection = val;
    },
    //批量删除方法
    batchdel(){
      let ids = this.multipleSelection.map(v => v.id) //该方式能把[{},{},{}]变成[1,2,3]
      this.axios.delete("/wang/bacth",{data:ids}).then(res =>{
        if(res){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    },
    exp(){
      window.open("http://127.0.0.1:8081/wang/export")
    },
    handleExcelImportSuccess(){
      this.$message.success("Import Success")
      this.load()
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
