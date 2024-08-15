import { computed, ref } from "vue";
import { chairsPath } from "./svgPath";
import { defineStore } from "pinia";

function useInitializeStore(apiCall) {
  const initialized = ref(false);
  const loading = ref(false);

  (async function () {
    loading.value = true;
    await apiCall();
    initialized.value = true;
    loading.value = false;
  })();

  return { initialized, loading };
}

export const myStore = defineStore("myStore", () => {
  const data = ref([]);
  const isLoading = ref(false);
  async function getChairDate() {
    isLoading.value = true;
    const res = await fetch("https://json-server-crfx.onrender.com/data").then(
      (res) => res.json()
    );

    const result = [];
    for (const item of res) {
      for (const chair of chairsPath) {
        if (chair.id === item.id) {
          result.push({
            ...chair,
            ...item,
          });
        }
      }
    }
    data.value = result;
    isLoading.value = false;
  }

  getChairDate();

  const firsFloorData = computed(() =>
    data.value.filter((item) => item.floor === 1)
  );
  const secondFloorData = computed(() =>
    data.value.filter((item) => item.floor === 2)
  );

  return { firsFloorData, secondFloorData, getChairDate,isLoading };
});
