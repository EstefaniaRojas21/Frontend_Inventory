import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../../product.model';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true, 
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editProduct(id?: number): void {
    if (id == null) return; // Evita pasar undefined
    this.router.navigate(['/inventory/products/edit', id]);
  }

  deleteProduct(id?: number): void {
    if (id == null) return;
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Error al eliminar el producto');
        }
      });
    }
  }


  newProduct(): void {
    this.router.navigate(['/inventory/products/new']);
  }
}