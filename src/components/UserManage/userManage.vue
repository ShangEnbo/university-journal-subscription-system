<template>
  <div class="userMag">
    <el-container>
      <el-aside width="250px">
        <el-header>
          <el-input type="text" width="250px" prefix-icon="el-icon-search" placeholder="请输入内容" v-model="input"
            clearable>
          </el-input>
        </el-header>
        <el-button type="info" icon="el-icon-plus" size="mini" :round='true' @click="() => open(data,1)">添加</el-button>
        <el-button type="info" icon="el-icon-thumb" size="mini" :round='true' @click="displayOn" :disabled="flag">编辑
        </el-button>
        <el-button type="info" icon="el-icon-close" size="mini" :round='true' @click="displayOff" :disabled="!flag">关闭
        </el-button>
        <el-tree :data="data" :show-checkbox="false" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="(data, node) => NodeClick(data, node)">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="flag">
              <el-button type="text" size="mini" @click="() => open(data,0)">
                <i class="el-icon-circle-plus-outline"></i>
              </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">
                <i class="el-icon-remove-outline"></i>
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <UserTemplate :stata='stata' :school='school' :college='college' :department='department'></UserTemplate>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import data from '../menu/tree.js'
import axios from 'axios'
import UserTemplate from './usertemplate.vue'
let id = 1000
export default {
  components: {
    UserTemplate
  },
  data () {
    return {
      data: data,
      label: '',
      input: '',
      flag: false,
      department: '',
      college: '',
      school: '',
      stata: { total: 0, state: false }
    }
  },
  methods: {
    NodeClick (data, node) {
      console.log('节点等级：', node)
      console.log('节点等级：', data.$treeNodeId)
      console.log('节点parent对象：', node.parent.data)
      console.log('节点parent：', node.parent)
      if (node.level === 4) {
        this.department = data.label
        this.college = node.parent.data.label
        this.school = node.parent.parent.data.label
      } else if (node.level === 3) {
        this.department = ''
        this.college = data.label
        this.school = node.parent.data.label
      } else if (node.level === 2) {
        this.department = ''
        this.college = ''
        this.school = data.label
      } else {
        this.department = ''
        this.college = ''
        this.school = ''
      }
      axios.get('/api/get/updateUser', {
        params: {
          school: this.school,
          college: this.college,
          department: this.department
        }
      }).then(res => {
        this.tabledata = res.data.data
        if (this.stata.total === res.data.total) {
          this.stata.state = true
        } else {
          this.stata.total = res.data.total
          this.stata.state = false
        }
      })
    },
    displayOn () {
      this.flag = true
    },
    displayOff () {
      this.flag = false
    },
    open (data, state) {
      this.$prompt('请输入增加名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({
        value
      }) => {
        this.label = value
        this.append(data, state)
        this.$message({
          type: 'success',
          message: '已添加: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        })
      })
    },
    append (data, state) {
      const newChild = {
        id: id++,
        label: this.label,
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      state === 1 ? data.push(newChild) : data.children.push(newChild)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .el-main {
    padding-top: 0;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .el-header {
    padding: 0;
    margin-bottom: -5px;
  }

  .el-tree {
    margin-top: 10px;
  }

  .el-tree button {
    font-size: 18px;
  }
</style>
