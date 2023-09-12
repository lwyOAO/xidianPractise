<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { foodCategoryAdd, foodCategoryUpdate } from '@/api/foodCategory.js'
import { useUserStore } from '@/stores'

// 数据模型
const formModel = ref({
  id: '',
  name: '',
  sort: '',
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
  formModel.value.sort = +formModel.value.sort
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
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是 2-10 位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15 位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15 位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
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
            <el-form-item>
              <el-text>分类名</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.name"
                placeholder="请输入菜品名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>排序</el-text>
              <el-input
                name="password"
                v-model="formModel.sort"
                :prefix-icon="Lock"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>分类编号</el-text>
              <el-input
                :prefix-icon="User"
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
