import type { OrderType } from '@/views/apps/orders/components/types';

import avatar1 from '@/assets/images/users/avatar-1.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar5 from '@/assets/images/users/avatar-5.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import avatar9 from '@/assets/images/users/avatar-9.jpg';
import avatar10 from '@/assets/images/users/avatar-10.jpg';

export const ordersList: OrderType[] = [
  {
    id: 'ORD7845',
    customer: {
      img: avatar2,
      name: 'Sean Kemper'
    },
    orderDate: '23 April, 2024 05:09 PM',
    deliveryDate: '30 April, 2024',
    amount: 852.25,
    status: 'processing',
    paymentMethod: 'Credit Card',
    items: [
      {
        name: 'Premium Headphones',
        quantity: 2,
        price: 299.99
      },
      {
        name: 'Wireless Mouse',
        quantity: 1,
        price: 49.99
      },
      {
        name: 'USB-C Cable',
        quantity: 3,
        price: 12.99
      }
    ]
  },
  {
    id: 'ORD1234',
    customer: {
      img: avatar3,
      name: 'Victoria Sullivan'
    },
    orderDate: '14 May, 2024 10:51 AM',
    deliveryDate: '25 May, 2024',
    amount: 953.00,
    status: 'shipped',
    paymentMethod: 'PayPal',
    items: [
      {
        name: 'Smartphone Case',
        quantity: 1,
        price: 29.99
      },
      {
        name: 'Bluetooth Speaker',
        quantity: 1,
        price: 89.99
      },
      {
        name: 'Laptop Backpack',
        quantity: 1,
        price: 79.99
      }
    ]
  },
  {
    id: 'ORD5678',
    customer: {
      img: avatar4,
      name: 'Liam Martinez'
    },
    orderDate: '12 April, 2024 12:09 PM',
    deliveryDate: '28 April, 2024',
    amount: 99.00,
    status: 'delivered',
    paymentMethod: 'Bank Transfer',
    items: [
      {
        name: 'Wireless Earbuds',
        quantity: 1,
        price: 99.00
      }
    ]
  },
  {
    id: 'ORD9012',
    customer: {
      img: avatar5,
      name: 'Emma Johnson'
    },
    orderDate: '10 April, 2024 10:09 PM',
    deliveryDate: '15 April, 2024',
    amount: 1250.00,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    items: [
      {
        name: 'Smart Watch',
        quantity: 1,
        price: 249.99
      },
      {
        name: 'Fitness Tracker',
        quantity: 1,
        price: 99.99
      },
      {
        name: 'Wireless Charger',
        quantity: 2,
        price: 29.99
      }
    ]
  },
  {
    id: 'ORD3456',
    customer: {
      img: avatar1,
      name: 'Olivia Thompson'
    },
    orderDate: '22 May, 2024 03:41 PM',
    deliveryDate: '05 June, 2024',
    amount: 500.00,
    status: 'pending',
    paymentMethod: 'PayPal',
    items: [
      {
        name: 'External Hard Drive',
        quantity: 1,
        price: 129.99
      },
      {
        name: 'USB Flash Drive',
        quantity: 2,
        price: 19.99
      }
    ]
  },
  {
    id: 'ORD7890',
    customer: {
      img: avatar6,
      name: 'Noah Garcia'
    },
    orderDate: '18 May, 2024 09:09 AM',
    deliveryDate: '30 May, 2024',
    amount: 250.00,
    status: 'cancelled',
    paymentMethod: 'Bank Transfer',
    items: [
      {
        name: 'Wireless Keyboard',
        quantity: 1,
        price: 79.99
      },
      {
        name: 'Mouse Pad',
        quantity: 1,
        price: 14.99
      }
    ]
  },
  {
    id: 'ORD2345',
    customer: {
      img: avatar7,
      name: 'Sophia Davis'
    },
    orderDate: '05 April, 2024 08:50 AM',
    deliveryDate: '22 April, 2024',
    amount: 329.00,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    items: [
      {
        name: 'Bluetooth Headphones',
        quantity: 1,
        price: 199.99
      },
      {
        name: 'Phone Charger',
        quantity: 2,
        price: 14.99
      }
    ]
  },
  {
    id: 'ORD6789',
    customer: {
      img: avatar8,
      name: 'Isabella Lopez'
    },
    orderDate: '15 Jun, 2024 11:09 PM',
    deliveryDate: '01 July, 2024',
    amount: 124.99,
    status: 'processing',
    paymentMethod: 'PayPal',
    items: [
      {
        name: 'Wireless Mouse',
        quantity: 1,
        price: 49.99
      },
      {
        name: 'HDMI Cable',
        quantity: 1,
        price: 14.99
      },
      {
        name: 'USB Hub',
        quantity: 1,
        price: 29.99
      }
    ]
  },
  {
    id: 'ORD0123',
    customer: {
      img: avatar9,
      name: 'Ava Wilson'
    },
    orderDate: '22 April, 2024 05:09 PM',
    deliveryDate: '30 April, 2024',
    amount: 1000.00,
    status: 'shipped',
    paymentMethod: 'Bank Transfer',
    items: [
      {
        name: 'Laptop Stand',
        quantity: 1,
        price: 49.99
      },
      {
        name: 'Wireless Keyboard',
        quantity: 1,
        price: 79.99
      },
      {
        name: 'Monitor',
        quantity: 1,
        price: 249.99
      }
    ]
  },
  {
    id: 'ORD4567',
    customer: {
      img: avatar10,
      name: 'Oliver Lee'
    },
    orderDate: '23 April, 2024 12:09 PM',
    deliveryDate: '30 April, 2024',
    amount: 1999.00,
    status: 'pending',
    paymentMethod: 'Credit Card',
    items: [
      {
        name: 'Gaming Laptop',
        quantity: 1,
        price: 1499.99
      },
      {
        name: 'Gaming Mouse',
        quantity: 1,
        price: 89.99
      },
      {
        name: 'Gaming Keyboard',
        quantity: 1,
        price: 129.99
      }
    ]
  },
];
