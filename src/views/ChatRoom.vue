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
    <span class="text-sm" v-if="chatbox && chatbox[0]?.readerIsTyping"
      >占い師が入力しています。。。</span
    >
    <div id="end" class="end"></div>
    <SendMessage
      v-if="!isEnded"
      :isEnd="isEnded"
      @sent="scrollToBottom"
      :send="sendMessage"
      :sendUnread="sendUnread"
      :isTyping="isTyping"
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
import { computed, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const readerId = route.query.chat_id as string

const { messages, sendMessage, unsubscribe } = await useChat(readerId)
const { chatbox, unsubscribe: _unsubscribe, isTyping, lastMessage, endSession } = await useBox(readerId)
const { sendUnread } = await useUnread()

const isEnded = computed(() => chatbox.value && chatbox.value[0] && chatbox.value[0].isEnding)

const scrollToBottom = () => {
  const ele = document.getElementById('end')
  ele?.scrollIntoView()
}

let countdown: number | null = null;
let countdownTime = 600;

let prevLastMessage = null;

const stopWatchEffect = watchEffect(() => {
  if (chatbox.value && chatbox.value[0] && messages.value && messages.value.length > 0) {
    const newVal = chatbox.value[0].lastMessage; // assuming this is the time of the last message

    if (newVal?.toDate().getTime() != prevLastMessage?.toDate().getTime()) {
      if (countdown) {
        clearInterval(countdown);
      }

      countdownTime = 600;

      if (chatbox.value[0].isEnding) {
        return;
      }
      countdown = setInterval(() => {
        countdownTime--;
        console.log(countdownTime)
        if (countdownTime <= 0) {
          endSession(chatbox.value[0]?.id);
          clearInterval(countdown);
        }
      }, 1000);
    }

    prevLastMessage = newVal;
  }
});

let runOnce = true;
watch(
  () => chatbox.value,
  (newChatbox) => {
    if (newChatbox && newChatbox[0] && !newChatbox[0].isEnding && newChatbox[0].lastMessage && runOnce) {
      const lastMessage = newChatbox[0]?.lastMessage.toDate()
      const now = new Date()
      const diff = now.getTime() - lastMessage?.getTime()
      if (diff > 600000 && !newChatbox[0]?.isEnding) {
        endSession(newChatbox[0]?.id)
      }
      runOnce = false
    }
  }
)
let isFirstRun = true
watch(
  () => messages.value,
  () => {
    scrollToBottom()
    if (isFirstRun) {
      isFirstRun = false;
    } else {
      lastMessage()
    }

  }
)

const backToList = () => {
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
  if (countdown) {
    clearInterval(countdown);
  }
  stopWatchEffect();
})

</script>

<style scoped>
.chat-container {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;

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
