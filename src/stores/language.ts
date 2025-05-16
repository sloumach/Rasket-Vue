import { defineStore } from 'pinia';
import type { App } from 'vue';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLang: localStorage.getItem('language') || 'en',
    languages: [
      { code: 'en', name: 'English', dir: 'ltr' },
      { code: 'ar', name: 'العربية', dir: 'rtl' }
    ]
  }),
  getters: {
    getCurrentLanguage: (state) => state.currentLang,
    isRTL: (state) => state.currentLang === 'ar',
    getDirection: (state) => state.currentLang === 'ar' ? 'rtl' : 'ltr',
    getLanguages: (state) => state.languages
  },
  actions: {
    setLanguage(lang: string) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);

      document.documentElement.setAttribute('dir', this.getDirection);
      document.documentElement.setAttribute('lang', lang);
      if (lang === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }

      if (window.app) {
        window.app.config.globalProperties.$i18n = this.getDirection;
      }

      window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
    },

    initLanguage(app: App) {
      app.config.globalProperties.$i18n = this.getDirection;
      document.documentElement.setAttribute('dir', this.getDirection);
      document.documentElement.setAttribute('lang', this.currentLang);

      if (this.currentLang === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }
});
