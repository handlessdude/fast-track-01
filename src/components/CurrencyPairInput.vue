<template>
  <div class="row items-start justify-start">
    <q-select
      v-model="baseCurrency"
      label="Base currency"
      option-label="name"
      :options="currencies"
      class="col"
      clearable
      outlined
      dense
      hide-bottom-space
    />
    <div
      class="text-grey-5 text-h6 q-py-xs q-mx-md row justify-center"
      style="width: 20px"
    >
      <div>/</div>
    </div>
    <q-select
      v-model="quoteCurrencies"
      label="Quote currencies"
      option-label="name"
      :options="currencies"
      class="col"
      multiple
      clearable
      outlined
      dense
      :option-disable="quoteOptionDisabled"
      hide-bottom-space
    />
  </div>
</template>

<script setup lang="ts">
import { GenericSchema, MaybeNull } from 'src/models';
import { makeVModelFromProps } from 'src/utils';
import { storeToRefs } from 'pinia';
import { useCurrencyTypesStore } from 'stores/currency-types.store';
import { WritableComputedRef } from 'vue';

interface CurrencyPairInputProps {
  baseCurrency: MaybeNull<GenericSchema>;
  quoteCurrencies: MaybeNull<Array<GenericSchema>>;
}

const props = defineProps<CurrencyPairInputProps>();
const emit = defineEmits(['update:baseCurrency', 'update:quoteCurrencies']);
const baseCurrency = makeVModelFromProps(
  'baseCurrency',
  props,
  emit
) as WritableComputedRef<GenericSchema>;
const quoteCurrencies = makeVModelFromProps(
  'quoteCurrencies',
  props,
  emit
) as WritableComputedRef<Array<GenericSchema>>;

const { items: currencies } = storeToRefs(useCurrencyTypesStore());

const quoteOptionDisabled = (option: GenericSchema) =>
  !!baseCurrency.value && baseCurrency.value.id === option.id;
</script>

<style scoped></style>
