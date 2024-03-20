<template>
  <ReaderList :readers="readers" />
</template>

<script setup lang="ts">
import ReaderList from '@/components/Reader/ReaderList.vue'
import { readers } from '@/mock/readers'
</script>
