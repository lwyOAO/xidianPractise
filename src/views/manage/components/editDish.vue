<script setup>
import { ref } from 'vue'
import { foodCategoryUpdate } from '@/api/foodCategory.js'
import { useUserStore } from '@/stores'
import { Plus } from '@element-plus/icons-vue'
import { addDish } from '@/api/dish.js'

// 数据模型
const formModel = ref({
  name: '',
  description: '',
  price: '',
  code: '',
  categoryId: '',
  image: '',
  flavors: []
})
const name = ref('')
const value = ref('')

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

// 提交表单
const form = ref()
const OnAddCategory = async () => {
  await form.value.validate()
  formModel.value.flavors = [{ name: name.value, value: value.value }]
  formModel.value.image = '12.jpg'
  const res = await addDish(formModel.value)
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
  categoryId: [
    { required: true, message: '请输入编号', trigger: 'blur' },
    {
      pattern: /^\d+$/,
      message: '编号必须是至少 1 位的数字',
      trigger: 'blur'
    }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { pattern: /^\d+$/, message: '价格必须是数字', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入编号', trigger: 'blur' },
    { pattern: /^\d+$/, message: '编号必须是数字', trigger: 'blur' }
  ]
}

// 照片链接
const imageUrl = ref('')
const onSelectFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // formModel.value.image = uploadFile.raw
}
// 钩子
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('照片大小不能超过 2MB!')
    return false
  }
  return true
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
          <el-col class="left" :span="10" :offset="1">
            <el-form-item label="菜品名称" required>
              <el-input
                v-model="formModel.name"
                placeholder="请输入菜品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类编号" prop="categoryId">
              <el-input
                v-model="formModel.categoryId"
                placeholder="请输入分类编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input
                v-model="formModel.price"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="口味名">
              <el-input v-model="name" placeholder="请输入口味名"></el-input>
            </el-form-item>
            <el-form-item label="口味值">
              <el-input v-model="value" placeholder="请输入口味值"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="left" :span="10" :offset="1">
            <el-form-item label="菜品编号" prop="code">
              <el-input
                v-model="formModel.code"
                placeholder="请输入菜品编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜品图片" required>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-change="onSelectFile"
                :auto-load="false"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="描述" required>
              <el-input
                v-model="formModel.description"
                placeholder="请输入菜品的简要描述"
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
