import { Routes } from '@angular/router';
import { INVENTORY_ROUTES } from './modules/inventory/inventory-routing-module';
import { SALES_ROUTES } from './modules/sales/sales-routing-module';
import { PAYMENT_METHODS_ROUTES } from './modules/sales/payment-methods-routing';
import { ORDERS_ROUTES } from './modules/orders/orders-routing-module';
import { SALES_ITEMS_ROUTES } from './modules/sales/sale-items-routing-module';

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
    path: 'categorias',
    loadChildren: () =>
      import('./modules/inventory/categories-routing-module')
        .then(m => m.CATEGORIES_ROUTES)
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./modules/inventory/supplier-routing-module')
        .then(m => m.SUPPLIER_ROUTES)
  },
  {
    path: 'sales',
     loadChildren: () =>
      import('./modules/sales/sales-routing-module').then(m => m.SALES_ROUTES)
  },
  {
  path: 'payment',
  loadChildren: () =>
    import('./modules/sales/payment-methods-routing')
      .then(m => m.PAYMENT_METHODS_ROUTES)
},
 {
  path: 'salesItems',
  loadChildren: () =>
    import('./modules/sales/sale-items-routing-module')
      .then(m => m.SALES_ITEMS_ROUTES)
}

];
