<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores'
import {
  User,
  Iphone,
  Tickets,
  Female,
  Male,
  SuccessFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px'
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default
  }
})

// 用户资料
const userStore = useUserStore()
</script>

<template>
  <el-descriptions
    class="margin-top"
    title="用户资料"
    :column="3"
    :border="true"
  >
    <template #extra>
      <el-button type="primary">编辑</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户编号
        </div>
      </template>
      {{ userStore.user.id }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户名
        </div>
      </template>
      {{ userStore.user.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          电话号码
        </div>
      </template>
      {{ userStore.user.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Male v-if="userStore.user.sex === '1'" />
            <Female v-else />
          </el-icon>
          性别
        </div>
      </template>
      {{ userStore.user.sex === '1' ? '男' : '女' }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <SuccessFilled
              color="var(--el-color-success)"
              v-if="userStore.user.status === 1"
            />
            <CircleCloseFilled color="var(--el-color-error)" v-else />
          </el-icon>
          账号状态
        </div>
      </template>
      {{ userStore.user.status === 1 ? '正常' : '禁用' }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          标签
        </div>
      </template>
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>
