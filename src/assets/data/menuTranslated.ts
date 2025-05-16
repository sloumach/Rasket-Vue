import type { MenuItemType } from '@/types/menu';
import { useTranslation } from '@/locales/i18n';

export function getMenuItems(): MenuItemType[] {
  const { t } = useTranslation();

  return [
    {
      key: 'dashboard',
      label: t('common.dashboard'),
      icon: 'solar:home-2-broken',
      url: '#',
    },
    {
      key: 'sales',
      label: t('common.sales'),
      icon: 'bx:dollar-circle',
      children: [
        {
          key: 'sales-orders',
          label: t('common.orders'),
          route: { name: 'apps.orders.list' },
          parentKey: 'sales',
        },
        {
          key: 'sales-reservations',
          label: t('common.reservations'),
          url: '#',
          parentKey: 'sales',
        },
      ],
    },
    {
      key: 'catalog',
      label: t('common.catalog'),
      icon: 'solar:bag-4-broken',
      children: [
        {
          key: 'catalog-products',
          label: t('common.products'),
          url: '#',
          parentKey: 'catalog',
        },
        {
          key: 'catalog-categories',
          label: t('common.categories'),
          url: '#',
          parentKey: 'catalog',
        },
        {
          key: 'catalog-inventory',
          label: t('common.inventory'),
          url: '#',
          parentKey: 'catalog',
        },
        {
          key: 'catalog-options',
          label: t('common.options'),
          url: '#',
          parentKey: 'catalog',
        },
      ],
    },
    {
      key: 'finances',
      label: t('common.finances'),
      icon: 'solar:wallet-money-broken',
      children: [
        {
          key: 'finances-payments',
          label: t('common.payments'),
          url: '#',
          parentKey: 'finances',
        },
        {
          key: 'finances-payment-link',
          label: t('common.paymentLink'),
          url: '#',
          parentKey: 'finances',
        },
        {
          key: 'finances-invoice',
          label: t('common.invoice'),
          url: '#',
          parentKey: 'finances',
        },
      ],
    },
    {
      key: 'contact',
      label: t('common.contact'),
      icon: 'solar:users-group-rounded-broken',
      children: [
        {
          key: 'contact-customers',
          label: t('common.customers'),
          url: '#',
          parentKey: 'contact',
        },
        {
          key: 'contact-reviews',
          label: t('common.reviews'),
          url: '#',
          parentKey: 'contact',
        },
      ],
    },
    {
      key: 'marketing',
      label: t('common.marketing'),
      icon: 'bx:paper-plane',
      children: [
        {
          key: 'marketing-overview',
          label: t('common.overview'),
          url: '#',
          parentKey: 'marketing',
        },
        {
          key: 'marketing-coupon',
          label: t('common.coupon'),
          url: '#',
          parentKey: 'marketing',
        },
        {
          key: 'marketing-promotion',
          label: t('common.promotion'),
          url: '#',
          parentKey: 'marketing',
        },
        {
          key: 'marketing-popup',
          label: t('common.popup'),
          url: '#',
          parentKey: 'marketing',
        },
        {
          key: 'marketing-whatsapp',
          label: t('common.whatsapp'),
          url: '#',
          parentKey: 'marketing',
        },
      ],
    },
    {
      key: 'reports',
      label: t('common.reports'),
      icon: 'solar:chart-broken',
      children: [
        {
          key: 'reports-overview',
          label: t('common.overview'),
          url: '#',
          parentKey: 'reports',
        },
        {
          key: 'reports-sales',
          label: t('common.sales'),
          url: '#',
          parentKey: 'reports',
        },
        {
          key: 'reports-top-selling',
          label: t('common.topSelling'),
          url: '#',
          parentKey: 'reports',
        },
        {
          key: 'reports-customers',
          label: t('common.customers'),
          url: '#',
          parentKey: 'reports',
        },
        {
          key: 'reports-marketing',
          label: t('common.marketing'),
          url: '#',
          parentKey: 'reports',
        },
      ],
    },
    {
      key: 'settings',
      label: t('common.settings'),
      icon: 'solar:settings-broken',
      url: '#',
    },
    {
      key: 'preview-store',
      label: t('common.previewStore'),
      icon: 'solar:shop-broken',
      url: '#',
    },
  ];
}
