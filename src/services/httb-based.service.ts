import { AxiosInstance } from 'axios';

export class HttpBasedService {
  httpClient: AxiosInstance;

  protected constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
}
