<template>
  <div class="header-container">
    <div class="remaining-coin">
      <div class="back-btn" v-if="isInChatRoom">
        <BackIcon
          @click="
            router.push({
              name: 'Home'
            })
          "
        />
      </div>
      <div class="reamining-coin-content">
        <p class="remaining-coin-text">残コイン数</p>
        <p
          class="remaining-coin-number"
          :style="{
            textAlign: isInChatRoom ? 'end' : 'start'
          }"
        >
          3400pt
        </p>
      </div>
    </div>
    <div class="buy-coin">
      <div class="buy-coin-btn">コイン購入</div>
    </div>
    <div class="buy-coin" @click="logout">
      <div class="buy-coin-btn">ログアウト</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import BackIcon from './Icons/BackIcon.vue'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.signOut()
  router.push({
    name: 'Login'
  })
}

const isInChatRoom = computed(() => route.name === 'Chat')
</script>

<style scoped>
.header-container {
  display: flex;
  background: #fff;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  cursor: pointer;
}

.remaining-coin {
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
  border-right: 2px solid #000;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remaining-coin-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.remaining-coin-text {
  font-weight: 700;
  font-size: 18px;
}

.remaining-coin-number {
  font-size: 14px;
}

.buy-coin {
  padding: 8px 8px;
  width: 80px;
}

.buy-coin-btn {
  color: #fff;
  background: #fa94af;
  border-radius: 8px;
  padding: 4px 6px;
  text-align: center;
  cursor: pointer;
}
</style>
