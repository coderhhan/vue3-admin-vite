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
      field: 'username',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
    },
    {
      field: 'name',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名',
    },
    {
      field: 'password',
      label: '登陆密码',
      type: 'input',
      isHide: false,
      placeholder: '请输入登陆号码',
    },
  ],
}
