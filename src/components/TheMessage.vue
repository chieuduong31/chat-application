<template>
  <div
    class="message-container"
    :class="{
      own: isOwn
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
}

.own {
  align-self: flex-end;
  background: #5356ff;
  color: #fff;
}
</style>
