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
      field: 'username',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
    },
  ],
}
