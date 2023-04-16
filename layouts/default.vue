<template>
  <v-app id="inspire">
    <!-- <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer v-model="drawer" absolute color="grey-lighten-3" rail>
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey-darken-1"
        size="36"
      ></v-avatar>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar
        v-for="n in 6"
        :key="n"
        class="d-block text-center mx-auto mb-9"
        color="grey-lighten-1"
        size="28"
      ></v-avatar>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <NuxtPage />
      <h3 class="ma-5" style="white-space: break-spaces">{{ data }}</h3>
    </v-main>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer app height="72">
      <v-text-field
        v-model="message"
        bg-color="grey-lighten-1"
        class="rounded-pill overflow-hidden"
        density="compact"
        hide-details
        variant="solo"
      ></v-text-field>
      <v-btn color="" @click="sendMessage"> Sent </v-btn>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore()
const { chatCompletion } = useChatgpt()
const drawer = ref(false)
const links = ref(['Dashboard', 'Messages', 'Profile', 'Updates'])

const data = ref('')
const message = ref('')

async function sendMessage() {
  loadingStore.setLoading(true)
  const response = await chatCompletion(message.value)
  data.value = response
  loadingStore.setLoading(false)
}
</script>
