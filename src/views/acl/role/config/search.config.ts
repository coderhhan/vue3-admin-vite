import { HForm } from '@/components/HForm'
export const searchConfig: HForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px',
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      field: 'roleName',
      label: '职位搜索',
      type: 'input',
      placeholder: '请输入关键字',
    },
  ],
}
