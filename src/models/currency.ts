import { Period } from 'src/models/index';

interface RatesQueryParams {
  from: string;
  to: Array<string>;
  period: Period;
  amount: number;
}

interface RatesSchemaOut {
  amount: number;
  base: string;
  start_date?: string;
  end_date?: string;
  date?: string;
}

export type { RatesSchemaOut, RatesQueryParams };
