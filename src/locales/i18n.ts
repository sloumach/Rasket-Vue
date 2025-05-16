import { translations } from './translations';
import { useLanguageStore } from '@/stores/language';

export function useTranslation() {
  const languageStore = useLanguageStore();
  
  function t(key: string): string {
    const keys = key.split('.');
    const lang = languageStore.getCurrentLanguage;
    //@ts-ignore
    let translation = translations[lang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }
    
    return translation as string;
  }
  
  return {
    t
  };
}
