<template>
  <!-- ---------------------------------------------- -->
  <!--App Bar -->
  <!-- ---------------------------------------------- -->
  <v-app-bar>
    <!-- ---------------------------------------------- -->
    <!-- search input mobil -->
    <!-- ---------------------------------------------- -->
    <div v-if="showMobileSearch" class="d-flex flex-fill align-center">
      <v-text-field
        color="primary"
        variant="solo"
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-close"
        hide-details
        placeholder="Search"
        @click:append-inner="showMobileSearch = false"
      ></v-text-field>
    </div>
    <div v-else class="px-2 d-flex align-center justify-space-between w-100">
      <!-- ---------------------------------------------- -->
      <!-- NavIcon -->
      <!-- ---------------------------------------------- -->
      <v-app-bar-nav-icon
        @click="state.mainSidebar = !state.mainSidebar"
      ></v-app-bar-nav-icon>
      <div>
        <v-text-field
          v-if="mdAndUp"
          class="ml-2"
          style="width: 400px"
          color="primary"
          variant="solo"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          hide-details
          placeholder="Search"
        ></v-text-field>
      </div>

      <v-spacer></v-spacer>

      <div>
        <v-btn v-if="!mdAndUp" icon @click="showMobileSearch = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- search input desktop -->

        <v-btn v-if="mdAndUp" icon class="text-none">
          <v-badge dot color="success">
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- <v-btn v-if="mdAndUp" icon to="/apps/todo" class="text-none">
          <v-badge :content="`${todoStore.getTodoList.length} +`" color="error">
            <v-icon>mdi-calendar-check</v-icon>
          </v-badge>
        </v-btn> -->
        <UiToolbarLanguage />
        <!-- <ToolbarNotifications />
        <ToolbarUser /> -->
      </div>
    </div>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()
const customizeTheme = useCustomizeThemeStore()
const { state } = customizeTheme
const showMobileSearch = ref(false)
</script>

<style scoped lang="scss"></style>
