import { HttpBasedService } from 'src/services/httb-based.service';
import { RatesQueryParams, RatesSchemaOut } from 'src/models/currency';
import { omitProperty, periodAdapter } from 'src/utils/adapters';

const BASE_PATH = '/';

class CurrencyRatesService extends HttpBasedService {
  async getItems(params?: Partial<RatesQueryParams>) {
    const sanitizedParams = params && omitProperty(params, 'period');
    const res = await this.httpClient.get<RatesSchemaOut>(
      `${BASE_PATH}${periodAdapter(params?.period)}`,
      {
        params: sanitizedParams,
      }
    );
    return res.data;
  }
}

const currencyRatesService = new CurrencyRatesService();

export { currencyRatesService };
