<template>
  <div class="readers-container">
    <ReaderItem v-for="reader in readers" :key="reader.id" :reader="reader" />
  </div>
</template>

<script setup lang="ts">
import type { Reader } from '@/types'
import ReaderItem from './ReaderItem.vue'

interface Props {
  readers: Reader[]
}

defineProps<Props>()
</script>

<style scoped>
.readers-container {
  display: flex;
  flex-direction: column;
}
</style>
