<script setup lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Page, HTableColumn } from '../type/index'

const props = defineProps({
  propsList: {
    type: Array as unknown as PropType<[HTableColumn]>,
    required: true,
  },
  listData: {
    type: Array,
    default() {
      return []
    },
  },
  listCount: {
    type: Number,
    default() {
      return 1
    },
  },
  page: {
    type: Object as PropType<Page>,
    default: () => ({ currentPage: 0, pageSize: 10 }),
  },
})
const emit = defineEmits(['update:page'])
const handleSizeChange = (value: number) => {
  emit('update:page', { ...props.page, pageSize: value })
}
const handleCurrentChange = (value: number) => {
  emit('update:page', { ...props.page, currentPage: value })
}

const slotNames = ref(
  props.propsList
    .filter((item: any) => {
      return !!item.slot && item.slot !== 'createAt'
    })
    .map((item: any) => {
      return item.slot
    }),
)
</script>

<template>
  <div>
    <el-table :data="listData" style="width: 100%">
      <template v-for="column in propsList" :key="column.field">
        <el-table-column v-bind="column" align="center" show-overflow-tooltip>
          <template
            #default="scope"
            v-if="column.slot && slotNames.indexOf(column.slot) != -1"
          >
            <slot :name="column.slot" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
          <template #default="scope" v-else-if="column.slot === 'createAt'">
            <slot :name="column.slot" :row="scope.row">
              {{ $filters.formatTime(scope.row[column.prop]) }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :currentPage="page.currentPage"
      :page-size="page.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="less"></style>
