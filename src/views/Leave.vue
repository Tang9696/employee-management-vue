<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="name"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
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

  </div>
  <!--    假条信息展示   -->
  <el-table :data="tableData" :border="true" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="140">
    </el-table-column>
    <el-table-column prop="name" label="User Name" width="120">
    </el-table-column>
    <el-table-column prop="dept" label="Dept" width="120"></el-table-column>
    <el-table-column prop="type" label="Leave Type">
      <template slot-scope="scope">
        <span v-if="scope.row.type==='1'">Sick leave</span>
        <span v-if="scope.row.type==='2'">Personal leave</span>
        <span v-if="scope.row.type==='3'">Business trip</span>
      </template>
    </el-table-column>
    <el-table-column prop="starttime" label="StratTime">
    </el-table-column>
    <el-table-column prop="endtime" label="Endtime">
    </el-table-column>
    <el-table-column prop="status" label="Status">
      <template slot-scope="scope">
        <div v-if="scope.row.status===1"style="color: #ffc107"><p>Unapproved</p></div>
        <div v-if="scope.row.status===2"style="color: #198754"><p>Agreed</p></div>
        <div v-if="scope.row.status===3"style="color: #b02a37"><p>Refused</p></div>
      </template>
    </el-table-column>
    <el-table-column label="">
      <template slot-scope="scope">
        <div v-if="scope.row.status===1">
        <el-button size="mini" type="success" @click="handleAggree(scope.row.id)">Agree</el-button>
        <el-button size="mini" type="warning" @click="handleRefuse(scope.row.id)">Refuse</el-button>
        </div>
        <div v-if="scope.row.status===2 || scope.row.status===3">
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

</div>
</template>

<script>
export default {
  name: "Leave",
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
    }
  },
  created() {
    this.load();
  },
  methods:{
    //分页查询方法
    load: function () {
      //请求分页查询
      this.axios.get("/wang/leavepage",{
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
    //批量删除获取信息
    handleSelectionChange(val){
      //拿来的是一个个对象
      this.multipleSelection = val;
    },
    //批量删除方法
    batchdel(){
      let ids = this.multipleSelection.map(v => v.id) //该方式能把[{},{},{}]变成[1,2,3]
      this.axios.delete("/wang/leavebacth",{data:ids}).then(res =>{
        if(res.code === '200'){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    },
    //批准假条
    handleAggree(id){
      this.axios.post("/wang/leavesAgree/" + id).then(res =>{
        if(res.code === '200'){
          this.$message.success("Approved !")
          this.load()
        }else {
          this.$message.error("Error")
        }
      })
    },
    //拒绝假条
    handleRefuse(id){
      this.axios.post("/wang/leavesRefuse/" + id).then(res =>{
        if(res.code === '200'){
          this.$message.success("Rejected !")
          this.load()
        }else {
          this.$message.error("Error")
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
