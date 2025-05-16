<template>
  <router-link :class="`${currentRouteName === item.route?.name && 'active'} ${className}`" :to="{ name: item.route?.name, params: item.route?.params }">
    <!-- For main menu items, show icon if present -->
    <span v-if="item.icon && !(className && className.includes('sub-nav-link'))" class="nav-icon">
      <Icon :icon="item.icon" />
    </span>
    <span class="nav-text" :class="{'submenu-text': className && className.includes('sub-nav-link')}">{{ item.label }}</span>
    <b-badge :variant="null" v-if="item.badge" class="text-end" :class="`bg-${item.badge.variant}`">
      {{ item.badge.text }}
    </b-badge>
  </router-link>
</template>

<script setup lang="ts">
import type { SubMenus } from '@/types/menu'
import { Icon } from '@iconify/vue'
import router from '@/router'

defineProps<SubMenus>()

const currentRouteName = router.currentRoute.value.name
</script>
