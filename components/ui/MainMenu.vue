<template>
  <v-list class="menu-list" nav dense color="primary">
    <template v-for="menuArea in props.menu" :key="menuArea.key">
      <div
        v-if="!state.miniSidebar && (menuArea.key || menuArea.text)"
        class="pa-1 mt-2 text-overline"
      >
        {{ menuArea.key ? $t(menuArea.key) : menuArea.text }}
      </div>
      <template v-if="menuArea.items">
        <template v-for="menuItem in menuArea.items" :key="menuItem.key">
          <!-- menu level 1 -->
          <v-list-item
            v-if="!menuItem.items"
            :to="menuItem.link"
            :prepend-icon="menuItem.icon || 'mdi-circle-medium'"
            :active-class="`active-nav-${state.primaryColor.colorName}`"
            density="compact"
          >
            <v-list-item-title>
              {{ menuItem.key ? $t(menuItem.key) : menuItem.text }}
            </v-list-item-title>
          </v-list-item>
          <v-list-group v-else :value="menuItem.items">
            <!-- subMenu activator -->
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="menuItem.icon || 'mdi-circle-medium'"
                :title="menuItem.key ? $t(menuItem.key) : menuItem.text"
              >
              </v-list-item>
            </template>
            <!-- menu level 2 -->
            <v-list-item
              v-for="subMenuItem in menuItem.items"
              :key="subMenuItem.key"
              :prepend-icon="subMenuItem.icon || 'mdi-circle-medium'"
              :title="subMenuItem.key ? $t(subMenuItem.key) : subMenuItem.text"
              :to="subMenuItem.link"
              density="compact"
            ></v-list-item>
          </v-list-group>
        </template>
      </template>
    </template>
  </v-list>
</template>
<script setup lang="ts">
const customizeTheme = useCustomizeThemeStore()
const { state } = customizeTheme

const props = defineProps({
  // Data
  menu: {
    type: Array<any>,
    default: () => []
  }
})
</script>

<style scoped>
.v-list-group .v-list-item {
  padding-left: 8px !important;
}

.active-nav-grey {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #3a456c, #a4abbb);
}

.active-nav-purple {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #e82893, #954bcb);
}

.active-nav-info {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #487afa, #3fc7f3);
}

.active-nav-success {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #45b95b, #96dd4c);
}

.active-nav-warning {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #f0635d, #edc252);
}

.active-nav-error {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #ea373a, #f07285);
}
</style>
