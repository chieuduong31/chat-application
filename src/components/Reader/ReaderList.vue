<template>
  <div class="readers-container">
    <ReaderItem
      @click="
        router.push({
          name: 'Chat',
          query: {
            id: reader.id
          }
        })
      "
      v-for="reader in readers"
      :key="reader.id"
      :reader="reader"
    />
  </div>
</template>

<script setup lang="ts">
import type { Reader } from '@/types'
import ReaderItem from './ReaderItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
