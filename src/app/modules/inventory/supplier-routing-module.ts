import { Routes } from '@angular/router';
import { SuppliersListComponent } from './components/suppliers-list/suppliers-list';
import { SupplierFormComponent } from './components/supplier-form/supplier-form';

export const SUPPLIER_ROUTES: Routes = [
{ path: '', component: SuppliersListComponent },
{ path: 'new', component: SupplierFormComponent },
{ path: 'edit/:id', component: SupplierFormComponent }
];