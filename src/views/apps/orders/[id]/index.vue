<template>
  <VerticalLayout>
    <b-row>
      <b-col cols="12">
        <b-card no-body>
          <b-card-body>
            <div class="clearfix">
              <div class="float-sm-end">
                <div class="auth-logo">
                  <img class="logo-dark me-1" :src="logoDark" alt="logo-dark" height="24" />
                  <img class="logo-light me-1" :src="logoLight" alt="logo-dark" height="24" />
                </div>
                <address class="mt-3">
                  1729 Bangor St,<br>
                  Houlton, ME, 04730 <br>
                  <abbr title="Phone">P:</abbr> (207) 532-9109
                </address>
              </div>
              <div class="float-sm-start">
                <b-card-title tag="h5" class="b-card-title mb-2">Order: #{{ order.id }}</b-card-title>
                <div class="mt-3">
                  <p><b>Order Date:</b> {{ order.orderDate }}</p>
                  <p><b>Delivery Date:</b> {{ order.deliveryDate }}</p>
                  <p><b>Status:</b> <b-badge :variant="null" :class="getStatusBadgeClass(order.status)">
                      {{ toSentenceCase(order.status) }}
                    </b-badge>
                  </p>
                </div>
              </div>
            </div>

            <b-row class="mt-4">
              <b-col md="6">
                <h6 class="fw-medium">Billing Address</h6>
                <address>
                  {{ order.customer.name }}<br>
                  795 Folsom Ave, Suite 600<br>
                  San Francisco, CA 94107<br>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </b-col>
              <b-col md="6">
                <h6 class="fw-medium">Shipping Address</h6>
                <address>
                  {{ order.customer.name }}<br>
                  795 Folsom Ave, Suite 600<br>
                  San Francisco, CA 94107<br>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <div class="table-responsive table-borderless text-nowrap mt-3 table-centered mb-0">
                  <table class="table mb-0">
                    <thead class="bg-light bg-opacity-50">
                      <tr>
                        <th class="border-0 py-2">Product Name</th>
                        <th class="border-0 py-2">Quantity</th>
                        <th class="border-0 py-2">Price</th>
                        <th class="text-end border-0 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in order.items" :key="idx">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ currency }}{{ item.price.toFixed(2) }}</td>
                        <td class="text-end">{{ currency }}{{ (item.quantity * item.price).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <div class="d-flex justify-content-end mt-4">
                  <div class="text-end">
                    <p><span class="fw-medium">Sub-total:</span>
                      <span class="float-end ms-3">{{ currency }}{{ calculateSubtotal().toFixed(2) }}</span>
                    </p>
                    <p><span class="fw-medium">Shipping:</span>
                      <span class="float-end ms-3">{{ currency }}15.00</span>
                    </p>
                    <p><span class="fw-medium">Tax (10%):</span>
                      <span class="float-end ms-3">{{ currency }}{{ calculateTax().toFixed(2) }}</span>
                    </p>
                    <h3>{{ currency }}{{ calculateTotal().toFixed(2) }}</h3>
                  </div>
                </div>
                <div class="clearfix"></div>
              </b-col>
            </b-row>

            <div class="mt-5 mb-1">
              <div class="text-end d-print-none">
                <a href="javascript:window.print()" class="btn btn-primary">Print</a>{{ ' ' }}
                <a href="javascript:void(0);" class="btn btn-outline-primary">Submit</a>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </VerticalLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import VerticalLayout from "@/layouts/VerticalLayout.vue";
import logoDark from '@/assets/images/logo-dark-full.png';
import logoLight from '@/assets/images/logo-light-full.png';
import { currency } from '@/helpers/constants';
import { toSentenceCase } from '@/helpers/change-casing';
import { ordersList } from '@/views/apps/orders/components/data';

const route = useRoute();
const orderId = route.params.id as string;

const order = computed(() => {
  const foundOrder = ordersList.find(o => o.id === orderId);
  return foundOrder || ordersList[0]; // Fallback to first order if not found
});

const calculateSubtotal = () => {
  return order.value.items.reduce((total, item) => total + (item.quantity * item.price), 0);
};

const calculateTax = () => {
  return calculateSubtotal() * 0.1; // 10% tax
};

const calculateTotal = () => {
  return calculateSubtotal() + calculateTax() + 15; // Subtotal + Tax + Shipping
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'badge-soft-success';
    case 'processing':
      return 'badge-soft-primary';
    case 'shipped':
      return 'badge-soft-info';
    case 'pending':
      return 'badge-soft-warning';
    case 'cancelled':
      return 'badge-soft-danger';
    default:
      return 'badge-soft-secondary';
  }
};
</script>
