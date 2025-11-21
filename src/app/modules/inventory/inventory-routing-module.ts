import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list';
import { ProductForm } from './components/product-form/product-form';
import { CATEGORIES_ROUTES } from './categories-routing-module';
import { SUPPLIER_ROUTES } from './supplier-routing-module';


export const INVENTORY_ROUTES: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'products/new', component: ProductForm},
  { path: 'products/edit/:id', component: ProductForm },
  {
    path: '',
    children: [
      { path: 'categories', children: CATEGORIES_ROUTES },
      { path: 'suppliers', children: SUPPLIER_ROUTES }
    ]
  }
];
