import { computed, ref } from "vue";
import { chairsPathFloor1_1 } from "./svgPath";
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
  const data = ref(chairsPathFloor1_1);

  async function getChairDate() {
    const res = await fetch("https://json-server-crfx.onrender.com/data").then(
      (res) => res.json()
    );

    // data.value = chairsPathFloor1_1;
    const result = [];
    for (const item of res) {
      for (const chair of chairsPathFloor1_1) {
        if (chair.id === item.id) {
          result.push({
            ...chair,
            ...item,
          });
        }
      }
    }
    data.value = result;
  }

  getChairDate();

  const firsFloorData = computed(() =>
    data.value.filter((item) => item.floor === 1)
  );
  const secondFloorData = computed(() =>
    data.value.filter((item) => item.floor === 2)
  );

  return { firsFloorData, secondFloorData, getChairDate };
});
