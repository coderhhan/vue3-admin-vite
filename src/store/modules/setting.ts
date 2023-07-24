import { defineStore } from 'pinia'

const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isCollapse: false,
      refsh: false,
    }
  },
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    changeRefsh() {
      this.refsh = !this.refsh
    },
  },
})

export default useSettingStore
