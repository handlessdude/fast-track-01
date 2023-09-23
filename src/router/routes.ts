import { RouteRecordRaw } from 'vue-router';
import { RouteName } from 'src/router/route-name';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RouteName.RATE_CHARTS,
        component: () => import('pages/RatesOverTimePage.vue'),
      },
      {
        path: '/latest',
        name: RouteName.LATEST_RATES,
        component: () => import('pages/LatestRatesPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
