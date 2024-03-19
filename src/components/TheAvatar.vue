<template>
  <img class="avatar" :src="src" />
</template>

<script setup lang="ts">
interface Props {
  src?: string
}

defineProps<Props>()
</script>

<style scoped>
.avatar {
  width: 80px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
