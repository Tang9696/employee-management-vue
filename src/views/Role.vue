<template>
<div>
  <!--      功能栏      -->
  <div style="padding: 10px 0">
    <el-input style="width: 200px" v-model="name"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="load">search</el-button>
    <el-button type="success" @click="roleAdd" icon="el-icon-circle-plus-outline">Add Role</el-button>

  </div>
  <!--    角色信息展示   -->
  <el-table :data="tableData" :border="true" >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Id" width="80">
    </el-table-column>
    <el-table-column prop="name" label="Role Name">
    </el-table-column>
    <el-table-column prop="createtime" label="Createtime">
    </el-table-column>
    <el-table-column prop="updatetime" label="Updatetime">
    </el-table-column>
    <el-table-column label="">
      <template slot-scope="scope">
        <el-button size="mini" type="info" @click="selectMenu(scope.row.id)">Add menu</el-button>
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
  <!--    添加角色窗口    -->
  <el-dialog title="Add Role" :visible.sync="dialogFormVisible">
    <el-form label-width="120px">
      <el-form-item label="Role name" >
        <el-input v-model="form.name"autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>

  <!--    添加菜单窗口    -->
  <el-dialog title="Add Menu" :visible.sync="dialogFormMenu">
    <el-form label-width="120px">
      <el-tree
        :props="props"
        :data="menuData"
        show-checkbox
        ref="tree"
        node-key="id"
        :default-expanded-keys="expends"
        :default-checked-keys="checks"
        :check-strictly="true">
      </el-tree>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
    </div>
  </el-dialog>

  <!--    修改窗口    -->
  <el-dialog title="Update Role" :visible.sync="dialogFormUpdate">
    <el-form label-width="120px">
      <el-form-item label="Role name" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
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
  name: "Role",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      dialogFormVisible:false,
      dialogFormUpdate:false,
      dialogFormMenu:false,
      form: {},
      multipleSelection:[],
      pid:1,
      menuData:[],
      id:0,
      props:{
        label: 'name',
      },
      expends: [],
      checks: []
    }
  },
  created() {
    this.load();
  },
  methods:{
    //分页查询方法
    load: function () {
      //请求分页查询
      this.axios.get("/wang/role/page",{
        params:{
          pageNum:this.pageNum,
          pageSize: this.pageSize,
          rolename: this.rolename
        }
      }).then((res) => {
        this.tableData = res.data.roles
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
      this.axios.post("/wang/role/addrole",this.form).then(res =>{
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
      this.axios.post("/wang/role/updaterole",this.form).then(res =>{
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
      this.axios.delete("/wang/role/" + id).then(res =>{
        if(res.code === '200'){
          this.$message.success("Delete Success")
          this.load()
        }else {
          this.$message.error("Delete Error")
        }
      })
    },
    //查找菜单
    selectMenu(id){
      this.dialogFormMenu = true
      this.id = id
      //查询菜单页
      this.axios.get("/wang/menu/getmenus",{
        params:{
          name: "",
        }
      }).then((res) => {
        this.menuData = res.data
        this.expends = this.menuData.map(v => v.id)
      }),
        this.axios.get("/wang/role/getroleMenu/" + this.id).then((res) => {
          this.checks = res.data
        })
    },
    saveRoleMenu(){
      this.axios.post("/wang/role/roleMenu/" + this.id,this.$refs.tree.getCheckedKeys()).then(res => {
         if(res.code === "200"){
           this.dialogFormMenu = false
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
