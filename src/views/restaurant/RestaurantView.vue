<script setup>
import FirstFloorView from "@/views/firstFloor/FirstFloorView.vue";
import Modal from "@/components/modal/Modal.vue";
import Booking from "@/components/booking/Booking.vue";
import Notification from "@/components/notification/Notification.vue";
import { computed, onMounted, ref, watchEffect } from "vue";

const isModal = ref(false);
const isBooking = ref(false);
const isNotification = ref(false);
const chairId = ref(NaN);

const modalOpen = (id) => {
  chairId.value = id;
  isModal.value = true;
};

const modalClose = (boolean) => {
  isModal.value = boolean;
};

const bookingOpen = (boolean) => {
  isBooking.value = boolean;
};

const bookingClose = (boolean) => {
  isBooking.value = boolean;
};

const notificationOpen = (boolean) => {
  isNotification.value = boolean;
};

const notificationClose = (boolean) => {
  isNotification.value = boolean;
};
</script>

<template>
  <section class="restaurant">
    <FirstFloorView
      @modal-open="modalOpen"
      :active="isModal"
      :chairId="chairId"
    />
    <Modal
      v-show="isModal"
      @modal-close="modalClose"
      @booking-open="bookingOpen"
    />
    <!--    <Booking v-show="isBooking" @booking-close="bookingClose" @notification-open="notificationOpen"  />-->
    <!--    <Notification v-if="isNotification" @notification-close="notificationClose" />-->
  </section>
</template>
