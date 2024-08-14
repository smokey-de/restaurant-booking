<script setup>
import FirstFloorView from "@/views/firstFloor/FirstFloorView.vue";
import Modal from "@/components/modal/Modal.vue";
import { ref } from "vue";

const isModal = ref(false);
const selectedChair = ref({});

const modalOpen = (item) => {
  selectedChair.value = item;
  isModal.value = true;
};

const modalClose = () => {
  isModal.value = false;
  selectedChair.value = {};
};
</script>

<template>
  <section class="restaurant">
    <FirstFloorView
      @modal-open="modalOpen"
      :active="isModal"
      :selected-chair="selectedChair"
    />
    <Modal
      v-show="isModal"
      :selected-chair="selectedChair"
      :modal-close="modalClose"
    />
    <!--    <Booking v-show="isBooking" @booking-close="bookingClose" @notification-open="notificationOpen"  />-->
    <!--    <Notification v-if="isNotification" @notification-close="notificationClose" />-->
  </section>
</template>
