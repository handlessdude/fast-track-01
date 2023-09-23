<template>
  <q-page padding class="q-gutter-y-md">
    <q-form class="column">
      <div class="text-h6 q-mb-md">Currency pair</div>
      <CurrencyPairInput
        v-model:base-currency="baseCurrency"
        v-model:quote-currencies="quoteCurrencies"
      />
      <div class="text-h6 q-mt-lg q-mb-md">Time period</div>
      <DatePeriodInput
        v-model="period"
        class="row items-start justify-start full-width col"
      />
    </q-form>
    <div v-if="ratesLoading" class="preloader__container row justify-center">
      <q-circular-progress
        indeterminate
        size="90px"
        :thickness="0.2"
        color="pink"
        track-color="transparent"
        class="q-ma-md"
      />
    </div>
    <div
      v-else-if="
        lineData && baseCurrency && quoteCurrencies && quoteCurrencies.length
      "
      class="full-width row full-width q-mt-lg"
    >
      <Line :data="lineData" :options="options" />
      <q-table
        title="Statistics"
        :rows="statistics"
        :columns="rateStatisticsColumns"
        row-key="name"
        flat
        class="full-width q-mt-md"
      />
    </div>
    <NoDataPlaceholder v-else class="q-mt-xl" />
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { currencyRatesService } from 'src/services/currency-rates.service';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { RatesSchemaOut } from 'src/models/currency';
import { GenericSchema, MaybeNull, Period } from 'src/models';
import { useQuasar } from 'quasar';
import { ChartData } from 'src/models/bar-chart';
import { stringToColour } from 'src/utils';
import DatePeriodInput from 'components/DatePeriodInput.vue';
import CurrencyPairInput from 'components/CurrencyPairInput.vue';
import { rateStatisticsColumns } from 'src/resources/rate-statistics-columns';
import { Statistics } from 'src/models/math';
import { describe } from 'src/utils/math';
import NoDataPlaceholder from 'components/NoDataPlaceholder.vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const baseCurrency: Ref<MaybeNull<GenericSchema>> = ref(null);
const quoteCurrencies: Ref<MaybeNull<Array<GenericSchema>>> = ref([]);

const lineData: Ref<MaybeNull<ChartData>> = ref(null);
const options = { responsive: true };

const period: Ref<Period> = ref({});
const statistics: Ref<Array<{ name: string } & Statistics>> = ref([]);

const ratesSchemaToChart = (schema: RatesSchemaOut) => {
  const labels = Object.keys(schema.rates);
  return {
    labels,
    datasets: quoteCurrencies.value
      ?.map((item) => item.id)
      .map((currencyCode) => ({
        label: currencyCode,
        backgroundColor: stringToColour(currencyCode),
        data: Object.values(schema.rates).map((entry) => entry[currencyCode]),
      })),
  };
};

const ratesLoading = ref(false);
const $q = useQuasar();

watch(
  [baseCurrency, quoteCurrencies, period],
  async ([newBase, newQuotes, newPeriod]) => {
    if (!newBase || !newQuotes || !newQuotes.length || !newPeriod.from) {
      return;
    }
    try {
      ratesLoading.value = true;
      console.log(period.value);
      const newVal = await currencyRatesService.getItems({
        period: period.value,
        from: newBase.id,
        to: newQuotes.map((item) => item.id),
      });
      lineData.value = ratesSchemaToChart(newVal);
      statistics.value = lineData.value.datasets.map((ds) => ({
        name: ds.label,
        ...describe(ds.data),
      }));
      console.log(newVal);
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: 'Error loading rates',
      });
    } finally {
      ratesLoading.value = false;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss">
.q-table__title {
  font-weight: 500;
}

.q-table__top {
  padding-left: 0;
  padding-right: 0;
}
</style>
