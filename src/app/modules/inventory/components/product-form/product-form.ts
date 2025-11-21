import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Product } from '../../../product.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductForm implements OnInit {
  
  form!: FormGroup;
  id?: number;
  isEdit = false;

  categories: any[] = [];
  suppliers: any[] = [];

  private baseUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Crear formulario
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category_id: [null, Validators.required],
      supplier_id: [null, Validators.required]
    });

    // Cargar categorías y proveedores
    this.loadCategories();
    this.loadSuppliers();

    // Modo edición
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.productService.getById(this.id).subscribe({
        next: (product) => this.form.patchValue(product),
        error: (err) => console.error('Error al cargar producto:', err)
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }


  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers = data,
      error: (err) => console.error('Error cargando proveedores:', err)
    });
  }

  save(): void {
    const product = this.form.value as Product;

    if (this.isEdit && this.id) {
      this.productService.update(this.id, product).subscribe({
        next: () => {
          alert('Producto actualizado con éxito');
          this.router.navigate(['/inventory']);
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.router.navigate(['/inventory']);
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }
}
