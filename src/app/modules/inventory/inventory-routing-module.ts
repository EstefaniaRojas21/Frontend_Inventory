import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list';
import { ProductForm } from './components/product-form/product-form';

export const INVENTORY_ROUTES: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'products/new', component: ProductForm},
  { path: 'products/edit/:id', component: ProductForm }
];
