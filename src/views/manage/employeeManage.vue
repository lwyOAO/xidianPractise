<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import editEmployee from './components/editEmployee.vue'
import { ElMessage } from 'element-plus';
import {
  getEmployeeList,
  getEmployeeByIdService,
  deleteEmployeeService
} from '@/api/user.js'

// 控制抽屉显示隐藏
const editEmployeeRef = ref()
const OnAddEmployee = () => {
  editEmployeeRef.value.open('')
}

// 控制分页大小
const total = ref(0)
const params = ref({
  page: 1, // 当前页号
  pageSize: 10,
  name: ''
})

// 控制加载图标是否显示
const loading = ref(false)

// 初始加载员工列表
const employeeList = ref([])
const getEmployee = async () => {
  loading.value = true
  const res = await getEmployeeList(params.value)
  if (res.data.code === 0) {
    ElMessage.error('获取员工列表失败,请登录')
    loading.value = false
    return
  }

  employeeList.value = res.data.data.records
  employeeList.value = employeeList.value.map((item) => {
    item.sex = item.sex === '1' ? '男' : '女'
    item.status = item.status === 1 ? '启用' : '禁用'
    return item
  })
  total.value = res.data.data.total
  loading.value = false
}
getEmployee()

// 分页管理
const onSizeChange = (size) => {
  params.value.page = 1
  params.value.pageSize = size
  // 基于最新的params获取文章列表，重新渲染数据
  getEmployee()
}
const onCurrentChange = (page) => {
  params.value.page = page
  // 基于最新的params获取文章列表，重新渲染数据
  getEmployee()
}

// 编辑员工信息
const onEditChannel = (row) => {
  editEmployeeRef.value.open(row)
}

// 删除员工信息
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  const res = await deleteEmployeeService(row.id)
  if (res.data.code === 1) {
    ElMessage.success(res.data.data)
    getEmployee()
  } else {
    ElMessage.error('删除失败')
  }
}

const onChangeEmployee = () => {
  getEmployee()
}

// 根据条件搜索
const empId = ref()
const onSearch = async () => {
  // 在id为空时，直接分页查询
  if (!empId.value) {
    getEmployee()
    return
  }
  const res = await getEmployeeByIdService(empId.value)
  employeeList.value = [{ ...res.data.data }]
  employeeList.value = employeeList.value.map((item) => {
    item.sex = item.sex === '1' ? '男' : '女'
    item.status = item.status === 1 ? '启用' : '禁用'
    return item
  })
}

// 重置搜索条件
const onReset = () => {
  empId.value = ''
  params.value.name = ''
  getEmployee()
}
</script>

<template>
  <page-container title="员工管理">
    <template #extra>
      <el-button @click="OnAddEmployee">添加员工</el-button>
    </template>

    <!--表单区域-->
    <el-form inline>
      <el-form-item label="编号：">
        <el-input v-model="empId"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!--表格区域-->
    <el-table
      v-loading="loading"
      :data="employeeList"
      height="400"
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="员工姓名"></el-table-column>
      <el-table-column prop="username" label="账号名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="status" label="账号状况"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>

      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="onEditChannel(row)"
            circle
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            @click="onDelChannel(row)"
            circle
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="空空如也"></el-empty>
      </template>
    </el-table>

    <!--分页区域-->
    <el-pagination
      style="margin-top: 20px; justify-content: flex-end"
      :small="small"
      :disabled="disabled"
      v-model:current-page="params.page"
      v-model:page-size="params.pageSize"
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
    <!--抽屉部分-->
    <editEmployee
      ref="editEmployeeRef"
      @change="onChangeEmployee"
    ></editEmployee>
  </page-container>
</template>
