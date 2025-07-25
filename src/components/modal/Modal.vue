<script setup>
import { ref, watch } from "vue";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import { VueSpinner } from "vue3-spinners";
import { myStore } from "@/helpers/common-api.js";
import { ApiURL } from "@/helpers/constant.js";

const store = myStore();

const props = defineProps({
  selectedChair: {
    type: Object,
    default: () => {},
  },
  modalClose: {
    type: Function,
    default: () => {},
  },
});

watch(
  () => props.selectedChair,
  (newValue) => {
    formValues.value = {
      name: newValue?.name,
      phone_number: newValue?.phone_number?.length
        ? newValue?.phone_number
        : "+998 (__) ___-__-__",
    };
  }
);

const formValues = ref({
  name: props?.name,
  phone_number: props.selectedChair?.phone_number,
});
const isLoading = ref(false);

const onSubmit = () => {
  if (!props.selectedChair.id) return;
  const { name, phone_number } = formValues.value;
  const payload = {
    name: !props.selectedChair.isBooked ? name : "",
    phone_number: !props.selectedChair.isBooked ? phone_number : "",
    id: props.selectedChair.id,
    isBooked: !props.selectedChair.isBooked,
    floor: props.selectedChair.floor,
  };

  isLoading.value = true;

  fetch(`${ApiURL}/data/${props.selectedChair.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        store.getChairDate();
        props.modalClose();
        isLoading.value = false;
      }, 500);
    })
    .catch((error) => {
      isLoading.value = false;
    });
};

const checkPhoneNumber = (value) => {
  return value.replace(/\D/g, "").length === 12;
};
</script>

<template>
  <Transition name="modal">
    <div class="modal" @click="props.modalClose">
      <div class="modal__content container">
        <form class="modal__form" @submit.prevent="onSubmit" @click.stop>
          <div class="modal__form-item">
            <label class="modal__form-label">Имя</label>
            <InputText
              v-model="formValues.name"
              placeholder="Имя"
              :disabled="props.selectedChair.isBooked"
            />
          </div>
          <div class="modal__form-item">
            <label class="modal__form-label">Номер телефона</label>
            <InputMask
              v-model="formValues.phone_number"
              slotChar="+998 (__) ___-__-__"
              mask="+998 (99) 999-99-99"
              placeholder="+998 (xx) xxx-xx-xx"
              :disabled="props.selectedChair.isBooked"
            />
          </div>
          <button
            :class="`modal__form-btn ${
              props.selectedChair.isBooked ? 'modal_cancel' : 'modal_success'
            }`"
            :disabled="
              isLoading ||
              (!props.selectedChair.isBooked &&
                (!formValues.name?.length ||
                  !checkPhoneNumber(formValues.phone_number)))
            "
            type="submit"
          >
            <VueSpinner v-show="isLoading" size="25" />
            {{
              props.selectedChair.isBooked ? "Удалить бронь" : "Забронировать"
            }}
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>
