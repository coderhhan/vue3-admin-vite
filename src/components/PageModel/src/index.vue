<script lang="ts" setup name="page-model">
import { ref, watch } from 'vue'
import HForm from '@/components/HForm'
import { HFormItem } from '@/components/HForm/type/index'
import usePermissionStore from '@/store/modules/permission'
import { values } from 'lodash';
const props = defineProps({
  pageName: {
    type: String,
    required: true
  },
  modelConfig: {
    type: Object,
    default: () => {
      return {}
    }
  },
  defaultInfo: {
    type: Object,
    default() {
      return {}
    }
  }
})
const sotre = usePermissionStore()
const dialogVisible = ref(false)
const isEdit = ref(false)
const editData = ref()
const originData: any = { ...props.defaultInfo }


props.modelConfig?.formItems.forEach((config: HFormItem) => {
  originData[config.field] = ''
})
const formData = ref(originData)

watch(
  () => props.defaultInfo,
  (value) => {
    formData.value = { ...value }
  },
  {
    deep: true
  }
)

const handleConfirm = () => {

  const query = { ...formData.value }
  if (isEdit.value) {
    query.id = editData.value.id
  }
  switch (props.pageName) {
    case 'user': {
      sotre.addOrUpdateUser(query)
        .then(() => {
          dialogVisible.value = false
        })
    }

    case 'role': {
      sotre.addOrUpdateRole(query)
        .then(() => {
          dialogVisible.value = false
        })
    }
  }

}

// 新建或者编辑
function setDialogVisible(isNew: boolean = true, data: any = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  for (const key in formData) {
    if (isNew) {
      formData.value[key] = ''
    } else {
      formData.value[key] = data[key]
    }
  }
}



//暴露数据让别人可以访问
defineExpose({
  dialogVisible,
  setDialogVisible
})

</script>

<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" :destroy-on-close="true" :title="!isEdit ? '新建' : '编辑'" width="30%">
      <h-form v-model="formData" v-bind="modelConfig"> </h-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped lang="less"></style>
