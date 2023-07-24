type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface HFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  isHide?: boolean //是否展示
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface HForm {
  formItems: HFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
  collapseLayout?: any
}
