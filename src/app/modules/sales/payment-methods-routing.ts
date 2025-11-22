import { Routes } from '@angular/router';
import { PaymentMethodsListComponent } from './components/payment-methods-list/payment-methods-list';
import { PaymentMethodFormComponent } from './components/payment-methods-form/payment-methods-form';

export const PAYMENT_METHODS_ROUTES: Routes = [
  { path: '', component: PaymentMethodsListComponent },
  { path: 'new', component: PaymentMethodFormComponent },
  { path: 'edit/:id', component: PaymentMethodFormComponent }
];
