<template>
  <v-menu scroll-y>
    <template #activator="{ props }">
      <v-btn width="100" v-bind="props">
        <Icon :name="`twemoji:flag-${currentLocale.name}`" class="mr-2" />
        <span class="text-body-2">{{ currentLocale.label }}</span>
      </v-btn>
    </template>
    <v-list elevation="1" nav>
      <v-list-item
        v-for="itemS in availableLocaleList"
        :key="itemS.code"
        density="compact"
        @click="setLocale(itemS.code)"
      >
        <template #prepend>
          <Icon :name="`twemoji:flag-${itemS.name}`" class="mr-2" />
        </template>

        <v-list-item-title> {{ itemS.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import config from '@/configs'
const { locale } = useI18n()
const { availableLocales } = config.locales

const availableLocaleList = computed(() => {
  return availableLocales.filter((item) => item.code !== locale.value)
})

const currentLocale = computed(() => {
  return availableLocales.filter((item) => item.code === locale.value)[0]
})

const setLocale = (setLocale: string) => {
  locale.value = setLocale
}
</script>
