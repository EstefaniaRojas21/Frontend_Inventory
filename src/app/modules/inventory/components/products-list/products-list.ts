import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../../product.model';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];
  suppliers: any[] = [];

  loading = false;
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadSuppliers();
  }

  getCategoryName(categoryId?: number): string {
    if (!categoryId) return 'Sin categoría';
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Sin categoría';
  }

  getSupplierName(supplierId?: number): string {
    if (!supplierId) return 'Sin proveedor';
    const sup = this.suppliers.find(s => s.id === supplierId);
    return sup ? sup.name : 'Sin proveedor';
  }



  // ============================================================
  // Cargar productos y mapear quantity -> stock
  // ============================================================
  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        // Mapeo para stock
        this.products = data.map(p => ({
          ...p,
          stock: p.quantity // backend return "quantity"
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  // ============================================================
  // Cargar Categorías
  // ============================================================
  loadCategories() {
    this.http.get<any[]>('http://localhost:5000/api/categorias/')
      .subscribe({
        next: res => this.categories = res,
        error: err => console.error('Error loading categories:', err)
      });
  }

  // ============================================================
  // Cargar Proveedores
  // ============================================================
  loadSuppliers() {
    this.http.get<any[]>('http://localhost:5000/api/proveedores/')
      .subscribe({
        next: res => this.suppliers = res,
        error: err => console.error('Error loading suppliers:', err)
      });
  }

  // ============================================================
  // Filtro de búsqueda
  // ============================================================
  get filteredProducts(): Product[] {
    if (!this.searchTerm) return this.products;

    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ============================================================
  // Navegación
  // ============================================================
  editProduct(id?: number): void {
    if (id == null) return;
    this.router.navigate(['/inventory/products/edit', id]);
  }

  deleteProduct(id?: number): void {
    if (id == null) return;
    if (!confirm('¿Está seguro de eliminar este producto?')) return;

    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: (error) => {
        console.error('Error deleting product:', error);
        alert('Error al eliminar el producto');
      }
    });
  }

  newProduct(): void {
    this.router.navigate(['/inventory/products/new']);
  }
}
