<script lang="ts" setup>
import Logo from './logo/index.vue'
import Tabar from './tabar/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

let userStore = useUserStore()
let $route = useRoute()

let settingStore = useLayOutSettingStore()
</script>

<template>
  <el-container class="layout-container">
    <el-aside
      width="200px"
      :class="{ isCollapse: settingStore.isCollapse ? true : false }"
    >
      <el-scrollbar>
        <el-menu
          :default-active="$route.path"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :collapse="settingStore.isCollapse"
          :router="true"
        >
          <Logo />
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <Tabar></Tabar>

      <el-main
        :style="{
          left: !settingStore.isCollapse ? '200px' : '56px',
          width: settingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 200px)',
        }"
      >
        <el-scrollbar>
          <Main />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  height: 100vh;

  .el-aside {
    background-color: #001529 !important;
    transition: all 0.3s;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    position: absolute;
    padding: 20px;
    left: 200px;
    top: 60px;
    transition: all 0.3s;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - 60px);
  }
}

.el-header {
  background-color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}

.isCollapse {
  width: 56px;
}
</style>
