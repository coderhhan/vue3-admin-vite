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

import {
  reqRemoveRole,
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
} from '@/api/acl/role'

import type {
  RoleResponseData,
  Records as RecordsRole,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'

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
      roleList: <RecordsRole>[],
      roleCount: 0,
    }
  },
  getters: {
    getterListData(state) {
      return function (pageName: string) {
        switch (pageName) {
          case 'user': {
            return state.userList
          }
          case 'role': {
            return state.roleList
          }
        }
      }
    },
    getterCountData(state) {
      return function (pageName: string) {
        switch (pageName) {
          case 'user': {
            return state.userCount
          }
          case 'role': {
            return state.roleCount
          }
        }
      }
    },
  },
  actions: {
    getList(query: any) {
      switch (query.pageName) {
        case 'user': {
          this.getUser(query)
          break
        }
        case 'role': {
          this.getRole(query)
          break
        }
      }
    },
    async getRole(query: any) {
      const { pageNo, pageSize, roleName } = query
      const res: RoleResponseData = await reqAllRoleList(
        pageNo,
        pageSize,
        roleName ?? '',
      )
      if (res.code === 200) {
        this.roleCount = res.data.total
        this.roleList = res.data.records
      }
    },

    addOrUpdateRole(query: any) {
      return new Promise((resolve, reject) => {
        reqAddOrUpdateRole(query).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: query.id ? '更新成功' : '添加成功',
            })
            this.getList({
              pageNo: 1,
              pageSize: 10,
              keyword: '',
              pageName: 'role',
            })
            resolve(res)
          } else {
            ElMessage({
              type: 'error',
              message: query.id ? '更新失败' : '添加失败',
            })
            reject()
          }
        })
      })
    },

    deleteRole(id: number) {
      return new Promise((resolve, reject) => {
        reqRemoveRole(id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.getList({
              pageNo: 1,
              pageSize: 10,
              keyword: '',
              pageName: 'role',
            })
            resolve(res)
          } else {
            ElMessage({
              type: 'error',
              message: res.message,
            })
            reject()
          }
        })
      })
    },

    async getUser(query: any) {
      const { pageNo, pageSize, username } = query
      const res: UserResponseData = await reqUserInfo(
        pageNo,
        pageSize,
        username ?? '',
      )
      if (res.code === 200) {
        this.userCount = res.data.total
        this.userList = res.data.records
      }
    },

    addOrUpdateUser(query: any) {
      return new Promise((resolve, reject) => {
        reqAddOrUpdateUser(query).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: query.id ? '更新成功' : '添加成功',
            })
            this.getList({
              pageNo: 1,
              pageSize: 10,
              keyword: '',
              pageName: 'user',
            })
            resolve(res)
          } else {
            ElMessage({
              type: 'error',
              message: query.id ? '更新失败' : '添加失败',
            })
            reject()
          }
        })
      })
    },

    deleteUser(id: number) {
      return new Promise((resolve, reject) => {
        reqRemoveUser(id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.getList({
              pageNo: 1,
              pageSize: 10,
              keyword: '',
              pageName: 'user',
            })
            resolve(res)
          } else {
            ElMessage({
              type: 'error',
              message: res.message,
            })
            reject()
          }
        })
      })
    },
  },
})

export default usePermissionStore
