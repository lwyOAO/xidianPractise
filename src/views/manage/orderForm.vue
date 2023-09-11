<script setup>
import { ref } from 'vue'
import editEmployee from './components/editEmployee.vue'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { useFoodClassStore } from '@/stores/index.js'

// 控制抽屉显示隐藏
const editFoodRef = ref()

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
// 控制加载图标是否显示
const loading = ref(false)

// 输入框数据
const inputValue = ref()
// 时间数据
const timeValue = ref()
</script>

<template>
  <page-container title="订单管理">
    <template #extra>
      <div class="top">
        <el-input
          v-model="inputValue"
          placeholder="输入订单编号搜索"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :size="size"
        />
      </div>
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
      <el-table-column prop="food_name" label="订单编号"></el-table-column>
      <el-table-column prop="picture" label="订单状态"></el-table-column>
      <el-table-column prop="food_class" label="用户地址"></el-table-column>
      <el-table-column prop="price" label="手机号"></el-table-column>
      <el-table-column prop="last_date" label="下单时间"></el-table-column>
      <el-table-column prop="sale_state" label="实收金额"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button-group class="ml-4">
            <el-button type="primary" :icon="Edit" @click="OnEdit(row)" />
            <el-button type="warning" :icon="Share">冻结</el-button>
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
.top {
  display: flex;
  justify-content: space-between;
  .el-input {
    margin-right: 20px;
  }
}
.addFood {
  margin-left: 50px;
}
</style>
