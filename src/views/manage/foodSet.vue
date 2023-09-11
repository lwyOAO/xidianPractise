<script setup>
import { ref } from 'vue'
import editEmployee from './components/editEmployee.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useFoodClassStore } from '@/stores/index.js'

// 控制抽屉显示隐藏
const editFoodRef = ref()
const OnAddFoodClass = () => {
  editFoodRef.value.open()
}

// 控制分页大小
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: '',
  name: ''
})

// 批量选择
const handleSelectionChange = (list) => {
  //list为选中的数据foodClassList
  // 收集数据中的id
  const selList = list.map((item) => item.food_id)
  return selList
}

// 菜品数据
const foodClassStore = useFoodClassStore()
const OnDelBatch = () => {}
const OnSaleBatch = () => {}
const OnStopBatch = () => {}

// 控制加载图标是否显示
const loading = ref(false)
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
      :data="foodClassStore.foodClassList"
      height="425"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="food_name" label="菜品名称"></el-table-column>
      <el-table-column prop="picture" label="图片"></el-table-column>
      <el-table-column prop="food_class" label="菜品分类"></el-table-column>
      <el-table-column prop="price" label="售价"></el-table-column>
      <el-table-column prop="last_date" label="最后修改时间"></el-table-column>
      <el-table-column prop="sale_state" label="售卖状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button-group class="ml-4">
            <el-button type="primary" :icon="Edit" @click="OnEdit(row)" />
            <el-button type="warning" :icon="Share">停售</el-button>
            <el-button type="danger" :icon="Delete" />
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
    <editEmployee ref="editFoodRef"></editEmployee>
  </page-container>
</template>

<style lang="scss" scoped>
.addFood {
  margin-left: 50px;
}
</style>
