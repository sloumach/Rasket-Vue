import type { MenuItemType } from '@/types/menu';
import { useTranslation } from '@/locales/i18n';

export function getMenuItems(): MenuItemType[] {
  const { t } = useTranslation();
  
  return [
    {
      key: 'dashboard',
      label: t('common.dashboard'),
      icon: 'solar:home-2-broken',
      route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
          parentKey: 'catalog',
        },
        {
          key: 'catalog-categories',
          label: t('common.categories'),
          route: { name: 'dashboards.index' },
          parentKey: 'catalog',
        },
        {
          key: 'catalog-inventory',
          label: t('common.inventory'),
          route: { name: 'dashboards.index' },
          parentKey: 'catalog',
        },
        {
          key: 'catalog-options',
          label: t('common.options'),
          route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
          parentKey: 'finances',
        },
        {
          key: 'finances-payment-link',
          label: t('common.paymentLink'),
          route: { name: 'dashboards.index' },
          parentKey: 'finances',
        },
        {
          key: 'finances-invoice',
          label: t('common.invoice'),
          route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
          parentKey: 'contact',
        },
        {
          key: 'contact-reviews',
          label: t('common.reviews'),
          route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
          parentKey: 'marketing',
        },
        {
          key: 'marketing-coupon',
          label: t('common.coupon'),
          route: { name: 'dashboards.index' },
          parentKey: 'marketing',
        },
        {
          key: 'marketing-promotion',
          label: t('common.promotion'),
          route: { name: 'dashboards.index' },
          parentKey: 'marketing',
        },
        {
          key: 'marketing-popup',
          label: t('common.popup'),
          route: { name: 'dashboards.index' },
          parentKey: 'marketing',
        },
        {
          key: 'marketing-whatsapp',
          label: t('common.whatsapp'),
          route: { name: 'dashboards.index' },
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
          route: { name: 'dashboards.index' },
          parentKey: 'reports',
        },
        {
          key: 'reports-sales',
          label: t('common.sales'),
          route: { name: 'dashboards.index' },
          parentKey: 'reports',
        },
        {
          key: 'reports-top-selling',
          label: t('common.topSelling'),
          route: { name: 'dashboards.index' },
          parentKey: 'reports',
        },
        {
          key: 'reports-customers',
          label: t('common.customers'),
          route: { name: 'dashboards.index' },
          parentKey: 'reports',
        },
        {
          key: 'reports-marketing',
          label: t('common.marketing'),
          route: { name: 'dashboards.index' },
          parentKey: 'reports',
        },
      ],
    },
    {
      key: 'settings',
      label: t('common.settings'),
      icon: 'solar:settings-broken',
      route: { name: 'dashboards.index' },
    },
    {
      key: 'preview-store',
      label: t('common.previewStore'),
      icon: 'solar:shop-broken',
      route: { name: 'dashboards.index' },
    },
  ];
}
