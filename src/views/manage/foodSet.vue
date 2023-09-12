<script setup>
import { ref } from 'vue'
import editCategory from './components/editCategory.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { deletePackage } from '@/api/foodSet.js'
import { foodCategoryPage } from '@/api/foodCategory.js'
import { ElMessage } from 'element-plus'

// 控制加载图标是否显示
const loading = ref(false)

// 控制抽屉显示隐藏
const editCategoryRef = ref()
const OnAddFoodClass = () => {
  editCategoryRef.value.open('')
}

// 控制分页大小
const total = ref(1)
const params = ref({
  page: 1,
  pageSize: 10
})

// 批量选择
const handleSelectionChange = (list) => {
  //list为选中的数据foodClassList
  // 收集数据中的id
  const selList = list.map((item) => item.food_id)
  return selList
}

// 初始加载菜品数据
const foodClassList = ref([])
const OnLoadFoodClass = async () => {
  loading.value = true
  const res = await foodCategoryPage(params.value)
  if (res.data.code === 0) {
    ElMessage.error('获取员工列表失败,请登录')
    loading.value = false
    return
  }

  foodClassList.value = res.data.data.records.filter((item) => item.type === 2)
  total.value = res.data.data.total
  loading.value = false
}
OnLoadFoodClass()

const OnDelBatch = () => {}
const OnSaleBatch = () => {}
const OnStopBatch = () => {}

// 分页管理
const onSizeChange = (size) => {
  params.value.page = 1
  params.value.pageSize = size
  OnLoadFoodClass()
}
const onCurrentChange = (page) => {
  params.value.page = page
  OnLoadFoodClass()
}

// 编辑菜品信息
const OnEdit = (row) => {
  editCategoryRef.value.open(row)
}

// 删除套餐信息
const onDelete = async (row) => {
  await ElMessageBox.confirm('确定删除该套餐?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const res = await deletePackage(+row.id)
  ElMessage.success(res.data.data)
  OnLoadFoodClass()
}

// 刷新页面
const onChangeCategory = () => {
  console.log('change')
  OnLoadFoodClass()
}
</script>

<template>
  <page-container title="套餐管理">
    <template #extra>
      <el-button type="danger" text @click="OnDelBatch">批量删除</el-button>
      <el-button type="success" text @click="OnSaleBatch">批量起售</el-button>
      <el-button type="warning" text @click="OnStopBatch">批量停售</el-button>
      <el-button class="addFood" @click="OnAddFoodClass">添加套餐</el-button>
    </template>

    <!--表格区域-->
    <el-table
      v-loading="loading"
      :data="foodClassList"
      height="450"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="菜品编号" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createTime" label="上架时间" />
      <el-table-column prop="createUser" label="创建人ID" />
      <el-table-column prop="updateTime" label="最后修改时间" />
      <el-table-column prop="updateUser" label="创建人ID" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button-group class="ml-4">
            <el-button type="primary" :icon="Edit" @click="OnEdit(row)" />
            <el-button type="warning" :icon="Share">停售</el-button>
            <el-button type="danger" :icon="Delete" @click="onDelete(row)" />
          </el-button-group>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="空空如也"></el-empty>
      </template>
    </el-table>

    <!--分页区域-->
    <el-pagination
      style="margin-top: 20px; justify-content: flex-end"
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
    <editCategory
      ref="editCategoryRef"
      @change="onChangeCategory"
    ></editCategory>
  </page-container>
</template>

<style lang="scss" scoped>
.addFood {
  margin-left: 50px;
}
</style>
