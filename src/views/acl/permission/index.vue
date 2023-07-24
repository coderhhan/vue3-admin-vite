<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import HTable from '@/components/HTable'
import MenuDialog from './addmenuDialog.vue'
import { contentConfig } from './config/content.config'
import {
  reqAllPermission,
  reqRemoveMenu,
} from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
  Permission,
} from '@/api/acl/menu/type'

let pageData = ref<PermissionList>([])
let dialogRef = ref()
onMounted(() => {
  getHasPermission()
})
const getHasPermission = async () => {
  let res: PermissionResponseData = await reqAllPermission()
  if (res.code === 200) {
    pageData.value = res.data
  }
}

const pageInfo: any = ref({
  currentPage: 1,
  pageSize: 10,
})

const handleEditClick = (res: Permission) => {
  dialogRef.value?.showDialog(res, 'edit')
}

const handleAddClick = (res: Permission) => {
  dialogRef.value?.showDialog(res, 'create')
}

const handleDeleteClick = (id: number) => {
  ElMessageBox.confirm(
    '确定要删除吗?',
    '操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let res = await reqRemoveMenu(id)
      if (res.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' })
      }
      getHasPermission()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

function handleClosed(type: string) {
  switch (type) {
    case 'cancel': {
      break
    }
    case 'finish': {
      getHasPermission()
      break
    }
  }
}
</script>

<template>
  <el-card>
    <HTable :list-data="pageData" v-bind="contentConfig" v-model:page="pageInfo">
      <template #action="scope">
        <el-button @click=handleAddClick(scope.row) :disabled="scope.row.level === 4">
          {{ scope.row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button @click=handleEditClick(scope.row) :disabled="scope.row.level === 1" type="primary">编辑</el-button>
        <el-button @click=handleDeleteClick(scope.row.id) type="danger" :disabled="scope.row.level === 1">删除</el-button>
      </template>
    </HTable>

    <MenuDialog ref="dialogRef" @closed="handleClosed" />
  </el-card>
</template>

<style lang="scss" scoped></style>
