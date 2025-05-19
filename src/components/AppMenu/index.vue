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
import { onMounted } from 'vue';
import type { MenuItemType } from '@/types/menu';
import MenuItemWithChildren from '@/components/AppMenu/MenuItemWithChildren.vue';
import MenuItem from '@/components/AppMenu/MenuItem.vue';
import { useMenuStore } from '@/stores/menu';

type AppMenuProps = {
  menuItems: Array<MenuItemType>;
};

const props = defineProps<AppMenuProps>();

// Use the menu store
const menuStore = useMenuStore();

// Initialize the menu store
onMounted(() => {
  // Initialize from localStorage
  menuStore.initFromStorage();

  // Update active menu based on current route
  menuStore.updateActiveMenuFromRoute(props.menuItems);
});
</script>
