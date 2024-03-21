<template>
  <div
    class="chat-container"
    :class="{
      'is-ended': isEnded
    }"
  >
    <p class="end-notify" v-if="isEnded">トークを終了しました</p>
    <template v-else>
      <TheMessage
        v-for="(message, index) in messages"
        :key="index"
        :isOwn="message.from === authStore.user?.uid"
        :message="message"
      />
    </template>
    <span v-if="chatbox[0].readerIsTyping">Is typing...</span>
    <div id="end" class="end"></div>
    <SendMessage v-if="!isEnded" :isEnd="isEnded" @sent="scrollToBottom" :send="sendMessage" :sendUnread="sendUnread" :chatboxId="chatbox?.[0]?.id" :readerId="readerId"/>
  </div>
</template>

<script setup lang="ts">
import SendMessage from '@/components/SendMessage.vue'
import TheMessage from '@/components/TheMessage.vue'
import { useBox } from '@/composables/useBox'
import { useChat } from '@/composables/useChat'
import { useUnread } from '@/composables/useUnread'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const readerId = route.query.line_user_id as string

const { messages, sendMessage, unsubscribe } = await useChat(readerId)
const { chatbox, unsubscribe: _unsubscribe } = await useBox(readerId)
const { sendUnread } = await useUnread()

const isEnded = computed(() => chatbox.value && chatbox.value[0] && chatbox.value[0].isEnding)


const scrollToBottom = () => {
  const ele = document.getElementById('end')
  ele?.scrollIntoView()
}

onMounted(() => {
  setTimeout(() => {
    scrollToBottom()
  }, 200)
})

onUnmounted(() => {
  unsubscribe()
  _unsubscribe()
})
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

.end-notify {
  margin: auto;
  font-weight: 700;
  color: #fff;
  font-size: 24px;
}

.is-ended {
  overflow: unset;
}
</style>
