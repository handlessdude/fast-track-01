<template>
  <q-page class="row items-center justify-evenly"> RateChartsPage </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { RatesSchemaOut } from 'src/models/currency';
import { MaybeNull } from 'src/models';
import { currencyRatesService } from 'src/services/currency-rates.service';

const data: Ref<MaybeNull<RatesSchemaOut>> = ref(null);
onMounted(() => {
  data.value = currencyRatesService.getItems();
});
</script>
