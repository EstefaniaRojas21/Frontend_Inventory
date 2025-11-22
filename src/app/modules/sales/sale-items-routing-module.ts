import { Routes } from '@angular/router';
import { SalesListComponent } from './components/sale-item/sale-item';
import { SaleItemFormComponent } from './components/sales-item-form/sales-item-form'

export const SALES_ITEMS_ROUTES: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'new', component: SaleItemFormComponent },
  { path: 'edit/:id', component: SaleItemFormComponent }
];


