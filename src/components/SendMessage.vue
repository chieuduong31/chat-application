<template>
  <div class="send-container">
    <div class="message-input">
      <el-input
        ref="inputRef"
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="メッセージを入力してください。"
      />
    </div>
    <div class="send-btn-container">
      <div class="send-btn" @click="_send">送信</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref, watch  } from 'vue'

interface Props {
  send: (msg: string) => void
  sendUnread: (chatboxId: string) => void
  chatboxId: string
  readerId: string
  isTyping: (isTyping: boolean) => void
}

const props = defineProps<Props>()

// const { isTyping } = await useBox(props.readerId)

const emit = defineEmits<{
  (e: 'sent'): void
}>()

const textarea = ref('')

const inputRef = ref<HTMLElement | null>(null)

watch(textarea, (newValue) => {
  if (newValue != '') {
    props.isTyping(true)
  } else {
    props.isTyping(false)
  }
})

// useEventListener(inputRef, 'keydown', (e) => {
//   if (e.key === 'Enter' && e.shiftKey) {
//     // generate new line
//   } else if (e.key === 'Enter') {
//     // trigger send message
//     _send()
//     e.preventDefault()
//   }
// })

const _send = () => {
  if (textarea.value.trim() !== '') {
    props.send(textarea.value)
    props.sendUnread(props.chatboxId)
    textarea.value = ''
    emit('sent')
  }
}
</script>

<style scoped lang="scss">
.send-container {
  display: flex;
  align-items: stretch;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  transform: translateX(-12px);
}

.message-input {
  flex: 1;
  padding-right: 12px;
  border-right: 1px solid #111;
  padding: 12px;
}

.send-btn-container {
  padding: 12px;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #fff;
}

.send-btn {
  padding: 6px 20px;
  background: #fa94af;
  border-radius: 4px;
}
</style>
