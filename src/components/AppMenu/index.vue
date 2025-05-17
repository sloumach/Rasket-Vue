<template>
  <ul class="navbar-nav">
    <template v-for="(item, idx) in menuItems || []" :key="idx">
      <li v-if="item.isTitle" class="menu-title" :class="idx && 'mt-2'" >{{ item.label }}</li>
      <template v-else>
        <MenuItemWithChildren v-if="item.children" :item="item" className="nav-item" linkClassName="nav-link" subMenuClassName="nav sub-navbar-nav" />
        <MenuItem v-else :item="item" linkClassName="nav-link" className="nav-item" />
      </template>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import type { MenuItemType } from '@/types/menu';
import MenuItemWithChildren from '@/components/AppMenu/MenuItemWithChildren.vue';
import MenuItem from '@/components/AppMenu/MenuItem.vue';

type AppMenuProps = {
  menuItems: Array<MenuItemType>;
};

defineProps<AppMenuProps>();

// Create a reactive reference to track the active menu
const activeMenu = ref('');

// Function to set the active menu
const setActiveMenu = (key: string) => {
  console.log('Setting active menu to:', key, 'Previous:', activeMenu.value);
  activeMenu.value = key;
};

// Provide these values to child components
provide('activeMenu', activeMenu);
provide('setActiveMenu', setActiveMenu);
</script>
