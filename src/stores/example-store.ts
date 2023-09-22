import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { currencyTypesService } from 'src/services/currency-types.service';

interface GenericSchema {
  id: string;
  name: string;
}
export const useCurrencyTypesStore = defineStore('currency-types', () => {
  const items: Ref<Array<GenericSchema>> = ref([]);
  const itemsLoaded = ref(false);

  async function initState() {
    if (itemsLoaded.value) {
      return;
    }
    try {
      const data = await currencyTypesService.getItems();
      items.value = Object.entries(data).map(([id, name]) => ({ id, name }));
      itemsLoaded.value = true;
    } catch (err) {
      console.error(err);
    }
  }

  function dispose() {
    items.value = [];
    itemsLoaded.value = false;
  }

  return {
    items,
    itemsLoaded,
    initState,
    dispose,
  };
});
