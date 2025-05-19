<template>
  <li :class="className">
    <a class="menu-arrow" :class="`${isActive ? 'active' : ''} ${isOpen ? 'menu-open' : ''} ${linkClassName}`" role="button" @click="toggleMenu">
      <span v-if="item.icon" class="nav-icon">
        <Icon :icon="item.icon" />
      </span>
      <span class="nav-text"> {{ item.label }} </span>
      <span v-if="item.badge" :class="`badge badge-pill text-end bg-${item.badge.variant}`">{{ item.badge.text }}</span>
    </a>
    <div class="submenu-wrapper" :style="submenuStyle">
      <ul :class="subMenuClassName">
        <template v-for="(link, idx) in item.children || []" :key="idx">
          <MenuItemWithChildren v-if="link.children" :item="link" className="sub-nav-item"
            subMenuClassName="nav sub-navbar-nav" linkClassName="sub-nav-link" />
          <MenuItem v-else :item="link" className="sub-nav-item" linkClassName="sub-nav-link" />
        </template>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import MenuItem from '@/components/AppMenu/MenuItem.vue';
import { menuItemActive } from '@/helpers/menu';
import type { SubMenus } from '@/types/menu';
import { Icon } from '@iconify/vue';
import router from '@/router';
import { useMenuStore } from '@/stores/menu';

const props = defineProps<SubMenus>();

// Use the menu store
const menuStore = useMenuStore();

// Get current route name
const currentRouteName = computed(() => router.currentRoute.value.name);

// Check if this menu item should be active based on current route
const isActive = computed(() => {
  // Check if any child route matches the current route
  if (props.item.children) {
    return props.item.children.some(child => {
    //@ts-ignore
      if (child.route && child.route.name === currentRouteName.value) {
        return true;
      }
      return false;
    });
  }
  return false;
});

// Check if this menu item is open
const isOpen = computed(() => {
  return menuStore.isMenuItemOpen(props.item.key);
});

// Toggle this menu
const toggleMenu = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();

  // Toggle the menu in the store
  menuStore.toggleMenuItem(props.item.key);
};

// Calculate submenu style based on open state
const submenuStyle = computed(() => {
  const maxHeight = isOpen.value ? '1000px' : '0';
  const opacity = isOpen.value ? 1 : 0;
  const overflow = isOpen.value ? 'visible' : 'hidden';

  return {
    maxHeight,
    opacity,
    overflow,
    transition: menuStore.isNavigating ? 'none' : 'all 0.3s ease-in-out'
  };
});

// Initialize menu state
onMounted(() => {
  // If this menu contains the active route, set it as active
  if (isActive.value) {
    menuStore.setActiveMenuItem(props.item.key);
  }
});
</script>

<style scoped>
.submenu-wrapper {
  transition: all 0.3s ease-in-out;
}
</style>
