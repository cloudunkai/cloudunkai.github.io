<template>
  <v-app v-cloak id="inspire">
    <SideBar v-model="drawer" />
    <v-app-bar>
      <Navbar />
    </v-app-bar>
    <v-main :loading="true">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false)
</script>
