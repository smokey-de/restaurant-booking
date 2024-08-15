<script setup>
import FirstFloorView from "@/views/firstFloor/FirstFloorView.vue";
import Modal from "@/components/modal/Modal.vue";
import {ref} from "vue";
import SecondFloorView from "@/views/secondFloorView/SecondFloorView.vue";
import {myStore} from "@/helpers/common-api.js";

const store = myStore()
const isModal = ref(false);
const selectedChair = ref({});
const floor = ref(1);

const modalOpen = (item) => {
  selectedChair.value = item;
  isModal.value = true;
};

const modalClose = () => {
  isModal.value = false;
  setTimeout(() => {
    selectedChair.value = {};
  }, 300);
};

const handleFloorChange = (value) => {
  floor.value = value;
};

</script>

<template>

  <div v-show="store.isLoading" class="loading_page"/>


  <section class="restaurant">
    <div class="floor_text_wrapper">
      <ul>
        <li>
          <div :class="{floor_text: true, active: floor === 1}" @click="handleFloorChange(1)">
            1 Этаж
          </div>
        </li>
        <li>
          <div :class="{floor_text: true, active: floor === 2}" @click="handleFloorChange(2)">
            2 Этаж
          </div>
        </li>

      </ul>
    </div>

    <FirstFloorView v-if="floor === 1"
                    @modal-open="modalOpen"
                    :active="isModal"
                    :selected-chair="selectedChair"
    />
    <SecondFloorView
        v-if="floor === 2"
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
