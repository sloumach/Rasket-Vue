<template>
  <div class="main-nav">
    <LogoBox />

    <!-- Menu Toggle Button (sm-hover) -->
    <button type="button" class="button-sm-hover" :class="{'rtl-button': languageStore.isRTL}" aria-label="Show Full Sidebar" @click="toggleMenuSize">
      <Icon icon="solar:hamburger-menu-broken" class="button-sm-hover-icon mt-1"
        :class="languageStore.isRTL ? 'ms-1' : 'me-1'"
        style="height: 25px; width: 25px" />
    </button>

    <simplebar class="scrollbar">
      <AppMenu :menu-items="getMenuItems()" />
    </simplebar>

    <div class="status-bar">
      <!-- Full sidebar view -->
      <div class="status-bar-expanded">
        <div class="d-flex align-items-center justify-content-between px-3 py-2">
          <div class="d-flex align-items-center">
            <span class="status-indicator me-2"></span>
            <div class="time-container">
              <span class="current-time">{{ timeOnly }}<span class="ampm-indicator">{{ ampmIndicator }}</span></span>
            </div>
          </div>
          <div class="sound-container">
            <i class="bx bx-volume-full sound-icon"></i>
          </div>
        </div>
      </div>

      <!-- Collapsed sidebar view - only time -->
      <div class="status-bar-collapsed">
        <div class="d-flex align-items-center justify-content-center py-2">
          <span class="status-indicator me-1"></span>
          <span class="current-time collapsed-time">{{ collapsedTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import simplebar from 'simplebar-vue';
import AppMenu from '@/components/AppMenu/index.vue';
import { getMenuItems } from '@/assets/data/menuTranslated';
import { useLayoutStore } from '@/stores/layout';
import { useLanguageStore } from '@/stores/language';
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';

const useLayout = useLayoutStore();
const languageStore = useLanguageStore();

const { layout, setLeftSideBarSize } = useLayout;

const currentTime = ref('');
const expandedTime = ref('');
const timeOnly = ref('');
const ampmIndicator = ref('');

const isSidebarCollapsed = computed(() => {
  return ['sm-hover', 'condensed'].includes(layout.leftSideBarSize) ||
         (layout.leftSideBarSize === 'sm-hover-active' && window.innerWidth < 1140);
});

const collapsedTime = computed(() => {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
});

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours12 = hours % 12 || 12;
  expandedTime.value = `${formattedHours12}:${minutes < 10 ? '0' + minutes : minutes}    ${ampm}`;

  timeOnly.value = `${formattedHours12}:${minutes < 10 ? '0' + minutes : minutes}`;
  ampmIndicator.value = ampm;

  currentTime.value = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

let timeInterval: number;

const toggleMenuSize = () => {
  if (layout.leftSideBarSize === 'sm-hover-active') return setLeftSideBarSize('sm-hover');
  return setLeftSideBarSize('sm-hover-active');
};

const resize = () => {
  if (window.innerWidth < 1140) {
    setLeftSideBarSize('hidden');
  } else {
    setLeftSideBarSize(layout.leftSideBarSize === 'hidden' ? 'sm-hover-active' : layout.leftSideBarSize);
  }
};

watch(() => layout.leftSideBarSize, () => {
  updateTime();
});

onMounted(() => {
  resize();
  window.addEventListener('resize', () => {
    resize();
    updateTime(); // Update time on resize
  });

  updateTime();
  timeInterval = window.setInterval(updateTime, 60000); // Update every minute
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

import logoSm from '@/assets/images/logo-sm.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
</script>

<style scoped>
.status-bar {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: var(--bs-main-nav-bg);
  font-size: 0.9rem;
  color: #EBEBEB;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.status-bar-expanded {
  display: block;
}

.status-bar-collapsed {
  display: none;
  width: 100%;
  overflow: hidden;
  text-align: center;
  max-width: var(--bs-main-nav-width-sm);
}


:deep([data-menu-size="sm-hover"]) .main-nav:not(:hover) .status-bar-expanded,
:deep([data-menu-size="condensed"]) .status-bar-expanded,
:deep([data-menu-size="sm-hover-active"]) .main-nav .status-bar-expanded {
  display: none !important;
}

:deep([data-menu-size="sm-hover"]) .main-nav:not(:hover) .status-bar-collapsed,
:deep([data-menu-size="condensed"]) .status-bar-collapsed,
:deep([data-menu-size="sm-hover-active"]) .main-nav .status-bar-collapsed {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  max-width: 100% !important;
  padding: 8px 0;
  box-sizing: border-box;
  width: 75px !important;
}


:deep([data-menu-size="sm-hover"]) .main-nav:not(:hover),
:deep([data-menu-size="condensed"]) .main-nav,
:deep([data-menu-size="sm-hover-active"]) .main-nav {
  overflow: hidden !important;
  width: var(--bs-main-nav-width-sm) !important;
  min-width: var(--bs-main-nav-width-sm) !important;
}


.status-bar-collapsed .d-flex {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  justify-content: center;
  padding: 0 3px;
}

.scrollbar {
  height: calc(100vh - 170px) !important;
  overflow-y: auto;
}






.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
}

.status-bar-collapsed .status-indicator {
  width: 6px;
  height: 6px;
  min-width: 6px;
  margin-right: 4px;
}

:deep([dir="rtl"]) .status-bar-collapsed .status-indicator {
  margin-right: 0;
  margin-left: 4px;
}

.time-container {
  display: flex;
  align-items: center;
}


.rtl .current-time{
  display:flex;
  gap:10px;
  flex-direction:row-reverse !important;
}

.rtl .nav-text {
  

}
.current-time {
  font-weight: 400;
  font-size: 15px;
  line-height: 1;
  color: #EBEBEB;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left:-8px;
  font-family: var(--bs-font-sans-serif);
}

:deep([dir="rtl"]) .current-time {
  margin-left: 0;
  margin-right: -8px;
}

.ampm-indicator {
  margin-left: 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 1;
  opacity: 0.9;
  font-family: var(--bs-font-sans-serif);
}

:deep([dir="rtl"]) .ampm-indicator {
  margin-left: 0;
  margin-right: 12px;
}

.rtl-button {
  right: auto !important;
  left: 10px !important;
  z-index: 2 !important;
}

.collapsed-time {
  font-weight: 400 !important;
  font-size: 15px !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 30px !important;
  text-align: center !important;
  margin: 0 auto !important;
  letter-spacing: -0.3px;
  display: inline-block !important;
  position: relative !important;
  z-index: 1 !important;
  font-family: var(--bs-font-sans-serif) !important;
}

.sound-container {
  display: flex;
  align-items: center;
}

.sound-icon {
  cursor: pointer;
  color: #EBEBEB;
  font-size: 18px;
  line-height: 1;
}


:deep(.dark-mode) .status-bar {
  background-color: var(--bs-main-nav-bg);
  border-color: rgba(255, 255, 255, 0.1);
}



</style>