<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { addEmployeeService, updateEmployeeService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

//注册功能 数据模型
const formModel = ref({
  id: '',
  name: '',
  password: '',
  sex: '',
  idNumber: '',
  phone: '',
  createtime: '',
  createUser: '',
  username: '',
  status: '1'
})

const drawerVisiable = ref(false)
// 定义控制抽屉是否显示的函数
const open = (row) => {
  formModel.value = { ...row }
  drawerVisiable.value = true
}
const OnCancel = () => {
  drawerVisiable.value = false
}

defineExpose({
  open
})

const emit = defineEmits(['change'])

const userStore = useUserStore()

// 提交表单
const form = ref()
const OnAddEmployee = async () => {
  await form.value.validate()
  formModel.value.createtime = new Date()
  formModel.value.createUser = userStore.user.id
  formModel.value.status = formModel.value.status === '1' ? 1 : 0
  formModel.value.id = +formModel.value.id
  const res = await addEmployeeService(formModel.value)
  if (res.data.code === 1) {
    ElMessage.success('添加员工信息成功')
    emit('change')
  } else {
    ElMessage.error(res.data.data)
  }
}

// 修改信息
const OnEditEmployee = async () => {
  formModel.value.createUser = userStore.user.id
  formModel.value.status = formModel.value.status === '1' ? 1 : 0
  formModel.value.id = +formModel.value.id
  const res = await updateEmployeeService(formModel.value)
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
  <el-drawer
    v-model="drawerVisiable"
    direction="rtl"
    size="60%"
    title="添加员工"
  >
    <template #header>
      <h4>添加员工</h4>
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
              <el-text>用户名</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.name"
                placeholder="请输入员工姓名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>登录密码</el-text>
              <el-input
                name="password"
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>身份证号</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.idNumber"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>账号状态</el-text>
              <el-select v-model="formModel.status" size="large">
                <el-option label="启用" value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="right" :span="8" :offset="2">
            <el-form-item>
              <el-text>员工昵称</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.username"
                placeholder="请输入员工昵称"
              ></el-input>
            </el-form-item>
            <el-form-item required>
              <el-text style="width: 100%">性别</el-text>
              <el-select v-model="formModel.sex" size="large">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-text>电话号码</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.phone"
                placeholder="请输入电话号码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-text>员工编号</el-text>
              <el-input
                :prefix-icon="User"
                v-model="formModel.id"
                placeholder="请输入员工编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="OnCancel">取消</el-button>
        <el-button type="primary" @click="OnEditEmployee" v-if="formModel.name"
          >更改</el-button
        >
        <el-button type="primary" @click="OnAddEmployee" v-else>
          增添
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-text {
  margin-right: 10px;
}
</style>
