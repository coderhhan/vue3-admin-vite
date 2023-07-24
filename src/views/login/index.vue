<script lang="ts" setup>
import { User, Lock, Warning } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

import { Ref, computed, reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
import { useRouter } from 'vue-router'

import type { loginForm } from './type'

import Identify from '@/components/VerifyCode/index.vue'
const userStore = useUserStore()

const $router = useRouter()
let loginformRef = ref()
let loading = ref(false)
const identifyCode = ref('4242')
const identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz')

const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的任意组合'))
  } else {
    callback()
  }
}

const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  console.log(value, identifyCode.value)

  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length < 4) {
    callback(new Error('请输入正确的验证码'))
  } else if (identifyCode.value !== value) {
    callback(new Error('请输入正确的验证码'))
  } else if (identifyCode.value === value) {
    callback()
  }
}

const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
  verifyCode: [
    {
      trigger: 'blur',
      validator: validatorVerifyCode,
    },
  ],
}

let loginFormData: loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
  verifyCode: '4242',
})

//刷新验证码
const refreshCode = () => {}

const handleLogin = async () => {
  await loginformRef.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginFormData)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `Hi, ${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="right-content">
        <el-card class="login-form">
          <h1>Vue-vite</h1>
          <el-form
            :model="loginFormData"
            :rules="rules"
            ref="loginformRef"
            class="demo-form-inline"
          >
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginFormData.username"
                size="large"
                placeholder="username"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :prefix-icon="Lock"
                v-model="loginFormData.password"
                size="large"
                placeholder="password"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-input
                :prefix-icon="Warning"
                v-model="loginFormData.verifyCode"
                maxlength="4"
                size="large"
                placeholder="verifyCode"
                clearable
              >
                <template #append>
                  <Identify :identifyCode="identifyCode" @click="refreshCode" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                :loading="loading"
                size="large"
                type="primary"
                @click="handleLogin"
              >
                登陆
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;

  .login-form {
    position: relative;
    width: 55%;
    min-width: 350px;
    top: 25vh;
    left: 10vw;
    padding: 10px;

    h1 {
      //字体渐变色
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }

    .login-btn {
      width: 100%;
    }
  }
}

.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
