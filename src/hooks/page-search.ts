import { ref } from 'vue'
import pageContent from '@/components/PageContent'

export function usePageSearch(): any[] {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData({})
  }

  const handleSearchClick = (query: any) => {
    pageContentRef.value?.getPageData(query)
  }

  return [pageContentRef, handleResetClick, handleSearchClick]
}
