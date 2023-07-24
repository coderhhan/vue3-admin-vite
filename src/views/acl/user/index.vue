<script lang="ts" setup>
import PageSearch from '@/components/PageSearch/index'
import PageContent from '@/components/PageContent/index'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
</script>

<template>
  <div>
    <page-search :searchConfig="searchConfig"></page-search>
    <page-content pageName="user" :contentConfig="contentConfig"></page-content>
  </div>
</template>

<style lang="scss" scoped></style>
