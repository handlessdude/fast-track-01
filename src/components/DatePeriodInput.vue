<template>
  <div class="row no-wrap">
    <q-input
      v-model="firstDate"
      outlined
      dense
      :mask="DATE_INPUT_MASK"
      class="margin-right-generic left__input"
      :rules="validationRules"
      label="From"
      hide-bottom-space
    >
      <template v-slot:append>
        <q-icon name="app:calendar" class="cursor-pointer not-active-icon">
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
    <q-input
      ref="lastDateRef"
      v-model="lastDate"
      outlined
      dense
      :mask="DATE_INPUT_MASK"
      class="right__input"
      label="To"
      hide-bottom-space
      :rules="lastDateValidationRules"
    >
      <template v-slot:append>
        <q-icon name="app:calendar" class="cursor-pointer not-active-icon">
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
import { MaybeNull } from 'src/models';
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

interface Period {
  to: MaybeNull<string>;
  from: MaybeNull<string>;
}

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
  if (newVal) {
    const crossBrowserFormat = extractFormattedDate(newVal);
    const [dateWithoutTimezone] = new Date(crossBrowserFormat)
      .toISOString()
      .split('.');
    modelValue.value.from = dateWithoutTimezone;
  }
  lastDateRef.value?.validate();
});

watch(lastDate, (newVal) => {
  if (newVal) {
    const crossBrowserFormat = extractFormattedDate(newVal);
    const [dateWithoutTimezone] = new Date(crossBrowserFormat)
      .toISOString()
      .split('.');
    modelValue.value.to = dateWithoutTimezone;
  }
});

const isValidDate = (value: string) =>
  dayjs(value, Q_DATE_MASK, true).isValid() || 'Date is invalid';
const isNotEmptyField = <T>(value: T) =>
  !!value || t('validationRules.required');

const getTimestamp = (d: string, mask = Q_DATE_MASK) =>
  date.extractDate(d, mask).getTime() / 1000;

const lastDateValidationRules: ValidationRule[] = [
  (val) => !val || isValidDate(val) || t('validationRules.invalidDate'),
  (val) =>
    !val ||
    (firstDate.value && getTimestamp(firstDate.value) < getTimestamp(val)) ||
    t('inputs.period.endDate.rules.laterThanStart'),
];

const validationRules = [isValidDate, isNotEmptyField];
</script>

<style scoped></style>
