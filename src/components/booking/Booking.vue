<script setup>
import { ref } from "vue";
import DatePicker from "primevue/datepicker";
import { minDate, maxDate } from "@/helpers/currentDate";

const date = ref();
const userName = ref("");
const userPhone = ref("");
const startTime = ref("");
const endTime = ref("");
</script>

<template>
  <Transition name="booking">
    <div class="booking" @click="$emit('booking-close', false)">
      <form class="booking__form" @click.stop @submit.prevent="$emit('booking-close', false), $emit('notification-open', true)">
        <div class="booking__form-content">
          <DatePicker
            inputClass="booking__form-date"
            v-model="date"
            showIcon
            fluid
            iconDisplay="input"
            :manualInput="false"
            placeholder="Выберите дату"
            :minDate="minDate"
            :maxDate="maxDate"
            dateFormat="dd/mm/yy"
          />
          <ul class="booking__form-list">
            <li class="booking__form-item">с 12:30 до 14:00 забронирован</li>
            <li class="booking__form-item">с 16:30 до 18:00 забронирован</li>
            <li class="booking__form-item">с 21:30 до 23:00 забронирован</li>
          </ul>
          <div class="booking__form-time">
            <label class="booking__form-label">
              с
              <input
                type="time"
                class="booking__form-input"
                v-model="startTime"
              />
            </label>
            <label class="booking__form-label">
              до
              <input type="time" class="booking__form-input" v-model="endTime" />
            </label>
          </div>
          <div class="booking__form-name">
            <label for="booking__form-name">Имя</label>
            <InputText
              id="booking__form-name"
              v-model="userName"
              placeholder="Введите имя"
            />
          </div>
          <div class="booking__form-phone">
            <label for="booking__form-phone">Номер телефона</label>
            <InputMask
              id="booking__form-phone"
              v-model="userPhone"
              mask="99 999 99 99"
              placeholder="(99) 999 99 99"
            />
          </div>
        </div>
        <button
          class="booking__form-btn"
          :disabled="
            userName == '' || userPhone == '' || startTime == '' || endTime == ''
          "
        >
          Подтвердить
        </button>
      </form>
    </div>
  </Transition>
</template>
