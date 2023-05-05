<template>
  <v-app id="inspire">
    <UiNavigation />
    <UiAppbar />
    <v-main class="main-container">
      <div class="flex-fill">
        <NuxtPage />
      </div>
    </v-main>
    <CommonBackToTop />
    <CommonSnackbar />
  </v-app>
</template>

<script setup lang="ts"></script>
<style scoped>
.scrollnav {
  height: calc(100vh - 326px);
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
