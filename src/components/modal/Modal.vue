<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";

const formValues = ref({
  name: "",
  phone_number: "",
});

const onSubmit = () => {
  const { name, phone_number } = formValues.value;
  console.log(name, phone_number, formValues.value);
};
</script>

<template>
  <Transition name="modal">
    <div class="modal" @click="$emit('modal-close', false)">
      <div class="modal__content container">
        <form class="modal__form" @submit.prevent="onSubmit" @click.stop>
          <div class="modal__form-item">
            <label class="modal__form-label">Имя</label>
            <InputText v-model="formValues.name" placeholder="Имя" />
          </div>
          <div class="modal__form-item">
            <label class="modal__form-label">Номер телефона</label>
            <InputText
              v-model="formValues.phone_number"
              placeholder="Номер телефона"
            />
          </div>
          <button class="modal__form-btn modal_success" type="submit">
            Забронировать
          </button>
          <button class="modal__form-btn modal_cancel" type="submit">
            Удалить бронь
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>
