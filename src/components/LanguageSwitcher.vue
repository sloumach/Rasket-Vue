<template>
  <div class="language-switcher">
    <b-dropdown variant="link" right toggle-class="text-decoration-none" no-caret>
      <template #button-content>
        <i class="bx bx-globe fs-22"></i>
      </template>
      <b-dropdown-item
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :active="currentLang === lang.code"
      >
        {{ lang.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { useTranslation } from '@/locales/i18n';

const languageStore = useLanguageStore();
const { t } = useTranslation();

const currentLang = computed(() => languageStore.getCurrentLanguage);
const languages = computed(() => languageStore.getLanguages);

const changeLanguage = (lang: string) => {
  // Only change if the language is actually changing
  if (lang !== languageStore.getCurrentLanguage) {
    languageStore.setLanguage(lang);
    // No page refresh needed
  }
};
</script>

<style scoped>
.language-switcher {
  margin-left: 10px;
}
</style>
