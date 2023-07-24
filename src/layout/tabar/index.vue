<script lang="ts" setup>
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <el-header class="header">
    <div class="header-left">
      <BreadCrumb />
    </div>
    <div class="header-right">
      <Setting />
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &-left {
    display: flex;
    align-items: center;
  }

  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
