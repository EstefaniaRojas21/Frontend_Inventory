import { Routes } from '@angular/router';
import { INVENTORY_ROUTES } from './modules/inventory/inventory-routing-module';
import { SALES_ROUTES } from './modules/sales/sales-routing-module';
import { ORDERS_ROUTES } from './modules/orders/orders-routing-module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./modules/inventory/inventory-routing-module').then(m => m.INVENTORY_ROUTES)
  },
  {
    path: 'sales',
    children: SALES_ROUTES
  },
  {
    path: 'orders',
    children: ORDERS_ROUTES
  }
];
