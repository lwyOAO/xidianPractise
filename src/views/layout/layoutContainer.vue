<script setup>
import {
  UserFilled,
  Food,
  Dish,
  CaretBottom,
  Memo,
  ForkSpoon
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { userLogoutService } from '@/api/login'

const router = useRouter()
const userStore = useUserStore()

const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你确认要退出吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })

    const res = await userLogoutService()
    if (res.data.code === 1) {
      ElMessage.success(res.data.data)
      userStore.setUser({})
      router.push('/login')
    } else {
      ElMessage.error(res.data.data)
    }
  } else if (key === 'info') {
    router.push('/user/info')
  }
}

// 用户头像
const avatar =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <div class="el-aside__logo"></div>
        <el-menu default-active="2" class="el-menu-vertical" router>
          <el-menu-item index="/manage/employee">
            <el-icon><UserFilled /></el-icon>
            <span>员工管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/foodClass">
            <el-icon><Food /></el-icon>
            <span>分类管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/foodSet">
            <el-icon><Dish /></el-icon>
            <span>套餐管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/food">
            <el-icon><ForkSpoon /></el-icon>
            <span>菜品管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/orderForm">
            <el-icon><Memo /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          ><div class="top">
            欢迎进入后台管理系统，高贵的
            <strong>{{ userStore.user.username }}</strong>
            管理员
          </div>

          <el-dropdown placement="bottom-end" @command="handleCommand">
            <!--展示给用户看的-->
            <span class="el-dropdown__box">
              <el-avatar :src="avatar" />
              <el-icon class="icon"><CaretBottom /></el-icon>
            </span>
            <!--折叠的下拉部分-->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info" :icon="User"
                  >基本资料</el-dropdown-item
                >
                <el-dropdown-item command="avatar" :icon="Crop"
                  >更换头像</el-dropdown-item
                >
                <el-dropdown-item command="password" :icon="EditPen"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item command="logout" :icon="SwitchButton"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown></el-header
        >
        <el-main><RouterView></RouterView></el-main>
        <!-- <el-footer>Copyright &copy; 2023 lwyoao.com</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  width: 200px;
  height: 100vh;
  .el-menu-vertical {
    margin-top: 50%;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  .top {
    margin-left: 10px;
    margin-top: 30px;
    strong {
      color: #ffd700;
    }
  }
  .el-dropdown__box {
    display: flex;
    align-items: center;

    .icon {
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
}
.el-main {
  padding-top: 10px;
  padding-bottom: 15px;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
</style>
