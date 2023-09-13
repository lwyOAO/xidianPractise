<script setup>
import { ref } from 'vue'
import editDish from './components/editDish.vue'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getDishes, deleteDish } from '@/api/dish.js'
import { foodCategoryPage } from '@/api/foodCategory.js'

// 控制加载图标是否显示
const loading = ref(false)

// 控制抽屉显示隐藏
const editDishRef = ref()
const OnAddFoodClass = () => {
  editDishRef.value.open('')
}

// 控制分页大小
const foodName = ref('')
const total = ref(1)
const params = ref({
  page: 1,
  pageSize: 10,
  name: foodName.value ? foodName.value : undefined
})

// 批量选择
// const handleSelectionChange = (list) => {
//   //list为选中的数据foodList
//   // 收集数据中的id
//   const selList = list.map((item) => item.food_id)
//   return selList
// }

// 分组数据
const dishList = ref({})

// 初始加载菜品数据
const foodList = ref([])
const OnLoadFood = async () => {
  loading.value = true
  dishList.value = {}
  const res = await getDishes(params.value)
  if (res.data.code === 0) {
    ElMessage.error('获取菜品列表失败,请登录')
    loading.value = false
    return
  }

  foodList.value = res.data.data.records
  total.value = res.data.data.total
  loading.value = false
}
OnLoadFood()

// 初始加载分类数据
const foodClassList = ref([])
const OnLoadFoodClass = async () => {
  loading.value = true
  const res = await foodCategoryPage(params.value)
  if (res.data.code === 0) {
    ElMessage.error('获取菜品列表失败,请登录')
    loading.value = false
    return
  }
  foodClassList.value = res.data.data.records
}
OnLoadFoodClass()

// 初始化分组
const setdishList = async () => {
  const res = await getDishes({
    page: 1,
    pageSize: 99999
  })
  if (res.data.code === 1) {
    // 将菜品按类型进行分组
    res.data.data.records.forEach((item) => {
      if (dishList.value[item.categoryId]) {
        dishList.value[item.categoryId].push(item)
      } else {
        dishList.value[item.categoryId] = [item]
      }
    })
  }
}
setdishList()

// 选中的分类id
const foodClassId = ref()

// 分页管理
const onSizeChange = (size) => {
  params.value.page = 1
  params.value.pageSize = size
  OnLoadFood()
}
const onCurrentChange = (page) => {
  params.value.page = page
  OnLoadFood()
}

// 编辑菜品信息
const OnEdit = (row) => {
  editDishRef.value.open(row)
}

// 删除菜品信息
const onDelete = async (row) => {
  await ElMessageBox.confirm('确定删除该菜品?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  const res = await deleteDish(row.id)
  console.log(res)
  if (res.data.msg === '') {
    ElMessage.warning(res.data.data)
  } else {
    ElMessage.success(res.data.data)
  }
  OnLoadFood()
}

// 刷新页面
const onChangeCategory = () => {
  foodList.value = dishList.value[foodClassId.value]
}

// 新增菜品
const onChangeDish = () => {
  editDishRef.value.open('')
}
</script>

<template>
  <page-container title="菜品管理">
    <template #extra>
      <div class="top">
        <el-input
          v-model="orderId"
          placeholder="输入菜品名称搜索"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="foodClassId"
              placeholder="类型"
              style="width: 115px"
              @change="onChangeCategory"
            >
              <el-option
                v-for="(item, index) in foodClassList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-button class="addFood" @click="OnAddFoodClass">添加菜品</el-button>
      </div>
    </template>

    <!--表格区域-->
    <el-table
      v-loading="loading"
      :data="foodList"
      height="450"
      style="width: 100%"
    >
      <el-table-column prop="id" label="菜品编号" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="categoryName" label="类型" />
      <el-table-column prop="createTime" label="上架时间" />
      <el-table-column prop="updateTime" label="最后修改时间" />
      <el-table-column prop="updateUser" label="修改人ID" />
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
    <editDish :title="菜品" ref="editDishRef" @change="onChangeDish"></editDish>
  </page-container>
</template>

<style lang="scss" scoped>
.addFood {
  margin-left: 50px;
}

.top {
  display: flex;
  justify-content: space-between;
  .el-input {
    margin-right: 20px;
  }
}
</style>
