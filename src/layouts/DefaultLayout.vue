<template>
  <TheHeader v-if="!isLoginPage" />
  <slot />
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isLoginPage = computed(() => route.name === 'Login')
</script>
