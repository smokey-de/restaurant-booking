<script setup>
import { watch } from "vue";
import { computed } from "vue";
import { ref } from "vue";

const sms = ref("");
const showSuccess = ref(false)

const secondsLeft = ref(60); // Initial seconds count

// Timer logic

let interval = setInterval(() => {
  secondsLeft.value--;
}, 1000);

const formattedTime = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60);
  const seconds = secondsLeft.value % 60;
  if (secondsLeft.value == 0) {
    clearTimeout(interval);
  }
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});
</script>

<template>
  <Transition name="notification">
    <div class="notification">
      <div class="notification__content" v-if="sms.length !== 6">
        <h2 class="notification__content-title">Введите код из СМС</h2>
        <p class="notification__content-txt">
          Мы отправили СМС с кодом на номер
          <span>+998 97 *** ** 77</span>
        </p>
        <InputOtp
          v-model="sms"
          integerOnly
          :length="6"
          class="notification__content-input"
        />
        <p
          class="notification__content-timeout"
          :class="{ active: secondsLeft == 0 }"
        >
          {{
            formattedTime == "0:00"
              ? "Отправить код еще раз"
              : "Повторить отправку можно через " + formattedTime
          }}
        </p>
        <p class="notification__content-change">Изменить номер телефона</p>
      </div>
      <Transition name="notification">
          <div class="notification__success" v-if="sms.length === 6 && !showSuccess">
            <h4 class="notification__success-title">Вы успешно забронировали место!</h4>
            <RouterLink to="/" class="notification__success-link" @click="showSuccess = true, $emit('notification-close', false), sms.length = 0">
              Вернуться на главную страницу
            </RouterLink>
          </div>
      </Transition>
    </div>
  </Transition>
</template>
