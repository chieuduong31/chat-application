<template>
  <div class="header-container">
    <div class="remaining-coin">
      <p class="remaining-coin-text">残コイン数</p>
      <p class="remaining-coin-number">3400pt</p>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.signOut()
  router.push({
    name: 'Login'
  })
}
</script>

<style scoped>
.header-container {
  display: flex;
  background: #fff;
}

.remaining-coin {
  padding-left: 10px;
  flex: 1;
  border-right: 2px solid #000;

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
