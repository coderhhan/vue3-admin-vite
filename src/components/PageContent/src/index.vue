<script lang="ts" setup>
import usePermissionStore from '@/store/modules/permission'
import { ref, computed, watch } from 'vue'
import HTable from '@/components/HTable'

let props = defineProps({
  createBtnText: {
    type: String,
    default() {
      return '新建'
    },
  },
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
const pageData = computed(() => {
  return sotre.getterListData(props.pageName)
})
const pageCount = computed(() => {
  return sotre.getterCountData(props.pageName)
})

const getPageData = (query: any = {}) => {
  sotre.getList({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    ...query,
    pageName: props.pageName,
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
      ElMessageBox.confirm('确定要删除吗?', '操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          switch (props.pageName) {
            case 'user': {
              sotre.deleteUser(row.id)
              return
            }
            case 'role': {
              sotre.deleteRole(row.id)
              return
            }
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
      break
    }
  }
}

defineExpose({
  getPageData,
})
</script>

<template>
  <el-card class="page-content">
    <div class="content-header">
      <el-button @click="handleClick(null, 'create')" type="primary">
        {{ contentConfig.createBtnText }}
      </el-button>
    </div>
    <HTable
      :list-data="pageData"
      :list-count="pageCount"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #action="scope">
        <el-button @click="handleClick(scope.row, 'edit')" type="primary">
          编辑
        </el-button>
        <el-button @click="handleClick(scope.row, 'delete')" type="danger">
          删除
        </el-button>
      </template>
    </HTable>
  </el-card>
</template>

<style lang="scss" scoped>
.page-content {
  margin-top: 20px;

  .content-header {
    text-align: right;
  }
}
</style>
