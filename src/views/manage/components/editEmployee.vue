<script setup>
import { ref } from 'vue'
const drawerVisiable = ref(true)
// 定义控制抽屉是否显示的函数
const open = () => {
  drawerVisiable.value = true
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="drawerVisiable"
    direction="ttb"
    size="70%"
    title="添加员工"
  >
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" label="Option 1" size="large"
          >Option 1</el-radio
        >
        <el-radio v-model="radio1" label="Option 2" size="large"
          >Option 2</el-radio
        >
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>cancel</el-button>
        <el-button type="primary">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>
