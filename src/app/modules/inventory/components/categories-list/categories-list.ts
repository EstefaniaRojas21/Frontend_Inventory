import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-list.html'
})
export class CategoriesListComponent implements OnInit {

  categories: any[] = [];
  loading = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.loading = false;
      }
    });
  }

  newCategory() {
    this.router.navigate(['/categorias/new']);
  }

  editCategory(id?: number): void {
    if (!id) return;
    this.router.navigate(['/inventory/categorias/edit', id]);
  }

  deleteCategory(id?: number): void {
    if (!id) return;
    if (!confirm('¿Estás segur@ de eliminar esta categoría?')) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => {
        console.error('Error al eliminar categoría:', err);
        alert('Error al eliminar categoría');
      }
    });
  }
}
