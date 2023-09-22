import { HttpBasedService } from 'src/services/httb-based.service';

const BASE_PATH = '/currencies';

interface CurrenciesSchemaOut {
  [Key: string]: string;
}

export class CurrencyTypesService extends HttpBasedService {
  async getItems() {
    const res = await this.httpClient.get<CurrenciesSchemaOut>(BASE_PATH);
    return res.data;
  }
}
