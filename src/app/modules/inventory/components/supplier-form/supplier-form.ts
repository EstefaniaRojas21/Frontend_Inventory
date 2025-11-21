// supplier-form.ts
import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.html'
})
export class SupplierFormComponent implements OnInit {
  id!: number | null;
  supplier: any = { name: '', contact: '', phone: '', email: '' };
  saving = false;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || null;
    if (this.id) {
      this.supplierService.getSupplierById(this.id).subscribe({
        next: data => this.supplier = data,
        error: err => console.error('Error cargando proveedor:', err)
      });
    }
  }

  save() {
    this.saving = true;
    if (this.id) {
      this.supplierService.updateSupplier(this.id, this.supplier).subscribe({
        next: () => { this.saving = false; this.router.navigate(['/inventory/proveedores']); },
        error: err => { this.saving = false; console.error('Error actualizando:', err); }
      });
    } else {
      this.supplierService.createSupplier(this.supplier).subscribe({
        next: () => { this.saving = false; this.router.navigate(['/inventory/proveedores']); },
        error: err => { this.saving = false; console.error('Error creando:', err); }
      });
    }
  }
}
