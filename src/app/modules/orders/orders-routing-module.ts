import { Routes } from '@angular/router';
import { OrdersList } from './components/orders-list/orders-list';
import { OrderForm} from './components/order-form/order-form';

export const ORDERS_ROUTES: Routes = [
  { path: '', component: OrdersList },
  { path: 'new', component: OrderForm },
  { path: 'edit/:id', component: OrderForm}
];


