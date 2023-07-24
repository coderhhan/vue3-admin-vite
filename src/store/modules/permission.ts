import { defineStore } from 'pinia'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
import type {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'

type userQuey = {
  pageNo: number
  pageSize: number
  keyword: string
}
const usePermissionStore = defineStore('Permission', {
  state: () => {
    return {
      userList: <Records>[],
      userCount: 0,
    }
  },
  actions: {
    async getList(query: userQuey) {
      let res: UserResponseData = await reqUserInfo(
        query.pageNo,
        query.pageSize,
        query.keyword,
      )
      if (res.code === 200) {
        this.userCount = res.data.total
        this.userList = res.data.records
      }
    },
  },
})

export default usePermissionStore
