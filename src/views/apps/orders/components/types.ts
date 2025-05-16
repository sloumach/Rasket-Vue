type Customer = {
  img: string;
  name: string;
};

export type OrderType = {
  id: string;
  customer: Customer;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  status: string;
  paymentMethod: string;
  items: OrderItemType[];
};

export type OrderItemType = {
  name: string;
  quantity: number;
  price: number;
};
