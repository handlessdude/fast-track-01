<template>
  <q-page padding class="q-gutter-y-md">
    <q-form class="column">
      <div class="text-h6 q-mb-md">Currency pair</div>
      <CurrencyPairInput
        v-model:base-currency="baseCurrency"
        v-model:quote-currencies="quoteCurrencies"
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
        barData && baseCurrency && quoteCurrencies && quoteCurrencies.length
      "
      class="full-width row full-width"
    >
      <div class="column col-6">
        <div class="text-h6 q-mb-md">Bar chart</div>
        <Bar :data="barData" :options="barOptions" />
      </div>
      <div class="column col-6">
        <div class="text-h6 q-mb-md">Pie chart</div>
        <Pie :data="pieData" :options="pieOptions" />
      </div>
    </div>
    <div v-else class="placeholder__container row justify-center q-mt-xl">
      <div class="text-h6 text-grey-5">
        <q-icon name="stacked_line_chart" />
        Pick currencies to form chart...
      </div>
    </div>
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
} from 'chart.js';
import { Bar, Pie } from 'vue-chartjs';
import { RatesSchemaOut } from 'src/models/currency';
import { GenericSchema, MaybeNull } from 'src/models';
import { useQuasar } from 'quasar';
import { ChartData } from 'src/models/bar-chart';
import { stringToColour } from 'src/utils';
import CurrencyPairInput from 'components/CurrencyPairInput.vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const baseCurrency: Ref<MaybeNull<GenericSchema>> = ref(null);
const quoteCurrencies: Ref<MaybeNull<Array<GenericSchema>>> = ref([]);

const barData: Ref<MaybeNull<ChartData>> = ref(null);
const pieData: Ref<MaybeNull<ChartData>> = ref(null);
const barOptions = { responsive: true };

const pieOptions = {
  responsive: true,
};

const ratesSchemaToChart = (schema: RatesSchemaOut) => {
  const labels = Object.keys(schema.rates);
  return {
    labels,
    datasets: [
      {
        label: `Rates for ${schema.date}`,
        backgroundColor: labels.map((label) => stringToColour(label)),
        data: Object.values(schema.rates),
      },
    ],
  };
};

const ratesLoading = ref(false);
const $q = useQuasar();
watch(
  [baseCurrency, quoteCurrencies],
  async ([newBase, newQuotes]) => {
    if (!newBase || !newQuotes || !newQuotes.length) {
      return;
    }
    try {
      ratesLoading.value = true;
      const newVal = await currencyRatesService.getItems({
        from: newBase.id,
        to: newQuotes.map((item) => item.id),
      });
      const chartData = ratesSchemaToChart(newVal);
      barData.value = chartData;
      pieData.value = chartData;
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
  }
);
</script>
