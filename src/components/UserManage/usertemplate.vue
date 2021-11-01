<template>
  <div class="user-template">
      <el-container>
        <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">新增
        </el-button>
        <el-button type="success" plain size="mini" icon="el-icon-refresh-left">修改</el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-close">删除</el-button>
        <el-button type="info" plain size="mini" icon="el-icon-upload2">导入</el-button>
        <el-button type="warning" plain size="mini" icon="el-icon-download">导出</el-button>
        <el-container class="flex-reverse-row">
          <el-input
            class='inputtable'
            placeholder="请输入查询的用户姓名"
            v-model="input"
            suffix-icon="el-icon-search"
            @change="(value) => searchname(value)">
          </el-input>
        </el-container>
      </el-container>

      <el-dialog title="新增用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学校" :label-width="formLabelWidth">
            <el-input v-model="form.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.college" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="form.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="用户信息" :visible.sync="dialogFormVisible1">
        <el-form :model="userinfo">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="userinfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学校" :label-width="formLabelWidth">
            <el-input v-model="userinfo.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="userinfo.college" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="userinfo.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="userinfo.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="afterHandleEdit()">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" stripe size="small" style="width: 100%" @cell-dblclick="tableDbclick">
        <el-table-column type="selection" width="50px" align="center">
        </el-table-column>
        <el-table-column prop="id" label="id" align="center" width="50px">
        </el-table-column>
        <el-table-column label="姓名" align="center" width="60px">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isName" v-model="scope.row.username" style="height: 100%; width: 100%;">
              {{scope.row.username}}</el-input>
            <span v-else>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校" align="center" width="90px">
        </el-table-column>
        <el-table-column prop="college" label="学院" align="center" width="100px">
        </el-table-column>
        <el-table-column prop="department" label="专业" align="center" width="100px">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center" width="150px">
        </el-table-column>
        <el-table-column prop="date" align="center" label="创建时间" width="135px">
        </el-table-column>
        <el-table-column label="操作" align="center" width="170px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange($event)" @current-change="handleCurrentChange($event)"
        @prev-click="preclick" @next-click="nextclick" :current-page="pageindex" :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'user-template',
  props: {
    school: {
      type: String,
      default: 'all'
    },
    college: {
      type: String,
      default: 'all'
    },
    department: {
      type: String,
      default: 'all'
    },
    stata: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      input: '',
      dialogFormVisible: false,
      form: {
        name: '',
        address: '',
        school: '',
        college: '',
        department: ''
      },
      multipleSelection: [],
      pageindex: 1,
      pagesize: 10,
      dialogFormVisible1: false,
      userinfo: {
        id: '',
        name: '',
        school: '',
        college: '',
        department: '',
        address: '',
        date: ''
      },
      formLabelWidth: '60px',
      tableData: [],
      total: this.stata.total
    }
  },
  created () {
    axios.get('/api/get/userdata', {
      params: {
        pageindex: 1,
        pagesize: 10
      }
    }).then(res => {
      console.log(res)
      this.tableData = res.data.data
      this.total = res.data.total
    })
  },
  methods: {
    add () {
      this.dialogFormVisible = false
      if (this.form.name.trim() === '' || this.form.address.trim() === '' || this.form.school.trim() === '' || this.form.college.trim() === '' || this.form.department.trim() === '') return alert('请填写姓名和地址')
      axios.post('/api/add/newInfo', {
        name: this.form.name,
        address: this.form.address,
        school: this.form.school,
        college: this.form.college,
        department: this.form.department
      }).then(res => {
        this.tableData = res.data.list
      })
      this.form.name = ''
      this.form.address = ''
      this.form.school = ''
      this.form.college = ''
      this.form.department = ''
    },
    preclick () {
      this.pageindex -= 1
    },
    nextclick () {
      this.pageindex += 1
    },
    handleSizeChange (e) {
      this.pagesize = e
    },
    handleCurrentChange (e) {
      this.pageindex = e
      axios.get('/api/get/userdata', {
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    tableDbclick (row, column, cell, event) {
      if (column.label === '姓名') {
        row.isName = !row.isName
      } else if (column.label === '地址') {
        row.isJob = !row.isJob
      }
    },
    handleEdit (index, row) {
      this.userinfo.id = row.id
      this.userinfo.name = row.username
      this.userinfo.school = row.school
      this.userinfo.college = row.college
      this.userinfo.department = row.department
      this.userinfo.address = row.address
      this.userinfo.date = row.date
      this.dialogFormVisible1 = true
      console.log(row)
    },
    afterHandleEdit () {
      this.dialogFormVisible1 = false
      axios.post('/api/post/updaterow', {
        id: this.userinfo.id,
        name: this.userinfo.name,
        school: this.userinfo.school,
        college: this.userinfo.college,
        department: this.userinfo.department,
        address: this.userinfo.address
      }).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    handleDelete (index, row) {
      console.log(row.id)
      axios.post('/api/remove/userow', {
        id: row.id
      }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    searchname (e) {
      console.log(e)
      axios.post('api/post/selectname', {
        name: e,
        state: false,
        pageindex: this.pageindex,
        pagesize: this.pagesize
      }).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    }
  },
  watch: {
    stata: {
      handler () {
        axios.get('/api/get/userdata', {
          params: {
            pageindex: this.pageindex,
            pagesize: this.pagesize
          }
        }).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
        })
      },
      immediate: true,
      deep: true
    },
    pageindex: {
      handler () {
        axios.get('/api/get/userdata', {
          params: {
            pageindex: this.pageindex,
            pagesize: this.pagesize
          }
        }).then(res => {
          this.tableData = res.data.data
        })
      }
    },
    pagesize: {
      handler () {
        axios.get('/api/get/userdata', {
          params: {
            pageindex: this.pageindex,
            pagesize: this.pagesize
          }
        }).then(res => {
          this.tableData = res.data.data
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-table {
    margin-top: 20px;
  }

  /deep/ .el-input__inner {
    font-size: 10px;
    padding: 0;
    text-align: center;
  }

  .el-pagination {
    margin-top: 30px;
  }

  .flex-reverse-row {
    display: flex;
    flex-direction: row-reverse;
  }
  .inputtable {
    width: 250px;
  }
  /deep/ .el-input__inner{
    text-align: left;
    padding-left: 14px;
    font-weight: 700;
  }
</style>
