import { Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories-list/categories-list';
import { CategoryFormComponent } from './components/category-form/category-form';

export const CATEGORIES_ROUTES: Routes = [
  { path: '', component: CategoriesListComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: 'edit/:id', component: CategoryFormComponent }
];
