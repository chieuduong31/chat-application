<template>
  <ReaderList :readers="readers" />
</template>

<script setup lang="ts">
import ReaderList from '@/components/Reader/ReaderList.vue'
import { useChat } from '@/composables/useChat'
import { readers } from '@/mock/readers'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { sendMessage, messages } = useChat()

const { user, isLogin } = storeToRefs(authStore)
</script>
