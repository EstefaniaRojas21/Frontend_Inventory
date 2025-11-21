import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html'
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.editing = true;
      this.categoryService.getById(this.id).subscribe({
        next: (cat) => this.form.patchValue({ name: cat.name, description: cat.description }),
        error: (err) => console.error('Error cargando categoría:', err)
      });
    }
  }

  loadCategory() {
    this.categoryService.getById(this.id!).subscribe({
      next: (cat) => this.form.patchValue(cat),
      error: () => alert('No se pudo cargar la categoría')
    });
  }

  save(): void {
    const payload = this.form.value;
    if (this.editing && this.id) {
      this.categoryService.updateCategory(this.id, payload).subscribe({
        next: () => {
          alert('Categoría actualizada');
          this.router.navigate(['/inventory/categorias']);
        },
        error: (err) => {
          console.error('Error actualizando:', err);
          alert('Error al actualizar categoría');
        }
      });
    } else {
      this.categoryService.createCategory(payload).subscribe({
        next: () => {
          alert('Categoría creada');
          this.router.navigate(['/inventory/categorias']);
        },
        error: (err) => {
          console.error('Error creando:', err);
          alert('Error al crear categoría');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/categorias']);
  }
}
