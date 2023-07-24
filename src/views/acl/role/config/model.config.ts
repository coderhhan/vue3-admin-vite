import { HForm } from '@/components/HForm'

export const modelConfig: HForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px',
  },
  // colLayout: {
  //   span: 8
  // },
  collapseLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
  formItems: [
    {
      field: 'roleName',
      label: '职位名称',
      type: 'input',
      placeholder: '请输入职位名称',
    },
  ],
}
