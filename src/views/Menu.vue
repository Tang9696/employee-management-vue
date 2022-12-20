<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="name"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
    <el-button type="success" @click="menuAdd" icon="el-icon-circle-plus-outline">Add Menu</el-button>

  </div>
  <!--    信息展示   -->
  <el-table :data="tableData" :border="true"  row-key="id" default-expand-all>
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="80">
    </el-table-column>
    <el-table-column prop="name" label="Role Name">
    </el-table-column>
    <el-table-column prop="path" label="Path">
    </el-table-column>
    <el-table-column prop="icon" label="Icon">
    </el-table-column>
    <el-table-column prop="pagepath" label="PagePath">
    </el-table-column>
    <el-table-column prop="descrip" label="Description">
    </el-table-column>
    <el-table-column label="" width="300">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="childAdd(scope.row.id)" v-if="!scope.row.pid && !scope.row.path">Add Submenu</el-button>
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
  <!--    添加窗口    -->
  <el-dialog title="Add Menu" :visible.sync="dialogFormVisible">
    <el-form label-width="120px">
      <el-form-item label="Menu name" >
        <el-input v-model="form.name"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Path" >
        <el-input v-model="form.path"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Icon" >
        <el-input v-model="form.icon"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="PagePath" >
        <el-input v-model="form.pagepath"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" >
        <el-input v-model="form.descrip"autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
  <!--    修改窗口    -->
  <el-dialog title="Update Menu" :visible.sync="dialogFormUpdate">
    <el-form label-width="120px">
      <el-form-item label="Menu name" >
        <el-input v-model="form.name"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Path" >
        <el-input v-model="form.path"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Icon" >
        <el-input v-model="form.icon"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="PagePath" >
        <el-input v-model="form.pagepath"autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" >
        <el-input v-model="form.descrip"autocomplete="off"></el-input>
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
  name: "Menu",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      name:"",
      pageSize:10,
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
      this.axios.get("/wang/menu/getmenus",{
        params:{
          name: this.name
        }
      }).then((res) => {
        this.tableData = res.data
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
    menuAdd(pid){
        this.dialogFormVisible = true,
        this.form = {}
    },
    childAdd(pid){
      this.dialogFormVisible = true,
        this.form = {}
      if(pid){
        this.form.pid = pid
      }
    },
    //添加方法
    save(){
      this.axios.post("/wang/menu/addmenu",this.form).then(res =>{
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
      this.axios.post("/wang/menu/updatemenu",this.form).then(res =>{
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
      this.axios.delete("/wang/menu/" + id).then(res =>{
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
