import { defineStore } from 'pinia'
import type { UserState } from './types/user.type'
import router from '@/router'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { filterAsyncRoute } from '@/utils/routeFormat'
import cloneDeep from 'lodash/cloneDeep'
import { constantRoute, asyncRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: '',
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      let res: LoginResponseData = await reqLogin(data)
      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data as string
        // 持久化
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data as string))
      }
    },
    async userInfo() {
      let res: userInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name as string
        this.avatar = res.data.avatar as string
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute]
        ;[...userAsyncRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
})

export default useUserStore
