<script setup>
import { ref } from 'vue'
import { addEmployeeService, updateEmployeeService } from '@/api/user.js'
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
  status: '1',
  repassword: ''
})

const title = ref('添加员工')
const drawerVisiable = ref(false)
const isCreated = ref(true)
// 定义控制抽屉是否显示的函数
const open = (row) => {
  if (row.id) {
    title.value = '修改员工信息'
    isCreated.value = false
    formModel.value = { ...row }
    formModel.value.repassword = formModel.value.password
  } else {
    title.value = '添加员工'
    isCreated.value = true
  }
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
  formModel.value.id = Number(formModel.value.id)
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
const rules = ref({
  name: [
    {
      pattern: /[\u4e00-\u9fa5]{1,10}/,
      message: '员工名必须是 1-10 位的汉字或字母',
      trigger: 'blur'
    },
    { required: true, message: '请输入员工姓名', trigger: 'blur' }
  ],
  username: [
    {
      pattern: /[\u4e00-\u9fa5a-zA-Z]{1,10}/,
      message: '账号名必须是 1-10 位的汉字或字母',
      trigger: 'blur'
    },
    { required: true, message: '请输入账号名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
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
  ],
  // 身份证号
  idNumber: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const idCardPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!idCardPattern.test(value)) {
          callback(new Error('身份证号格式不正确'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /\d{11}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  id: [
    { required: true, message: '请输入员工编号', trigger: 'blur' },
    {
      pattern: /^\d{1,8}$/,
      message: '员工编号必须为 1 到 8 位的数字',
      trigger: 'blur'
    }
  ]
})
</script>

<template>
  <el-drawer v-model="drawerVisiable" direction="rtl" size="60%">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form ref="form" :model="formModel" :rules="rules" size="large">
        <el-row>
          <el-col class="left" :span="10" :offset="1">
            <el-form-item prop="name" label="员工姓名">
              <el-input
                v-model="formModel.name"
                placeholder="请输入员工姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
              <el-input
                name="password"
                v-model="formModel.password"
                type="password"
                placeholder="请输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
              <el-input
                name="password"
                v-model="formModel.repassword"
                type="password"
                placeholder="请再次输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
              <el-input
                v-model="formModel.idNumber"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item label="账号状态">
              <el-select v-model="formModel.status" size="large">
                <el-option label="启用" value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="right" :span="10" :offset="1">
            <el-form-item label="账号名称" prop="username">
              <el-input
                v-model="formModel.username"
                placeholder="请输入员工账号名称"
              ></el-input>
            </el-form-item>
            <el-form-item required label="性别">
              <el-select v-model="formModel.sex" size="large">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input
                v-model="formModel.phone"
                placeholder="请输入电话号码"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="isCreated" label="员工编号" prop="id">
              <el-input
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
        <el-button type="primary" @click="OnAddEmployee" v-if="isCreated">
          增添
        </el-button>
        <el-button type="primary" @click="OnEditEmployee" v-else
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
