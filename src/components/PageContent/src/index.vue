<script lang="ts" setup>
import usePermissionStore from '@/store/modules/permission'
import { ref, computed, watch } from 'vue'
import HTable from '@/components/HTable'

let props = defineProps({
  pageName: {
    type: String,
    required: true,
  },
  contentConfig: {
    type: Object,
    reqeuired: true,
  },
})

const emit = defineEmits(['addUserClick', 'editUserClick'])
const sotre = usePermissionStore()
const pageInfo: any = ref({
  currentPage: 1,
  pageSize: 10,
})
const pageData = computed(() => sotre.userList)
const pageCount = computed(() => sotre.userCount)

const getPageData = (query: any = {}) => {
  sotre.getList({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    keyword: '',
  })
}
getPageData(pageInfo)

//监听码数据改变后刷新列表
watch(pageInfo, () => {
  getPageData()
})

const handleClick = (row: any, type: string) => {
  switch (type) {
    case 'create': {
      emit('addUserClick')
      break
    }
    case 'edit': {
      emit('editUserClick', row)
      break
    }
    case 'delete': {
      break
    }
  }
}
</script>

<template>
  <el-card class="page-content">
    <HTable
      :list-data="pageData"
      :list-count="pageCount"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #action="scope">
        <el-button @click="handleClick(scope.row, 'edit')">编辑</el-button>
        <el-button @click="handleClick(scope.row, 'delete')">删除</el-button>
      </template>
    </HTable>
  </el-card>
</template>

<style lang="scss" scoped>
.page-content {
  margin-top: 20px;
}
</style>
