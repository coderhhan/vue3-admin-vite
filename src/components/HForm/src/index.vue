<script lang="ts" setup>
import { ref, reactive, watch, PropType } from 'vue'
import { HFormItem } from '../type/index'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<HFormItem[]>,
    default: () => [],
  },
  itemLayout: {
    type: Object,
    default: () => {
      return {
        padding: '10px 40px',
      }
    },
  },
  collapseLayout: {
    type: Object,
    default: () => {
      return {
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }
    },
  },
  labelWidth: {
    type: String,
    default() {
      return '120px'
    },
  },
})
const emit = defineEmits(['update:modelValue'])

const form = ref({
  ...props.modelValue,
})

watch(
  form,
  (newValue) => {
    console.log(newValue)
    emit('update:modelValue', newValue)
  },
  { deep: true },
)
</script>

<template>
  <div class="h-form">
    <el-form :model="form" :label-width="labelWidth">
      <el-row>
        <template v-for="config in formItems" :key="config.field">
          <el-col v-bind="collapseLayout">
            <el-form-item :label="config.label" v-if="!config.isHide">
              <el-input v-model="form[`${config.field}`]" v-bind="config" />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer-btn">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.h-form {
  .footer-btn {
    text-align: center;
  }
}
</style>
