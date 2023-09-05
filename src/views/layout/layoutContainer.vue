<script setup>
import { UserFilled, Food, Dish, CaretBottom } from '@element-plus/icons-vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <div class="el-aside__logo"></div>
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="/manage/employee">
            <el-icon><UserFilled /></el-icon>
            <span>员工管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/foodClass">
            <el-icon><Food /></el-icon>
            <span>菜品管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/foodSet">
            <el-icon><Dish /></el-icon>
            <span>套餐管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          ><div>
            hello,
            <strong></strong>
          </div>

          <el-dropdown placement="bottom-end">
            <!--展示给用户看的-->
            <span class="el-dropdown__box">
              <el-avatar shape="square" :src="avatar" />
              <el-icon class="icon"><CaretBottom /></el-icon>
            </span>
            <!--折叠的下拉部分-->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User"
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
        <el-footer>Copyright &copy; 2023 lwyoao.com</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  width: 250px;
  height: 100vh;
  background-color: #808080;
}
.el-header {
  display: flex;
  justify-content: space-between;
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
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
</style>
