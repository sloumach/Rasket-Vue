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
        key: 'preparing',
        icon: 'bx-circle',
        statistic: 35,
        title: 'Preparing',
        variant: 'warning',
        growth: -3.5
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
        key: 'canceled',
        icon: 'bx-x-circle',
        statistic: 12,
        title: 'Canceled',
        variant: 'danger',
        growth: -2.8
    }
];
