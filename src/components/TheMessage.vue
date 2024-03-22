<template>
  <div
    class="message-container bubble"
    :class="{
      own: isOwn,
      'bubble-bottom-right': isOwn,
      'bubble-bottom-left': !isOwn
    }"
  >
    {{ message.msg }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOwn: boolean
  message: any
}

defineProps<Props>()
</script>

<style scoped>
.message-container {
  padding: 6px 12px;
  background: #fff;
  border-radius: 4px;
  width: fit-content;
  font-size: 14px;
  max-width: 70%;
  white-space: pre-wrap;
  word-break: break-all;
}

.own {
  align-self: flex-end;
  background: #5356ff;
  color: #fff;
}

.bubble {
  position: relative;
  font-size: 14px;
  min-width: 60px;
  border-radius: 16px;
  padding: 10px;
  color: #000;
}

.bubble-bottom-left:before {
  content: '';
  width: 0px;
  height: 0px;
  position: absolute;
  border-right: 8px solid transparent;
  border-left: 12px solid #fff;
  border-top: 8px solid #fff;
  border-bottom: 12px solid transparent;
  left: 24px;
  bottom: -16px;
}

.bubble-bottom-right:before {
  content: '';
  width: 0px;
  height: 0px;
  position: absolute;
  border-right: 12px solid #5356ff;
  border-left: 8px solid transparent;
  border-top: 8px solid #5356ff;
  border-bottom: 12px solid transparent;
  right: 24px;
  bottom: -16px;
}
</style>
