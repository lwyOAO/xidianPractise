<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import EditEmployee from './components/editEmployee.vue'

// 控制抽屉显示隐藏
const editEmployeeRef = ref()
const OnAddEmployee = () => {
  editEmployeeRef.value.open()
}

// 控制分页大小
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const onSizeChange = () => {
}
const onCurrentChange = () => {
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
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select>
          <el-option label="在职" value="在职"></el-option>
          <el-option label="离职" value="离职"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!--表格区域-->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="员工姓名"></el-table-column>
      <el-table-column prop="cate_alias" label="入职时间"></el-table-column>
      <el-table-column prop="cate_alias" label="状态"></el-table-column>
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
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <!--抽屉部分-->
    <EditEmployee ref="editEmployeeRef"></EditEmployee>
  </page-container>
</template>
