<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="name"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
    <el-button type="success" @click="empAdd" icon="el-icon-circle-plus-outline">Add Leave</el-button>
  </div>
  <!--    假条信息展示   -->
  <el-table :data="tableData" :border="true" @selection-change="">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="140">
    </el-table-column>
    <el-table-column prop="name" label="User Name" width="120">
    </el-table-column>
    <el-table-column prop="dept" label="Dept" width="120"></el-table-column>
    <el-table-column prop="type" label="Leave Type">
      <template slot-scope="scope">
        <span v-if="scope.row.type ==='1'">Sick leave</span>
        <span v-if="scope.row.type ==='2'">Personal leave</span>
        <span v-if="scope.row.type ==='3'">Business trip</span>
      </template>
    </el-table-column>
    <el-table-column prop="starttime" label="StratTime">
    </el-table-column>
    <el-table-column prop="endtime" label="Endtime">
    </el-table-column>
    <el-table-column prop="status" label="Status">
      <template slot-scope="scope">
        <div v-if="scope.row.status ===1"style="color: #ffc107"><p>Unapproved</p></div>
        <div v-if="scope.row.status ===2"style="color: #198754"><p>Agreed</p></div>
        <div v-if="scope.row.status ===3"style="color: #b02a37"><p>Refused</p></div>
      </template>
    </el-table-column>
    <el-table-column label="">
      <template slot-scope="scope">
        <div v-if="scope.row.status ===1">
        <el-button size="mini" type="warning" @click="handleDelete(scope.row.id)">Cancel</el-button>
        </div>
        <div v-if="scope.row.status ===2 || scope.row.status ===3">
        <el-popconfirm
          confirm-button-text='yes'
          cancel-button-text='no'
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure？"
          @confirm="handleDelete(scope.row.id)"
        >
          <el-button size="mini" type="danger" slot="reference">Delete</el-button>
        </el-popconfirm>
        </div>
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

  <!--    添加假条窗口    -->
  <el-dialog title="Add Leave" :visible.sync="dialogFormVisible">
    <el-form label-width="120px">
      <el-input prop="id" v-model="this.user.id" type="hidden"></el-input>
      <el-form-item label="User name" >
        <el-input v-model="this.user.lastname" prop="name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Leave Type">
        <el-select v-model="form.type" placeholder="Choose">
          <el-option value="1">Sick leave</el-option>
          <el-option value="2">Personal leave</el-option>
          <el-option value="3">Business trip</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Dept Name" >
        <el-input v-model="this.user.department.departmentName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="Start Time" >
        <el-date-picker
          v-model="form.starttime"
          type="date"
          placeholder="Choose Date"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="End Time" >
        <el-date-picker
          v-model="form.endtime"
          type="date"
          placeholder="Choose Date"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "MyLeave",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      dialogFormVisible:false,
      dialogFormUpdate:false,
      form: {},
      multipleSelection:[],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      lname:"",
      ldept:"",
      luid:""
    }
  },
  created() {
    this.load();
  },
  methods:{
    //分页查询方法
    load: function () {
      //请求分页查询
      this.axios.get("/wang/leavetoperson/"+ this.user.id,{
        params:{
          pageNum:this.pageNum,
          pageSize: this.pageSize,
          name: this.name
        }
      }).then((res) => {
        console.log(res);
        this.tableData = res.data
        this.total = res.total
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
    empAdd(){
        this.dialogFormVisible = true,
        this.form = {}
    },
    //添加方法
    save(){
      this.axios.post("/wang/mqaddleave",this.form,{
        params:{
          lname: this.user.lastname,
          ldept: this.user.department.departmentName,
          luid: this.user.id
        }}
      ).then(res =>{
        if(res.code === '200'){
          this.$message.success("Add Success")
          this.dialogFormVisible = false
          this.load()
        }else {
          this.$message.error("Add Error")
        }
      })
    },
    //删除方法
    handleDelete(id){
      this.axios.delete("/wang/leavesDel/" + id).then(res =>{
        if(res.code === '200'){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    },
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
