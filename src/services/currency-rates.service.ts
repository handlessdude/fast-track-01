import { HttpBasedService } from 'src/services/httb-based.service';
import { RatesQueryParams, RatesSchemaOut } from 'src/models/currency';
import { mapEntries, omitProperty, periodAdapter } from 'src/utils/adapters';

const BASE_PATH = '/';

const sanitizeParams = (params?: Partial<RatesQueryParams>) => {
  return (
    params &&
    mapEntries(omitProperty(params, 'period'), {
      valueMap: {
        to: (val: Array<string> | undefined) => val && val.join(','),
      },
    })
  );
};

class CurrencyRatesService extends HttpBasedService {
  async getItems(params?: Partial<RatesQueryParams>) {
    const res = await this.httpClient.get<RatesSchemaOut>(
      `${BASE_PATH}${periodAdapter(params?.period)}`,
      {
        params: sanitizeParams(params),
      }
    );
    return res.data;
  }
}

const currencyRatesService = new CurrencyRatesService();

export { currencyRatesService };
