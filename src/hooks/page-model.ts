import { ref } from 'vue'
import pageModel from '@/components/PageModel/index'

type CallBackFun = (item?: any) => void
export function usePageModel(
  createCb?: CallBackFun,
  editCb?: CallBackFun,
): any[] {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})
  const handleAddClick = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value?.setDialogVisible()
      if (createCb) createCb()
    }
  }

  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value?.setDialogVisible(false, item)
      if (editCb) editCb(item)
    }
  }

  return [pageModelRef, defaultInfo, handleAddClick, handleEditClick]
}
