<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="refreshData">
      <q-btn type="submit" label="Make request" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { RatesSchemaOut } from 'src/models/currency';
import { MaybeNull } from 'src/models';
import { currencyRatesService } from 'src/services/currency-rates.service';

const data: Ref<MaybeNull<RatesSchemaOut>> = ref(null);

const refreshData = async () => {
  data.value = await currencyRatesService.getItems();
};

onMounted(refreshData);
</script>
