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
const scene = ref(1);

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

const handleChangeSceneOut = () => scene.value = 1
const handleChangeSceneBack = () => scene.value = 0

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

    <div v-show="floor === 1" class="scene_wrapper">
      <div class="scene_wrapper_item" @click="handleChangeSceneOut">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
          <path d="M21.5524 10.0096C19.8013 11.4427 17.8131 12.253 15.5879 12.4405C13.3627 12.628 11.2686 12.1551 9.30559 11.0218C7.99211 10.2634 6.8972 9.28489 6.02085 8.0861C5.1445 6.88732 4.53388 5.55328 4.18898 4.08399L2.46398 7.07178L0.731934 6.07178L4.23193 0.00959963L10.2941 3.5096L9.29411 5.24165L6.08982 3.39165C6.35094 4.63937 6.84461 5.77598 7.57082 6.80148C8.29703 7.82698 9.20862 8.65639 10.3056 9.28973C11.7778 10.1397 13.356 10.5313 15.0401 10.4643C16.7242 10.3974 18.2671 9.88334 19.6688 8.9221L21.5524 10.0096Z" fill="#5F6368"/>
        </svg>
      </div>
      <div class="scene_wrapper_item">
        Свайп
      </div>
      <div class="scene_wrapper_item" @click="handleChangeSceneBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
          <path d="M0.232227 10.0096C1.98338 11.4427 3.97156 12.253 6.19678 12.4405C8.42199 12.628 10.5161 12.1551 12.4791 11.0218C13.7926 10.2634 14.8875 9.28489 15.7638 8.0861C16.6402 6.88732 17.2508 5.55328 17.5957 4.08399L19.3207 7.07178L21.0527 6.07178L17.5527 0.00959963L11.4906 3.5096L12.4906 5.24165L15.6949 3.39165C15.4337 4.63937 14.9401 5.77598 14.2138 6.80148C13.4876 7.82698 12.576 8.65639 11.4791 9.28973C10.0068 10.1397 8.42867 10.5313 6.74459 10.4643C5.0605 10.3974 3.51758 9.88334 2.11583 8.9221L0.232227 10.0096Z" fill="#5F6368"/>
        </svg>
      </div>
    </div>

    <FirstFloorView v-if="floor === 1"
                    @modal-open="modalOpen"
                    :active="isModal"
                    :selected-chair="selectedChair"
                    :scene="scene"
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
