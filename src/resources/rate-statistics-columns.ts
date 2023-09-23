import { ref } from 'vue';
import { Statistics } from 'src/models/math';

const rateStatisticsColumns = ref([
  {
    name: 'name',
    required: true,
    label: 'Currency',
    align: 'left',
    field: (row: { name: string } & Statistics) => row.name,
    sortable: true,
  },
  {
    name: 'max',
    required: true,
    label: 'Max',
    field: 'max',
    align: 'left',
  },
  {
    name: 'min',
    required: true,
    label: 'Min',
    field: 'min',
    align: 'left',
  },
  {
    name: 'mean',
    required: true,
    label: 'Mean',
    field: 'mean',
    align: 'left',
  },
  {
    name: 'std',
    required: true,
    label: 'Standard deviation',
    field: 'std',
    align: 'left',
  },
  {
    name: 'disp',
    required: true,
    label: 'Dispersion',
    field: 'disp',
    align: 'left',
  },
]);

export { rateStatisticsColumns };
