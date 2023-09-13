<script setup>
import { ref } from 'vue'
import editEmployee from './components/editEmployee.vue'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { getOrderDetail } from '@/api/orderList.js'
import { ElMessage } from 'element-plus'

// 控制抽屉显示隐藏
const editFoodRef = ref()

// 控制分页大小
const total = ref(0)
const params = ref({
  page: 1,
  pageSize: 10,
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

// 控制加载图标是否显示
const loading = ref(false)

// 时间数据
const timeValue = ref([])
// 监听日期
const dateChange = (date) => {
  console.log('日期变化')
  console.log(date)
}

// 输入框数据: 订单号
const orderId = ref()
// 订单列表
const orderList = ref([])
// 初始化订单数据
const getOrderData = async () => {
  const res = await getOrderDetail({
    page: params.value.page,
    pageSize: params.value.pageSize,
    number: orderId.value || undefined, // 订单号
    beginTime: timeValue.value[0] || undefined,
    endTime: timeValue.value[1] || undefined
  })
  if (res.data.code === 1) {
    console.log(res)
    orderList.value = res.data.data.records
  } else {
    ElMessage.error(res.data.msg)
  }
}
getOrderData()
</script>

<template>
  <page-container title="订单管理">
    <template #extra>
      <div class="top">
        <el-input
          v-model="orderId"
          placeholder="输入订单编号搜索"
          class="input-with-select"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-date-picker
          v-model="timeValue"
          @change="dateChange"
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
      :data="orderList"
      height="425"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="consignee" label="用户名"></el-table-column>
      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column prop="address" label="用户地址"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="amount" label="实收金额"></el-table-column>
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
