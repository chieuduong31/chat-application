<template>
  <div class="reader-container">
    <div class="reader-avatar">
      <TheAvatar :src="reader.avatar" />
    </div>
    <div class="reader-information">
      <h3 class="reader-information-name">
        {{ reader.name }}
      </h3>
      <div class="reader-information-price">1文字 {{ reader.price }}pt</div>
      <div class="reader-information-rate">{{ calculateRating(reader.rate) }}</div>
      <div
        class="reader-information-status"
        :class="{
          'not-available': !reader.isOnline
        }"
      >
        {{ reader.isOnline ? STATUS.AVAILABLE : STATUS.NOT_AVAILABLE }}
      </div>
    </div>
    <div class="reader-btn">></div>
  </div>
</template>

<script setup lang="ts">
import type { Reader } from '@/types'
import TheAvatar from '../TheAvatar.vue'

const STATUS = {
  AVAILABLE: '利用可能です',
  NOT_AVAILABLE: '利用不可'
}

interface Props {
  reader: Reader
}

defineProps<Props>()

const calculateRating = (rate: number) => {
  let result = ''
  for (let i = 0; i < rate; i++) {
    result += '★'
  }
  return result
}
</script>

<style scoped>
.reader-container {
  padding: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #eee;
}

.reader-avatar {
  padding-right: 12px;
}

.reader-information {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #111;
}

.reader-information-price {
  font-size: 14px;
}

.reader-information-rate {
  font-size: 20px;
}

.reader-information-status {
  padding: 4px 20px;
  background-color: #0d9276;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  border-radius: 4px;
}

.not-available {
  background: #ee4266;
}

.reader-btn {
  color: #fff;
  transform: scale(1.5);
}
</style>
