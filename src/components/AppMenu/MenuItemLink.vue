<template>
  <!-- Use a regular anchor tag for items with url property -->
  <a v-if="item.url" :href="item.url" :class="`${className}`">
    <span v-if="item.icon" class="nav-icon">
      <Icon :icon="item.icon" />
    </span>
    <span class="nav-text"> {{ item.label }} </span>
    <b-badge :variant="null" v-if="item.badge" class="text-end" :class="`bg-${item.badge.variant}`">
      {{ item.badge.text }}
    </b-badge>
  </a>

  <!-- Use router-link for items with route property -->
  <router-link v-else :class="`${currentRouteName === item.route?.name && 'active'} ${className}`" :to="{ name: item.route?.name, params: item.route?.params }">
    <span v-if="item.icon" class="nav-icon">
      <Icon :icon="item.icon" />
    </span>
    <span class="nav-text"> {{ item.label }} </span>
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
