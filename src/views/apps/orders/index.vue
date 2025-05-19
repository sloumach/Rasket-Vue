<template>
  <VerticalLayout>
    <!-- Order Status Cards -->
    <b-row class="g-2">
      <b-col md="6" xl="3" v-for="(item, idx) in orderStats" :key="idx">
        <OrderStatusCard :item="item" />
      </b-col>
    </b-row>

    <!-- Orders Table -->
    <b-row class="mt-3">
      <b-col>
        <div class="mb-3">
          <div class="row g-2 orders-filter-row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4">
              <div class="app-search w-100">
                <div class="position-relative">
                  <b-form-input :placeholder="t('common.search') + '...'" />
                  <span class="bx bx-search-alt"></span>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-4 col-lg-4">
              <div class="button-container action-buttons" v-if="selectedOrders.length > 0">
                <button class="btn btn-light action-btn print-btn">
                  <i class="bx bx-printer me-1"></i> {{ t('common.print') }}
                </button>
                <button class="btn btn-light action-btn archive-btn">
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
          <div class="d-flex justify-content-between align-items-center table-header p-3 border-bottom orders-header">
            <h5 class="mb-0 fw-semibold">{{ t('common.allOrders') }}</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="timeFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bx bx-calendar me-1"></i> {{ t('common.viewBy') }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="timeFilterDropdown">
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar me-1"></i> {{ t('common.day') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar me-1"></i> {{ t('common.week') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar me-1"></i> {{ t('common.month') }}</a></li>
                <li><a class="dropdown-item" href="#"><i class="bx bx-calendar me-1"></i> {{ t('common.year') }}</a></li>
              </ul>
            </div>
          </div>

          <div>
            <b-table-simple responsive class="table-centered table-nowrap mb-0">
              <b-thead class="bg-light bg-opacity-50">
                <b-tr>
                  <b-th class="border-0 py-2 text-center" style="width: 40px;">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="selectAllCheckbox"
                        :checked="isAllSelected"
                        @change="toggleSelectAll"
                      >
                    </div>
                  </b-th>
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
                  <b-th class="border-0 py-2">{{ t('common.note') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.dateReceived') }}</b-th>
                  <b-th class="border-0 py-2">{{ t('common.action') }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr
                  v-for="(item, idx) in ordersList"
                  :key="idx"
                  @click="rowClicked(item, $event)"
                  class="clickable-row">
                  <!-- Checkbox -->
                  <b-td class="text-center" @click.stop>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :id="`checkbox-${item.id}`"
                        v-model="selectedOrders"
                        :value="item.id"
                      >
                    </div>
                  </b-td>

                  <!-- Order -->
                  <b-td>
                    <router-link :to="`/apps/orders/${item.id}`" class="fw-medium">#{{ item.id }}</router-link>
                  </b-td>

                  <!-- Customer -->
                  <b-td>
                       {{ item.customer.name }}
                  </b-td>

                  <!-- Channel -->
                  <b-td>{{ getRandomChannel()}}</b-td>

                  <!-- Total -->
                  <b-td>{{ currency }}{{ item.amount }}</b-td>

                  <!-- Payment Status -->
                  <b-td>
                    <div class="d-flex justify-content-center">
                      <b-badge :variant="null" :class="getPaymentStatusBadgeClass(idx)">
                        {{ getRandomPaymentStatus(idx).toLowerCase() }}
                      </b-badge>
                    </div>
                  </b-td>

                  <!-- Status -->
                  <b-td>
                    <div class="d-flex justify-content-center">
                      <b-badge :variant="null" :class="getStatusBadgeClass(item.status)">
                        {{ item.status }}
                      </b-badge>
                    </div>
                  </b-td>

                  <!-- Branch -->
                  <b-td>{{ getRandomBranch().toLowerCase() }}</b-td>

                  <!-- Area -->
                  <b-td>{{ getRandomArea().toLowerCase() }}</b-td>

                  <!-- Date Created -->
                  <b-td>{{ item.orderDate }}</b-td>

                  <!-- Type -->
                  <b-td>{{ getRandomType().toLowerCase() }}</b-td>

                  <!-- Payment Method -->
                  <b-td>{{ item.paymentMethod }}</b-td>

                  <!-- Note -->
                  <b-td>
                    <div class="d-flex justify-content-center">
                      <a href="#" @click.stop.prevent="showNoteModal(idx)" class="note-icon" v-if="idx % 3 === 0">
                        <i class="bx bx-note text-info"></i>
                      </a>
                      <span v-else>-</span>
                    </div>
                  </b-td>

                  <!-- Date Received -->
                  <b-td>{{ item.deliveryDate }}</b-td>

                  <!-- Action -->
                  <b-td>
                    <div class="d-flex justify-content-center">
                      <a href="#" class="action-icon edit-icon" title="Edit" @click.stop>
                        <i class="bx bx-edit"></i>
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

    <!-- Note Modal -->
    <b-modal v-model="noteModalVisible" title="Order Note" hide-footer centered>
      <div class="p-2">
        <p>{{ currentNote }}</p>
      </div>
      <div class="text-end mt-3">
        <button class="btn btn-sm btn-primary" @click="noteModalVisible = false">Close</button>
      </div>
    </b-modal>
  </VerticalLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
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

// Selected orders for bulk actions
const selectedOrders = ref<string[]>([]);
const isAllSelected = computed(() => {
  return selectedOrders.value.length === ordersList.length;
});

// Toggle select all orders
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedOrders.value = [];
  } else {
    selectedOrders.value = ordersList.map(order => order.id);
  }
};

// Handle row click (don't navigate if checkbox was clicked)
const rowClicked = (item: any, event: Event) => {
  // Only navigate if the click wasn't on a checkbox
  if (!(event.target as HTMLElement).closest('.form-check')) {
    navigateToOrder(item.id);
  }
};

// Note modal
const noteModalVisible = ref(false);
const currentNote = ref('');

// Show note modal
const showNoteModal = (idx: number) => {
  currentNote.value = t(getTranslationKeyForNote(getRandomNote()));
  noteModalVisible.value = true;
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

.app-search :deep(.form-control) {
  border-radius: 0.25rem;
  height: 38px;
  padding-left: 40px;
  padding-right: 20px;
  box-shadow: none;
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
  color: var(--bs-body-color);
  font-size: 1.05rem;
}

/* RTL specific styles for orders header */
:deep([dir="rtl"]) .orders-header {
  flex-direction: row-reverse;
}

/* RTL specific styles for orders filter row */
:deep([dir="rtl"]) .orders-filter-row {
  flex-direction: row-reverse;
}

:deep([dir="rtl"]) .justify-content-md-end {
  justify-content: flex-start !important;
}

:deep([dir="rtl"]) .justify-content-sm-start {
  justify-content: flex-end !important;
}

:deep([dir="rtl"]) .action-buttons {
  flex-direction: row;
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

/* Action buttons styling */
.action-btn {
  border-color: var(--bs-border-color);
}

.print-btn {
  color: var(--bs-body-color);
}

.print-btn i {
  color: var(--bs-body-color);
}

.archive-btn {
  color: var(--bs-primary);
}

.archive-btn i {
  color: var(--bs-primary);
}

.action-btn:hover {
  background-color: var(--bs-light);
}

/* Dark mode specific styles for buttons and search input */
:deep([data-bs-theme="dark"]) .btn-light {
  --bs-btn-active-color: var(--bs-dark);
  --bs-btn-active-bg: var(--bs-border-color);
  --bs-btn-active-border-color: var(--bs-border-color);
  background-color: var(--bs-tertiary-bg) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-body-color) !important;
}

:deep([data-bs-theme="dark"]) .app-search .form-control {
  background-color: var(--bs-tertiary-bg) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-body-color) !important;
}

:deep([data-bs-theme="dark"]) .app-search span {
  color: var(--bs-secondary-color) !important;
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

/* Note icon styling */
.note-icon {
  color: var(--bs-info);
  font-size: 1.2rem;
  display: inline-block;
  text-align: center;
}

.note-icon:hover {
  color: var(--bs-primary);
}

/* Checkbox styling */
.form-check {
  margin: 0;
}

.form-check-input {
  cursor: pointer;
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

/* Ensure columns with centered content work in both LTR and RTL modes */
.d-flex.justify-content-center {
  justify-content: center !important;
}

:deep([dir="rtl"]) .d-flex.justify-content-center {
  justify-content: center !important;
}

/* Ensure badges are properly centered */
.d-flex.justify-content-center .badge {
  text-align: center !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

:deep([dir="rtl"]) .d-flex.justify-content-center .badge {
  text-align: center !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
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
