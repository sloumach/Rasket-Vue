import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '@/router';
import type { MenuItemType } from '@/types/menu';

export const useMenuStore = defineStore('menu', () => {
  // Store open menu items
  const openMenuItems = ref<string[]>([]);

  // Store active menu item
  const activeMenuItem = ref<string | null>(null);

  // Flag to prevent flickering during navigation
  const isNavigating = ref(false);

  // Initialize from localStorage
  const initFromStorage = () => {
    const storedActiveMenu = localStorage.getItem('activeMenu');
    if (storedActiveMenu) {
      activeMenuItem.value = storedActiveMenu;
      if (!openMenuItems.value.includes(storedActiveMenu)) {
        openMenuItems.value.push(storedActiveMenu);
      }
    }
  };

  // Set active menu item
  const setActiveMenuItem = (key: string) => {
    activeMenuItem.value = key;
    localStorage.setItem('activeMenu', key);

    // Close all other menus first (only one open at a time)
    openMenuItems.value = [];

    // Ensure the menu is open
    openMenuItems.value.push(key);
  };

  // Toggle menu item
  const toggleMenuItem = (key: string) => {
    // If navigating, don't toggle
    if (isNavigating.value) return;

    const index = openMenuItems.value.indexOf(key);
    if (index === -1) {
      // Close all other menus first (only one open at a time)
      openMenuItems.value = [];

      // Open this menu
      openMenuItems.value.push(key);
      activeMenuItem.value = key;
      localStorage.setItem('activeMenu', key);
    } else {
      // Close this menu
      openMenuItems.value.splice(index, 1);

      // If this was the active menu, clear it
      if (activeMenuItem.value === key) {
        activeMenuItem.value = null;
        localStorage.removeItem('activeMenu');
      }
    }
  };

  // Check if menu item is open
  const isMenuItemOpen = (key: string) => {
    return openMenuItems.value.includes(key);
  };

  // Find parent menu for a route
  const findParentMenuForRoute = (items: MenuItemType[], routeName: string): string | null => {
    for (const item of items) {
      if (item.children) {
        // Check if any child has this route
        const hasRoute = item.children.some(child => child.route?.name === routeName);
        if (hasRoute) {
          return item.key;
        }

        // Recursively check nested children
        const nestedResult = findParentMenuForRoute(item.children, routeName);
        if (nestedResult) {
          return nestedResult;
        }
      }
    }
    return null;
  };

  // Update active menu based on current route
  const updateActiveMenuFromRoute = (menuItems: MenuItemType[]) => {
    const currentRoute = router.currentRoute.value.name;
    if (currentRoute) {
      isNavigating.value = true;

      const parentKey = findParentMenuForRoute(menuItems, currentRoute as string);
      if (parentKey) {
        // Only set active menu if we're on a submenu page
        const storedActiveMenu = localStorage.getItem('activeMenu');

        // If there's no stored active menu or it's different from the parent key,
        // set the parent key as active
        if (!storedActiveMenu || storedActiveMenu !== parentKey) {
          setActiveMenuItem(parentKey);
        }
      }

      // Reset navigating flag after a delay
      setTimeout(() => {
        isNavigating.value = false;
      }, 500);
    }
  };

  return {
    openMenuItems,
    activeMenuItem,
    isNavigating,
    initFromStorage,
    setActiveMenuItem,
    toggleMenuItem,
    isMenuItemOpen,
    updateActiveMenuFromRoute
  };
});
