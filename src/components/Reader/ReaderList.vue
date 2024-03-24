<template>
  <div class="readers-container">
    <ReaderItem
    @click="getDetail(reader)"
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
import { defineProps, watch } from 'vue'
import { useBox } from '@/composables/useBox'

const router = useRouter()

interface Props {
  readers: Reader[]
}

defineProps<Props>()

const getDetail = async (reader) => {
  const { chatbox, unsubscribe: _unsubscribe, continueChatting } = await useBox(reader.id)
  const stopWatch = watch(chatbox, (newValue) => {
    if (newValue && newValue.length > 0 && newValue[0].isEnding) {
      stopWatch();
      continueChatting()
      router.push({
        name: 'Chat',
        query: {
          chat_id: reader.id
        }
      })
    } else {
      router.push({
        name: 'Chat',
        query: {
          chat_id: reader.id
        }
      })
    }
  });
}
</script>

<style scoped>
.readers-container {
  display: flex;
  flex-direction: column;
}
</style>
