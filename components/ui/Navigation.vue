<template>
  <v-navigation-drawer
    id="mainMenu"
    v-model="state.mainSidebar"
    border="none"
    elevation="1"
  >
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->
    <template v-if="!state.miniSidebar" #prepend>
      <v-card
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 25px 15px -20px"
        height="100"
        class="d-flex align-center justify-center"
      >
        <img
          v-if="state.darkTheme"
          width="200"
          src="@/assets/logo_dark.svg"
          alt=""
        />
        <img v-else width="200" src="@/assets/logo_light.svg" alt="" />
      </v-card>
    </template>

    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <ui-main-menu :menu="navigation.menu"></ui-main-menu>
    <!-- ---------------------------------------------- -->
    <!---Bottom Area -->
    <!-- ---------------------------------------------- -->
    <!-- <template v-if="!state.miniSidebar" #append>
      <v-card theme="dark" height="225" class="pa-3" variant="text">
        <v-card
          class="d-flex flex-column gradient pa-2"
          :class="state.primaryColor.colorName"
          height="200"
        >
          <v-card-title>
            <v-btn
              class="mr-2"
              size="40"
              color="white"
              :class="`text-${state.primaryColor.colorName}`"
              icon
            >
              <Icon size="30" name="line-md:github-loop" />
            </v-btn>
            xxxxxxxxx
          </v-card-title>
          <v-card-subtitle> </v-card-subtitle>
          <v-card-text>
            <div><b>Github:</b></div>
            <div>github.com/xxxxxxx</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="white"
              block
              prepend-icon="mdi-thumb-up-outline"
              variant="elevated"
              @click="openGithubSite"
            >
              xxxxxx
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </template> -->
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import configs from '@/configs'
const navigation = ref(configs.navigation)
const customizeTheme = useCustomizeThemeStore()
const { state } = customizeTheme

// const openGithubSite = () => {
//   window.open('', '_blank')
// }

onMounted(() => {
  scrollToBottom()
})

const scrollToBottom = () => {
  const contentArea = document.querySelector('.v-navigation-drawer__content')
  const activeItem = document.querySelector(
    '.v-list-item--active'
  ) as HTMLElement

  setTimeout(() => {
    contentArea?.scrollTo({
      top: activeItem?.offsetTop
    })
  }, 100)
}
</script>
<style scoped></style>
