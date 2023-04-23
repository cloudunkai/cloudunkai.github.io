<template>
  <div>
    <v-snackbar
      v-model="state.isShow"
      timeout="2000"
      :color="state.type"
      class="elevation-10"
      location="top"
      multi-line
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ getIcon(state.type) }}</v-icon>
        <span> {{ state.message }}</span>
      </div>

      <template #actions>
        <v-btn icon variant="text" @click="state.isShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const snackbarStore = useSnackbarStore()
const { state } = snackbarStore

const getIcon = (type: 'info' | 'success' | 'error' | 'warning') => {
  const icon = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle',
    warning: 'mdi-alert'
  }
  return icon[type]
}
</script>
