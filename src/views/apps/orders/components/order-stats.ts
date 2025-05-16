//@ts-nocheck
import type { StatisticCardType } from '@/types';

export const orderStats: StatisticCardType[] = [
    {
        key: 'new',
        icon: 'bx-bell',
        statistic: 42,
        title: 'New',
        variant: 'primary',
        growth: 5.2
    },
    {
        key: 'accepted',
        icon: 'bx-check',
        statistic: 78,
        title: 'Accepted',
        variant: 'info',
        growth: 12.1
    },
    {
        key: 'preparing',
        icon: 'bx-circle',
        statistic: 35,
        title: 'Preparing',
        variant: 'warning',
        growth: -3.5
    },
    {
        key: 'ready',
        icon: 'bx-shopping-bag',
        statistic: 29,
        title: 'Ready',
        variant: 'success',
        growth: 8.4
    },
    {
        key: 'delivering',
        icon: 'bxs-truck',
        statistic: 18,
        title: 'Delivering',
        variant: 'info',
        growth: 2.3
    },
    {
        key: 'complete',
        icon: 'bx-donate-heart',
        statistic: 156,
        title: 'Complete',
        variant: 'success',
        growth: 15.7
    },
    {
        key: 'canceled',
        icon: 'bx-x-circle',
        statistic: 12,
        title: 'Canceled',
        variant: 'danger',
        growth: -2.8
    },
    {
        key: 'all',
        icon: 'bx-refresh',
        statistic: 370,
        title: 'All Orders',
        variant: 'secondary',
        growth: 4.6
    }
];
