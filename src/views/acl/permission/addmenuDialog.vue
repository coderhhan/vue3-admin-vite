<script lang='ts' setup>
import type {
  MenuParams,
} from '@/api/acl/menu/type'
import {
  reqAddOrUpdateMenu,
} from '@/api/acl/menu'
import { ref, reactive } from 'vue'
let dialogVisible = ref(false)
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

const emit = defineEmits(['closed'])
const showDialog = (data: MenuParams, type: any) => {
  if (type === 'edit') {
    Object.assign(menuData, data)
  } else {
    menuData.level = data.level + 1
    menuData.pid = data.id as number
  }
  dialogVisible.value = true
}

const handleConfirm = async () => {
  dialogVisible.value = false
  let res: any = await reqAddOrUpdateMenu(menuData)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    handleCancel('finish')
  }
}
const handleCancel = (type?: string) => {
  if (type) {
    emit('closed', 'finish')
  } else {
    emit('closed', 'cancel')
  }
  dialogVisible.value = false
}

defineExpose({
  showDialog
})
</script>
 
<template>
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请你输入菜单的名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请你输入权限数值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang = "scss" scoped></style>