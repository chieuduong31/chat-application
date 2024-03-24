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
import { unsubscribe } from 'diagnostics_channel'

const router = useRouter()

interface Props {
  readers: Reader[]
}

defineProps<Props>()

const getDetail = async (reader) => {
  const { chatbox,unsubscribe, continueChatting } = await useBox(reader.id)
  let count = 0
  watch(chatbox, (newValue) => {
    if (count > 0) {
      return
    }
    if (newValue && newValue.length > 0 && newValue[0].isEnding) {
      continueChatting()
      router.push({
        name: 'Chat',
        query: {
          chat_id: reader.id
        }
      })
      count++
    } else {
      router.push({
        name: 'Chat',
        query: {
          chat_id: reader.id
        }
      })
    count++
    }
  });
  unsubscribe
}
</script>

<style scoped>
.readers-container {
  display: flex;
  flex-direction: column;
}
</style>
