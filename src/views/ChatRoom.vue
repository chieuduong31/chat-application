<template>
  <div class="chat-container">
    <TheMessage
      v-for="(message, index) in messages"
      :key="index"
      :isOwn="message.from === authStore.user?.uid"
      :message="message"
    />

    <div id="end" class="end"></div>
    <SendMessage @sent="scrollToBottom" :send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import SendMessage from '@/components/SendMessage.vue'
import TheMessage from '@/components/TheMessage.vue'
import { useChat } from '@/composables/useChat'
import { useAuthStore } from '@/stores/auth'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const readerId = route.query.id as string

const { messages, sendMessage, unsubscribe } = await useChat(readerId)

const scrollToBottom = () => {
  const ele = document.getElementById('end')
  ele?.scrollIntoView()
}

onMounted(() => {
  setTimeout(() => {
    scrollToBottom()
  }, 200)
})

onUnmounted(unsubscribe)
</script>

<style scoped>
.chat-container {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  height: calc(100vh - 2 * 72px);
  overflow: scroll;
}

.end {
  padding: 18px;
}
</style>
