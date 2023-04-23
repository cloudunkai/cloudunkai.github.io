<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>
</template>
<script setup lang="ts">
const drawer = ref(false)
</script>

<style scoped lang="scss"></style>
