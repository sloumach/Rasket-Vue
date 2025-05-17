<template>
  <div :class="customClass ?? 'logo-box'">
    <router-link to="/" class="logo-dark">
      <img :src="logoSmall" :height="smLogoHeight" :class="smLogoClass ?? 'logo-sm'" alt="logo sm">
      <img :src="logoDark" :height="logoHeight" :class="[logoClass ?? 'logo-lg', isRTL ? 'rtl-logo' : '']" alt="logo dark">
    </router-link>

    <router-link to="/" class="logo-light">
      <img :src="logoSmall" :height="smLogoHeight" :class="smLogoClass ?? 'logo-sm'" alt="logo sm">
      <img :src="logoLight" :height="logoHeight" :class="[logoClass ?? 'logo-lg', isRTL ? 'rtl-logo' : '']" alt="logo light">
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import logoSmall from "@/assets/images/logo-sm.png";
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";
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
</style>
