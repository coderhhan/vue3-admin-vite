<script lang="ts" setup>
import { ref } from 'vue'
import HForm from '@/components/HForm/index'
import { HFormItem } from '@/components/HForm/type/index'

const props = defineProps({
  searchConfig: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const originData: any = {}
props.searchConfig?.formItems.forEach((config: HFormItem) => {
  originData[config.field] = ''
})
const formData = ref(originData)
const emit = defineEmits(['resetBtnClick', 'searchBtnClick'])
const handleReset = () => {
  props.searchConfig?.formItems.forEach((config: HFormItem) => {
    formData.value[config.field] = ''
  })
  emit('resetBtnClick')
}
const handleSearch = () => {
  console.log('搜索')
  emit('searchBtnClick', formData.value)
}

</script>

<template>
  <div class="page-search">
    <HForm v-model="formData" v-bind="searchConfig">
      <template #footer>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </template>
    </HForm>
  </div>
</template>

<style lang="scss" scoped>
.page-search {
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}
</style>
