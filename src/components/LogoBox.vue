<template>
  <div :class="customClass ?? 'logo-box'">
    <router-link to="/" class="logo-dark">
      <img :src="logoSvg" :height="smLogoHeight" :class="smLogoClass ?? 'logo-sm'" alt="Milagro logo">
      <span :class="[logoClass ?? 'logo-lg', isRTL ? 'rtl-logo' : '']" class="logo-text">Milagro</span>
    </router-link>

    <router-link to="/" class="logo-light">
      <img :src="logoSvg" :height="smLogoHeight" :class="smLogoClass ?? 'logo-sm'" alt="Milagro logo">
      <span :class="[logoClass ?? 'logo-lg', isRTL ? 'rtl-logo' : '']" class="logo-text">Milagro</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import logoSvg from "@/assets/images/logo.svg";
import { useLanguageStore } from '@/stores/language';

type PropsType = {
  customClass?: string;
  logoClass?: string;
  smLogoClass?: string;
  logoHeight?: number;
  smLogoHeight?: number;
};

defineProps<PropsType>();

const languageStore = useLanguageStore();
const isRTL = computed(() => languageStore.isRTL);
</script>

<style scoped>
.rtl-logo {
  margin-left: 0 !important;
  margin-right: 6px !important;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  margin-left: 6px;
  vertical-align: middle;
  font-family: 'Public Sans', sans-serif;
  color: var(--bs-headings-color);
}

.logo-light .logo-text {
  color: #fff;
}

[dir="rtl"] .logo-text {
  margin-left: 0;
  margin-right: 6px;
}
</style>
