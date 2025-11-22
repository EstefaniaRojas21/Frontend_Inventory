import { Routes } from '@angular/router';
import { SalesListComponent } from './components/sales-list/sales-list';
import { SaleFormComponent } from './components/sales-list-form/sales-list-form';

export const SALES_ROUTES: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'new', component: SaleFormComponent },
  { path: 'edit/:id', component: SaleFormComponent }
];
