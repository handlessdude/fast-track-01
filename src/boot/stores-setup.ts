import { boot } from 'quasar/wrappers';
import { useCurrencyTypesStore } from 'stores/example-store';

export default boot(async ({}) => {
  const currencyTypesStore = useCurrencyTypesStore();
  return currencyTypesStore.initState();
});
