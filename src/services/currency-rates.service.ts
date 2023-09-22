import { HttpBasedService } from 'src/services/httb-based.service';
import { RatesQueryParams, RatesSchemaOut } from 'src/models/currency';
import { omitProperty, periodAdapter } from 'src/utils/adapters';

const BASE_PATH = '/';

export class CurrencyTypesService extends HttpBasedService {
  async getItems(params: Partial<RatesQueryParams>) {
    const res = await this.httpClient.get<RatesSchemaOut>(
      `${BASE_PATH}${periodAdapter(params.period)}`,
      {
        params: omitProperty(params, 'period'),
      }
    );
    return res.data;
  }
}
