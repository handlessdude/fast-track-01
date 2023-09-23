interface BarChartData {
  labels: Array<string>;
  datasets: Array<{
    label: string;
    data: Array<number>;
  }>;
}

export type { BarChartData };
