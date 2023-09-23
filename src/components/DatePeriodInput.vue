<template>
  <div class="row no-wrap justify-start full-width">
    <q-input
      v-model="firstDate"
      outlined
      dense
      :mask="DATE_INPUT_MASK"
      :rules="validationRules"
      label="From"
      hide-bottom-space
      class="col"
    >
      <template v-slot:append>
        <q-icon name="calendar_month" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="firstDate" :mask="Q_DATE_MASK">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-icon
      color="grey-5"
      class="text-h6 q-py-sm q-mx-md"
      name="arrow_forward"
    />
    <q-input
      ref="lastDateRef"
      v-model="lastDate"
      outlined
      dense
      :mask="DATE_INPUT_MASK"
      label="To"
      hide-bottom-space
      :rules="lastDateValidationRules"
      class="col"
    >
      <template v-slot:append>
        <q-icon name="calendar_month" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="lastDate" :mask="Q_DATE_MASK">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QInput, ValidationRule } from 'quasar';
import { date } from 'quasar';
import { MaybeNull, Period } from 'src/models';
import { makeVModelFromProps } from 'src/utils';
import dayjs from 'dayjs';

const DATE_INPUT_MASK = '####-##-##';

const Q_DATE_MASK = 'YYYY-MM-DD';

const getFormattedDate = (dateString: Date | null | undefined | string) => {
  if (dateString) {
    return date.formatDate(dateString, Q_DATE_MASK);
  }
  return '';
};

const extractFormattedDate = (dateString: string) => {
  const dateValue = date.extractDate(dateString, Q_DATE_MASK);
  if (dateValue) {
    return date.formatDate(dateValue, Q_DATE_MASK);
  }
  return '';
};

interface PeriodDateInterface {
  modelValue: Period;
}

const props = defineProps<PeriodDateInterface>();
const emit = defineEmits(['update:modelValue']);

const modelValue = makeVModelFromProps('modelValue', props, emit);

const lastDateRef = ref<MaybeNull<QInput>>(null);

const firstDate = ref(getFormattedDate(modelValue.value.from));
const lastDate = ref(getFormattedDate(modelValue.value.to));

watch(firstDate, (newVal) => {
  modelValue.value.from = newVal;
  lastDateRef.value?.validate();
});

watch(lastDate, (newVal) => {
  modelValue.value.to = newVal;
});

const isValidDate = (value: string) =>
  dayjs(value, Q_DATE_MASK, true).isValid() || 'Date is invalid';
const isNotEmptyField = <T>(value: T) => !!value || 'Field required';

const getTimestamp = (d: string, mask = Q_DATE_MASK) =>
  date.extractDate(d, mask).getTime() / 1000;

const lastDateValidationRules: ValidationRule[] = [
  (val) => !val || isValidDate(val) || 'Invalid date',
  (val) =>
    !val ||
    (firstDate.value && getTimestamp(firstDate.value) < getTimestamp(val)) ||
    'End date is before the start date',
];

const validationRules = [isValidDate, isNotEmptyField];
</script>

<style scoped></style>
