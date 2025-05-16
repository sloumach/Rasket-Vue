<template>
  <b-card no-body>
    <b-card-body class="p-3">
      <b-row class="g-0">
        <b-col cols="6" :class="{ 'order-0': !isRTL, 'order-1': isRTL }">
          <div class="avatar-md bg-light bg-opacity-50 rounded">
            <div class="avatar-title">
              <i class="bx fs-28" :class="[item.icon, `text-${item.variant}`]"></i>
            </div>
          </div>
        </b-col>

        <b-col cols="6" :class="[!isRTL ? 'text-end' : 'text-start', { 'order-1': !isRTL, 'order-0': isRTL }]">
          <p class="text-muted mb-0 text-truncate fs-13">
            {{ t(`common.${item.key}`) }}
          </p>
          <h3 class="text-dark mt-1 mb-0 fs-18">
            <span v-if="item.prefix">{{ item.prefix }}</span>{{ item.statistic }}<span v-if="item.suffix">{{ item.suffix }}</span>
          </h3>
        </b-col>
      </b-row>
    </b-card-body>

    <b-card-footer class="py-2 px-3 bg-light bg-opacity-50">
      <div class="d-flex align-items-center justify-content-between">
        <div v-if="item.growth" :class="{ 'order-0': !isRTL, 'order-1': isRTL }">
          <span :class="item.growth > 0 ? 'text-success' : 'text-danger'" class="fw-medium">
            <i v-if="item.growth > 0" class="bx bxs-up-arrow fs-10" :class="!isRTL ? 'me-1' : 'ms-1'"></i>
            <i v-else class="bx bxs-down-arrow fs-10" :class="!isRTL ? 'me-1' : 'ms-1'"></i>
            {{ Math.abs(item.growth) }}%
          </span>
          <span class="text-muted fs-11" :class="!isRTL ? 'ms-1' : 'me-1'">{{ t('common.lastMonth') }}</span>
        </div>
        <a href="#!" class="text-reset fw-medium fs-11" :class="{ 'order-1': !isRTL, 'order-0': isRTL }">{{ t('common.viewMore') }}</a>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue'
import type { StatisticCardType } from '@/types'
import { useTranslation } from '@/locales/i18n'
import { useLanguageStore } from '@/stores/language'

const { t } = useTranslation()
const languageStore = useLanguageStore()

// Use ref instead of computed to allow reactive updates
const isRTL = ref(languageStore.isRTL)

// Update RTL state when language changes
const updateRTL = () => {
  isRTL.value = languageStore.isRTL
}

// Listen for language changes
onMounted(() => {
  window.addEventListener('language-changed', updateRTL)
})

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('language-changed', updateRTL)
})

defineProps({
  item: {
    type: Object as PropType<StatisticCardType>,
    required: true
  }
})
</script>

<style scoped>
.avatar-md {
  height: 3rem;
  width: 3rem;
}

.avatar-title {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.fs-28 {
  font-size: 1.75rem !important;
}

.fs-18 {
  font-size: 1.125rem !important;
}

.fs-13 {
  font-size: 0.8125rem !important;
}

.fs-11 {
  font-size: 0.6875rem !important;
}

.fs-10 {
  font-size: 0.625rem !important;
}

h3 {
  font-weight: 600;
}

.fw-medium {
  font-weight: 500 !important;
}

.card {
  margin-bottom: 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
