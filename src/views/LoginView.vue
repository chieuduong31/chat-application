<template>
  <div class="login-container">
    <div class="login-form" @click="authStore.signIn">
      <GoogleIcon />
      <span>Sign in with Google</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoogleIcon from '@/components/Icons/GoogleIcon.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  background: #fff;
  width: 85%;
  padding: 12px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 18px;
  box-shadow: 4px 4px 2px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}

svg {
  width: 42px;
}
</style>
