<script lang="ts" setup>
import PageSearch from '@/components/PageSearch/index'
import PageContent from '@/components/PageContent/index'
import PageModel from '@/components/PageModel/index'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modelConfig } from './config/model.config'
import { usePageSearch } from '@/hooks/page-search'
import { usePageModel } from '@/hooks/page-model'


const [pageModelRef, defaultInfo, handleAddClick, handleEditClick] = usePageModel()

const [pageContentRef, handleResetClick, handleSearchClick] = usePageSearch()

</script>

<template>
  <div>
    <page-search :searchConfig="searchConfig" @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"></page-search>
    <page-content pageName="role" ref="pageContentRef" :contentConfig="contentConfig" @addUserClick="handleAddClick"
      @editUserClick="handleEditClick"></page-content>
    <page-model ref="pageModelRef" :defaultInfo="defaultInfo" pageName="role" :modelConfig="modelConfig"></page-model>
  </div>
</template>

<style lang="scss" scoped></style>
