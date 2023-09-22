<template>
  <q-page padding>
    <q-form @submit="refreshData" class="column q-gutter-y-md">
      <div class="column">
        <div class="text-h6">Currency pair</div>
        <div class="row q-gutter-x-lg">
          <q-select
            v-model="baseCurrency"
            label="Base currency"
            option-label="name"
            :options="currencies"
            class="col-2"
          />
          <q-select
            v-model="quoteCurrency"
            label="Quote currency"
            option-label="name"
            :options="currencies"
            multiple
            class="col-2"
          />
        </div>
      </div>
      <div class="row">
        <q-btn
          type="submit"
          label="Make request"
          class="col-2 no-padding"
          no-caps
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { RatesSchemaOut } from 'src/models/currency';
import { MaybeNull } from 'src/models';
import { currencyRatesService } from 'src/services/currency-rates.service';
import { useCurrencyTypesStore } from 'stores/example-store';
import { storeToRefs } from 'pinia';

const data: Ref<MaybeNull<RatesSchemaOut>> = ref(null);
const { items: currencies } = storeToRefs(useCurrencyTypesStore());

const baseCurrency = ref(currencies.value.find((item) => item.id === 'USD'));
const quoteCurrency = ref(currencies.value.find((item) => item.id === 'EUR'));

const refreshData = async () => {
  data.value = await currencyRatesService.getItems();
};

onMounted(refreshData);
</script>
