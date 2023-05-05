<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
const props = defineProps({
  size: {
    type: Number,
    default: 300
  }
})
</script>

<template>
  <Vue3Lottie
    animation-link="https://assets6.lottiefiles.com/packages/lf20_ofa3xwo7.json"
    :height="props.size"
    :width="props.size"
  />
</template>

<style scoped lang="scss"></style>
