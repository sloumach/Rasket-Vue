<template>
  <li :class="className">
    <a class="menu-arrow" :class="`${isActive ? 'active' : ''} ${isOpen ? 'menu-open' : ''} ${linkClassName}`" role="button" @click="toggleMenu">
      <span v-if="item.icon" class="nav-icon">
        <Icon :icon="item.icon" />
      </span>
      <span class="nav-text"> {{ item.label }} </span>
      <span v-if="item.badge" :class="`badge badge-pill text-end bg-${item.badge.variant}`">{{ item.badge.text }}</span>
    </a>
    <transition name="slide-fade">
      <div v-show="isOpen" class="submenu-wrapper">
        <ul :class="subMenuClassName">
          <template v-for="(link, idx) in item.children || []" :key="idx">
            <MenuItemWithChildren v-if="link.children" :item="link" className="sub-nav-item"
              subMenuClassName="nav sub-navbar-nav" linkClassName="sub-nav-link" />
            <MenuItem v-else :item="link" className="sub-nav-item" linkClassName="sub-nav-link" />
          </template>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from 'vue';
import MenuItem from '@/components/AppMenu/MenuItem.vue';
import { menuItemActive } from '@/helpers/menu';
import type { SubMenus } from '@/types/menu';
import { Icon } from '@iconify/vue';
import router from '@/router';

const props = defineProps<SubMenus>();

// Get current route name and watch for changes
const currentRouteName = computed(() => router.currentRoute.value.name);

// Check if this menu item should be active based on current route
const isActive = computed(() => {
  // Check if any child route matches the current route
  if (props.item.children) {
    return props.item.children.some(child => {
      if (child.route && child.route.name === currentRouteName) {
        return true;
      }
      return false;
    });
  }
  return false;
});

// Control the open/closed state
const isOpen = ref(false);

// Get the active menu from parent (provided by AppMenu)
const activeMenu = inject('activeMenu', ref(''));
const setActiveMenu = inject('setActiveMenu', (key: string) => {});

// Toggle this menu
const toggleMenu = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();

  console.log('Toggle menu clicked:', props.item.key, 'Current state:', isOpen.value);

  if (isOpen.value) {
    // If already open, close it
    isOpen.value = false;
    setActiveMenu('');
    console.log('Closing menu:', props.item.key);
  } else {
    // If closed, open it and set as active menu
    setActiveMenu(props.item.key);
    isOpen.value = true;
    console.log('Opening menu:', props.item.key);
  }
};

// Watch for changes to the active menu
watch(activeMenu, (newActiveMenu) => {
  console.log('Active menu changed to:', newActiveMenu, 'This menu:', props.item.key);

  // Close this menu if another menu was opened
  if (newActiveMenu !== props.item.key) {
    console.log('Closing menu due to another menu being opened:', props.item.key);
    isOpen.value = false;
  } else if (newActiveMenu === props.item.key) {
    // Make sure this menu is open if it's the active menu
    console.log('This menu is now active:', props.item.key);
    isOpen.value = true;
  }
});

// Watch for route changes to automatically open the menu when navigating to a submenu
watch(currentRouteName, (newRoute) => {
  if (isActive.value) {
    console.log('Route changed to a submenu of this menu:', props.item.key);
    isOpen.value = true;
    setActiveMenu(props.item.key);
  }
});

// Initialize menu state
onMounted(() => {
  // Open the menu if it's active (one of its children is the current route)
  if (isActive.value) {
    isOpen.value = true;
    setActiveMenu(props.item.key);
    console.log('Opening menu on mount because it contains the active route:', props.item.key);
  } else {
    isOpen.value = false;
  }
});
</script>

<style scoped>
.submenu-wrapper {
  overflow: hidden;
}

/* Transition styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 500px; /* Adjust based on your maximum expected height */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
