<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userLoginService, userRegisterService, } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

//注册功能 数据模型
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 注册模块与登录模块切换，清空表单信息
const isRegister = ref(false)
const reserRegister = () => {
  isRegister.value = !isRegister.value
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
}

// 注册提交前预校验,校验成功再提交
const form = ref()
const register = async () => {
  await form.value.validate()
  try {
    await userRegisterService(formModel.value)
    ElMessage.success('注册成功!')
    isRegister.value = false
  } catch (error) {
    //ElMessage.error(error.message)
  }
}

const userStore = useUserStore()
const router = useRouter()
// 登录前预校验,校验成功则提交
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功!')
  router.push('/')
}

// 校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10 位的字符', trigger: 'blur' }
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
  <!--一行分成24份-->
  <el-row class="login-page">
    <el-col :span="14" class="bg"></el-col>
    <el-col :span="6" :offset="2" class="form">
      <!--注册表单-->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码确认"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="reserRegister"
            >&lt;- 返回</el-link
          >
        </el-form-item>
      </el-form>
      <!--登录表单-->
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="reserRegister"
            >注册 -></el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  .bg {
    background: url('@/assets/image/paigu.jpg') center no-repeat;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .button {
    width: 100%;
  }
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
