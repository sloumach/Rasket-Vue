<template>
  <VerticalLayout>
    <b-row>
      <b-col md="6" xl="3" v-for="(item, idx) in orderStats.slice(0, 4)" :key="idx">
        <StatisticsCard1 :item="item" />
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col md="6" xl="3" v-for="(item, idx) in orderStats.slice(4)" :key="idx">
        <StatisticsCard1 :item="item" />
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <b-card no-body>
          <b-card-header class="d-flex justify-content-between align-items-center">
            <b-card-title tag="h4">Recent Orders</b-card-title>
            <div>
              <b-button variant="primary" size="sm">
                <i class="bx bx-plus me-1"></i>Add New Order
              </b-button>
            </div>
          </b-card-header>

          <b-card-body>
            <b-table
              responsive
              :items="generateRandomOrders(10)"
              :fields="fields"
              striped
              hover
            >
              <template #cell(status)="data">
                <b-badge :variant="getStatusVariant(data.value)">
                  {{ data.value }}
                </b-badge>
              </template>
              <template #cell(actions)>
                <b-button variant="light" size="sm" class="me-1">
                  <i class="bx bx-show"></i>
                </b-button>
                <b-button variant="light" size="sm" class="me-1">
                  <i class="bx bx-edit"></i>
                </b-button>
                <b-button variant="light" size="sm">
                  <i class="bx bx-trash"></i>
                </b-button>
              </template>
            </b-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </VerticalLayout>
</template>

<script setup lang="ts">
import VerticalLayout from "@/layouts/VerticalLayout.vue";
import StatisticsCard1 from '@/views/widgets/components/StatisticsCard1.vue';
import { orderStats } from './components/order-stats';
import { ref } from 'vue';

const fields = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

const generateRandomOrders = (count: number) => {
  const statuses = ['New', 'Accepted', 'Preparing', 'Ready', 'Delivering', 'Complete', 'Canceled'];
  const customers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Sarah Wilson', 'David Miller'];
  
  const orders = [];
  
  for (let i = 1; i <= count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomAmount = (Math.random() * 200 + 10).toFixed(2);
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    orders.push({
      id: `ORD-${10000 + i}`,
      customer: randomCustomer,
      date: formattedDate,
      amount: `$${randomAmount}`,
      status: randomStatus
    });
  }
  
  return orders;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'New':
      return 'primary';
    case 'Accepted':
      return 'info';
    case 'Preparing':
      return 'warning';
    case 'Ready':
      return 'success';
    case 'Delivering':
      return 'info';
    case 'Complete':
      return 'success';
    case 'Canceled':
      return 'danger';
    default:
      return 'secondary';
  }
};
</script>

<style scoped>
.card-title {
  margin-bottom: 0;
}
</style>
