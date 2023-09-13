<script setup>
import { ref } from 'vue'
import { foodCategoryAdd, foodCategoryUpdate } from '@/api/foodCategory.js'
import { useUserStore } from '@/stores'

// 数据模型
const formModel = ref({
  id: '',
  name: '',
  sort: 1,
  type: 1,
  updateTime: '',
  updateUser: '',
  createTime: '',
  createUser: ''
})

const drawerVisiable = ref(false)
const isCreated = ref(true)
// 定义控制抽屉是否显示的函数
const open = (row) => {
  if (row.id) {
    isCreated.value = false
  }
  formModel.value = { ...row }
  drawerVisiable.value = true
}
const OnCancel = () => {
  isCreated.value = true
  drawerVisiable.value = false
}

defineExpose({
  open
})

const emit = defineEmits(['change'])
const props = defineProps(['title'])

const userStore = useUserStore()

// 表单数据格式化
const formatter = () => {
  formModel.value.createUser = +userStore.user.id
  formModel.value.updateUser = +userStore.user.id
  formModel.value.id = +formModel.value.id
  if (props.title === '菜品') {
    formModel.value.type = 1
  } else {
    formModel.value.type = 2
  }
}

// 提交表单
const form = ref()
const OnAddCategory = async () => {
  await form.value.validate()
  formatter()
  const res = await foodCategoryAdd(formModel.value)
  if (res.data.code === 1) {
    ElMessage.success(`添加成功`)
    emit('change')
  } else {
    ElMessage.error(res.data.data)
  }
}

// 修改信息
const OnEditCategory = async () => {
  await form.value.validate()
  formModel.value.createUser = userStore.user.id
  formModel.value.id = Number(formModel.value.id)
  const res = await foodCategoryUpdate(formModel.value)
  if (res.data.code === 1) {
    ElMessage.success(res.data.data)
    emit('change')
    drawerVisiable.value = false
  } else {
    ElMessage.error(res.data.data)
  }
}

// // 校验规则
const rules = {
  id: [
    { required: true, message: '请输入编号', trigger: 'blur' },
    {
      pattern: /^\d+$/,
      message: '编号必须是至少 1 位的数字',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <el-drawer v-model="drawerVisiable" direction="rtl" size="60%" title="添加">
    <template #header>
      <h4>添加{{ props.title }}</h4>
    </template>
    <template #default>
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
      >
        <el-row>
          <el-col class="left" :span="8" :offset="2">
            <el-form-item label="分类名称">
              <el-input
                v-model="formModel.name"
                placeholder="请输入分类名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类编号" prop="id">
              <el-input
                v-model="formModel.id"
                placeholder="请输入分类编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="OnCancel">取消</el-button>
        <el-button type="primary" @click="OnAddCategory" v-if="isCreated">
          增添
        </el-button>
        <el-button type="primary" @click="OnEditCategory" v-else
          >更改</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-text {
  margin-right: 10px;
}
</style>
