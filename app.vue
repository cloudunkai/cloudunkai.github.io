<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
  </NuxtLayout>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loadingStore = useLoadingStore()

nuxtApp.hook('page:start', () => {
  loadingStore.setLoading(true)
})
nuxtApp.hook('page:finish', () => {
  loadingStore.setLoading(false)
})
</script>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
