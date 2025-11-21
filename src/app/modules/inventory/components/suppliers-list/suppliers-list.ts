// suppliers-list.ts
import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.html',
})
export class SuppliersListComponent implements OnInit {
  suppliers: any[] = [];
  loading = false;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading = true;
    this.supplierService.getSuppliers().subscribe({
      next: data => { this.suppliers = data || []; this.loading = false; },
      error: err => { console.error("Error cargando proveedores:", err); this.loading = false; }
    });
  }

  goToCreate() {
    // Decide un path y úsalo coherentemente (aquí uso 'nuevo')
    this.router.navigate(['/inventory/proveedores/new']);
  }

  editSupplier(id: number) {
    this.router.navigate(['/inventory/proveedores/edit', id]);
  }

  deleteSupplier(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este proveedor?")) return;
    this.supplierService.deleteSupplier(id).subscribe({
      next: () => this.loadSuppliers(),
      error: err => console.error("Error eliminando proveedor:", err)
    });
  }
}
