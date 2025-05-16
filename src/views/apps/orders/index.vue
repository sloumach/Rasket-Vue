<template>
  <VerticalLayout>
    <!-- Order Status Cards - First Row -->
    <b-row class="g-2">
      <b-col md="6" xl="3" v-for="(item, idx) in orderStats.slice(0, 4)" :key="idx">
        <OrderStatusCard :item="item" />
      </b-col>
    </b-row>

    <!-- Order Status Cards - Second Row -->
    <b-row class="g-2 mt-2">
      <b-col md="6" xl="3" v-for="(item, idx) in orderStats.slice(4)" :key="idx">
        <OrderStatusCard :item="item" />
      </b-col>
    </b-row>

    <!-- Orders Table -->
    <b-row class="mt-3">
      <b-col>
        <div class="mb-3">
          <div class="row g-2">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4">
              <div class="app-search w-100">
                <div class="position-relative">
                  <input type="text" class="form-control" :placeholder="t('common.search') + '...'">
                  <span class="bx bx-search-alt"></span>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-4 col-lg-4">
              <div class="d-flex gap-2 button-container">
                <button class="btn btn-light">
                  <i class="bx bx-printer me-1"></i> {{ t('common.print') }}
                </button>
                <button class="btn btn-white archive-btn">
                  <i class="bx bx-archive me-1"></i> {{ t('common.archive') }}
                </button>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-4 col-lg-4 d-flex justify-content-sm-start justify-content-md-end">
              <div class="dropdown filter-dropdown">
                <button class="btn btn-light dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bx bx-filter-alt me-1"></i> {{ t('common.filter') }}
                </button>
                <ul class="dropdown-menu filter-menu" aria-labelledby="filterDropdown">
                  <li><a class="dropdown-item" href="#"><i class="bx bx-user me-1"></i> {{ t('common.customerName') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-map me-1"></i> {{ t('common.country') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-purchase-tag me-1"></i> {{ t('common.orderNumber') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-credit-card me-1"></i> {{ t('common.paymentStatus') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-map-pin me-1"></i> {{ t('common.area') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-calendar me-1"></i> {{ t('common.date') }}</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bx bx-refresh me-1"></i> {{ t('common.refundStatus') }}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <b-card no-body>
          <!-- Table Header with Title and Time Period Selector -->
          <div class="d-flex justify-content-between align-items-center table-header p-3 border-bottom">
            <h5 class="mb-0 fw-semibold">{{ t('common.allOrders') }}</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="timeFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bx bx-calendar me-1"></i> {{ t('common.viewBy') }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="timeFilterDropdown">
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar-day me-1"></i> {{ t('common.day') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar-week me-1"></i> {{ t('common.week') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar-month me-1"></i> {{ t('common.month') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar-alt me-1"></i> {{ t('common.year') }}</a></li>
              </ul>
            </div>
          </div>

          <div>
            <b-table-simple responsive class="table-centered table-nowrap mb-0">
              <b-thead class="bg-light bg-opacity-50">
                <b-tr>
                  <b-th class="border-0 py-2">{{ t('common.order') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.customer') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.channel') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.total') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.paymentStatus') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.status') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.branch') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.area') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.dateCreated') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.type') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.paymentMethod') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.dateReceived') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.note') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.action') }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr
                  v-for="(item, idx) in ordersList"
                  :key="idx"
                  @click="navigateToOrder(item.id)"
                  class="clickable-row">
                  <!-- Order -->
                  <b-td>
                    <router-link :to="`/apps/orders/${item.id}`" class="fw-medium">#{{ item.id }}</router-link>
                  </b-td>

                  <!-- Customer -->
                  <b-td>
                    <div class="d-flex align-items-center">
                      <img :src="item.customer.img" alt="" class="avatar-xs rounded-circle me-2">
                      <div>
                        <h5 class="fs-14 m-0 fw-normal">{{ item.customer.name }}</h5>
                      </div>
                    </div>
                  </b-td>

                  <!-- Channel -->
                  <b-td>{{ t(`common.${getRandomChannel().toLowerCase()}`) }}</b-td>

                  <!-- Total -->
                  <b-td>{{ currency }}{{ item.amount }}</b-td>

                  <!-- Payment Status -->
                  <b-td>
                    <b-badge :variant="null" :class="getPaymentStatusBadgeClass(idx)">
                      {{ t(`common.${getRandomPaymentStatus(idx).toLowerCase()}`) }}
                    </b-badge>
                  </b-td>

                  <!-- Status -->
                  <b-td>
                    <b-badge :variant="null" :class="getStatusBadgeClass(item.status)">
                      {{ t(`common.${item.status}`) }}
                    </b-badge>
                  </b-td>

                  <!-- Branch -->
                  <b-td>{{ t(`common.${getRandomBranch().toLowerCase()}`) }}</b-td>

                  <!-- Area -->
                  <b-td>{{ t(`common.${getRandomArea().toLowerCase()}`) }}</b-td>

                  <!-- Date Created -->
                  <b-td>{{ item.orderDate }}</b-td>

                  <!-- Type -->
                  <b-td>{{ t(`common.${getRandomType().toLowerCase()}`) }}</b-td>

                  <!-- Payment Method -->
                  <b-td>{{ item.paymentMethod }}</b-td>

                  <!-- Date Received -->
                  <b-td>{{ item.deliveryDate }}</b-td>

                  <!-- Note -->
                  <b-td>
                    <span v-if="idx % 3 === 0" class="text-muted">{{ t(getTranslationKeyForNote(getRandomNote())) }}</span>
                    <span v-else>-</span>
                  </b-td>

                  <!-- Action -->
                  <b-td>
                    <div class="d-flex gap-1">
                      <a href="#" class="action-icon" title="View" @click.stop="navigateToOrder(item.id)">
                        <i class="bx bx-show"></i>
                      </a>
                      <a href="#" class="action-icon edit-icon" title="Edit" @click.stop>
                        <i class="bx bx-edit"></i>
                      </a>
                      <a href="#" class="action-icon delete-icon" title="Delete" @click.stop>
                        <i class="bx bx-trash"></i>
                      </a>
                    </div>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <div class="align-items-center justify-content-between row g-0 text-center text-sm-start p-3 border-top">
              <div class="col-sm">
                <div class="text-muted">
                  {{ t('common.showing') }} <span class="fw-semibold">{{ Math.min(perPage, ordersList.length) }}</span> {{ t('common.of') }} <span class="fw-semibold">{{ ordersList.length }}</span> {{ t('common.orders') }}
                </div>
              </div>
              <div class="col-sm-auto mt-3 mt-sm-0">
                <b-pagination
                  class="m-0"
                  pills
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="ordersList.length"
                />
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </VerticalLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import VerticalLayout from "@/layouts/VerticalLayout.vue";
import OrderStatusCard from '@/views/apps/orders/components/OrderStatusCard.vue';
import { currency } from '@/helpers/constants';
import { toSentenceCase } from '@/helpers/change-casing';
import { ordersList } from '@/views/apps/orders/components/data';
import { orderStats } from '@/views/apps/orders/components/order-stats';
import { useTranslation } from '@/locales/i18n';
import { useLanguageStore } from '@/stores/language';

const { t } = useTranslation();
const languageStore = useLanguageStore();

// Force component re-render when language changes
const forceUpdate = ref(0);
const updateComponent = () => {
  forceUpdate.value++;
};

// Listen for language changes
onMounted(() => {
  window.addEventListener('language-changed', updateComponent);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('language-changed', updateComponent);
});
const router = useRouter();

// Navigation function
const navigateToOrder = (orderId: string) => {
  router.push(`/apps/orders/${orderId}`);
};

// Pagination
const currentPage = ref(1);
const perPage = ref(10);

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

// Helper functions to generate random data for the table
const getRandomChannel = () => {
  const channels = ['website', 'mobileApp', 'phone', 'inStore', 'partner'];
  return channels[Math.floor(Math.random() * channels.length)];
};

const getRandomPaymentStatus = (idx: number) => {
  const statuses = ['paid', 'pending', 'failed', 'refunded'];
  return statuses[idx % statuses.length];
};

const getPaymentStatusBadgeClass = (idx: number) => {
  const status = getRandomPaymentStatus(idx);
  switch (status) {
    case 'paid':
      return 'badge-soft-success';
    case 'pending':
      return 'badge-soft-warning';
    case 'failed':
      return 'badge-soft-danger';
    case 'refunded':
      return 'badge-soft-info';
    default:
      return 'badge-soft-secondary';
  }
};

const getRandomBranch = () => {
  const branches = ['main', 'downtown', 'westside', 'eastside', 'north'];
  return branches[Math.floor(Math.random() * branches.length)];
};

const getRandomArea = () => {
  const areas = ['north', 'south', 'east', 'west', 'central'];
  return areas[Math.floor(Math.random() * areas.length)];
};

const getRandomType = () => {
  const types = ['retail', 'wholesale', 'online', 'special', 'subscription'];
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomNote = () => {
  const notes = [
    'Customer requested gift wrapping',
    'Expedited shipping',
    'Call before delivery',
    'Leave at door',
    'Fragile items'
  ];
  return notes[Math.floor(Math.random() * notes.length)];
};

const getTranslationKeyForNote = (note: string) => {
  switch (note) {
    case 'Customer requested gift wrapping':
      return 'common.giftWrapping';
    case 'Expedited shipping':
      return 'common.expeditedShipping';
    case 'Call before delivery':
      return 'common.callBeforeDelivery';
    case 'Leave at door':
      return 'common.leaveAtDoor';
    case 'Fragile items':
      return 'common.fragileItems';
    default:
      return '';
  }
};
</script>

<style scoped>

.app-search {
  padding: 0;
  width: 280px;
}

.app-search .form-control {
  border-radius: 0.25rem;
  height: 38px;
  padding-left: 40px;
  padding-right: 20px;
  background-color: #fff;
  box-shadow: none;
  border: 1px solid #e9ecef;
}

.app-search span {
  position: absolute;
  z-index: 10;
  font-size: 16px;
  line-height: 38px;
  left: 10px;
  top: 0;
  color: #98a6ad;
}

/* RTL specific styles for search */
:deep([dir="rtl"]) .app-search .form-control {
  padding-right: 40px;
  padding-left: 20px;
}

:deep([dir="rtl"]) .app-search span {
  left: auto;
  right: 10px;
}

@media (max-width: 576px) {
  .app-search {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}


.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  white-space: nowrap;
}

/* RTL specific styles for buttons */
:deep([dir="rtl"]) .btn i {
  margin-left: 0.25rem;
  margin-right: 0;
}


.button-container {
  width: auto;
}

@media (max-width: 576px) {
  .button-container {
    width: 100%;
  }

  .button-container .btn {
    flex: 1;
  }
}


.filter-dropdown {
  width: auto;
}

.filter-menu {
  min-width: 200px;
  padding: 0.5rem 0;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
}

@media (max-width: 576px) {
  .filter-dropdown {
    width: 100%;
  }

  .filter-dropdown .btn {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .dropdown {
    margin-top: 0.5rem;
  }
}

.filter-menu .dropdown-item {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.filter-menu .dropdown-item:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.08);
}

.filter-menu .dropdown-item i {
  font-size: 1rem;
  margin-right: 0.5rem;
  color: #6c757d;
}

/* RTL specific styles for dropdown items */
:deep([dir="rtl"]) .filter-menu .dropdown-item i {
  margin-right: 0;
  margin-left: 0.5rem;
}

/* Table header styles */
h5.fw-semibold {
  color: #495057;
  font-size: 1.05rem;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.dropdown-menu-end {
  right: 0;
  left: auto;
}

/* RTL specific styles for dropdown menus */
:deep([dir="rtl"]) .dropdown-menu-end {
  right: auto;
  left: 0;
}

/* Custom table header background to match thead */
.table-header {
  background-color: var(--bs-light);
  background-color: rgba(var(--bs-light-rgb), 0.5);
}

/* Action icons */
.action-icon {
  color: var(--bs-body-color);
  font-size: 1.2rem;
  display: inline-block;
  padding: 0 3px;
}

.action-icon:hover {
  color: var(--bs-primary);
}

/* Archive button styling */
.archive-btn {
  background-color: #FFFFFF;
  border-color: #e9ecef;
  color: #3176FB;
}

.archive-btn i {
  color: #3176FB;
}

.archive-btn:hover {
  background-color: #f8f9fa;
  color: #3176FB;
}

/* Clickable row styling */
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.05);
}

/* Prevent click on action buttons from triggering row click */
.clickable-row .action-icon {
  position: relative;
  z-index: 2;
}

/* RTL specific styles for tables */
:deep([dir="rtl"]) .table-centered th,
:deep([dir="rtl"]) .table-centered td {
  text-align: right;
}

:deep([dir="rtl"]) .avatar-xs {
  margin-left: 0.5rem;
  margin-right: 0;
}

/* RTL specific styles for pagination */
:deep([dir="rtl"]) .pagination {
  padding-right: 0;
}

:deep([dir="rtl"]) .pagination .page-item:first-child .page-link {
  border-radius: 0 0.25rem 0.25rem 0;
}

:deep([dir="rtl"]) .pagination .page-item:last-child .page-link {
  border-radius: 0.25rem 0 0 0.25rem;
}

/* RTL specific styles for flex containers */
:deep([dir="rtl"]) .d-flex.gap-1,
:deep([dir="rtl"]) .d-flex.gap-2,
:deep([dir="rtl"]) .d-flex.gap-3 {
  flex-direction: row-reverse;
}

/* RTL specific styles for text alignment */
:deep([dir="rtl"]) .text-start {
  text-align: right !important;
}

:deep([dir="rtl"]) .text-end {
  text-align: left !important;
}

/* RTL specific styles for margins */
:deep([dir="rtl"]) .me-1 {
  margin-left: 0.25rem !important;
  margin-right: 0 !important;
}

:deep([dir="rtl"]) .me-2 {
  margin-left: 0.5rem !important;
  margin-right: 0 !important;
}

:deep([dir="rtl"]) .ms-1 {
  margin-right: 0.25rem !important;
  margin-left: 0 !important;
}

:deep([dir="rtl"]) .ms-2 {
  margin-right: 0.5rem !important;
  margin-left: 0 !important;
}
</style>
