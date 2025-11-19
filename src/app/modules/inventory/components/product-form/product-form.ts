import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
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
  private baseUrl = environment.apiUrl;
  form!: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.productService.getById(this.id).subscribe({
        next: (product) => this.form.patchValue(product),
        error: (err) => console.error('Error al cargar producto:', err)
      });
    }
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

