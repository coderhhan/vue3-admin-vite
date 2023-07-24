import { createApp } from 'vue'
import App from '@/App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'
import { globalRegister } from './global'
//引入全局样式
import '@/assets/styles/index.scss'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
import pinia from './store'
import './permission'

const app = createApp(App)
app.use(globalComponent)
app.use(globalRegister)
app.use(pinia)
app.use(router)
app.mount('#app')
