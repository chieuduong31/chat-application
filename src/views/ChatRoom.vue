<template>
  <div
    class="chat-container"
    :class="{
      'is-ended': isEnded
    }"
  >
    <div class="end-notify" v-if="isEnded">
      <p>トークを終了しました</p>
      <div class="back-btn" @click="backToList">戻る</div>
    </div>
    <template v-else>
      <TheMessage
        v-for="(message, index) in messages"
        :key="index"
        :isOwn="message.from === authStore.user?.uid"
        :message="message"
      />
    </template>
    <span class="text-sm" v-if="chatbox && chatbox[0].readerIsTyping"
      >占い師が入力しています。。。</span
    >
    <div id="end" class="end"></div>
    <SendMessage
      v-if="!isEnded"
      :isEnd="isEnded"
      @sent="scrollToBottom"
      :send="sendMessage"
      :sendUnread="sendUnread"
      :chatboxId="chatbox?.[0]?.id"
      :readerId="readerId"
    />
  </div>
</template>

<script setup lang="ts">
import SendMessage from '@/components/SendMessage.vue'
import TheMessage from '@/components/TheMessage.vue'
import { useBox } from '@/composables/useBox'
import { useChat } from '@/composables/useChat'
// @ts-ignore
import { useUnread } from '@/composables/useUnread'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const readerId = route.query.chat_id as string

const { messages, sendMessage, unsubscribe } = await useChat(readerId)
const { chatbox, unsubscribe: _unsubscribe, continueChatting } = await useBox(readerId)
const { sendUnread } = await useUnread()

const isEnded = computed(() => chatbox.value && chatbox.value[0] && chatbox.value[0].isEnding)

const scrollToBottom = () => {
  const ele = document.getElementById('end')
  ele?.scrollIntoView()
}

watch(
  () => messages.value,
  () => {
    scrollToBottom()
  }
)

const backToList = () => {
  continueChatting()
  router.push({
    name: 'Home'
  })
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

.back-btn {
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 10px 30px;
  background: #fff;
  color: #fa94af;
  border-radius: 6px;
  font-weight: 700;
  font-size: 30px;
  cursor: pointer;
}

.text-sm {
  font-size: 12px;
}
</style>
