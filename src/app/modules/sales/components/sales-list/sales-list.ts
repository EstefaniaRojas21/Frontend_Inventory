import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { SalesService } from '../../services/sales/sales.service';
import { PaymentMethodsService } from '../../services/payment-methods/payment-methods.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sales-list.html'
})
export class SalesListComponent implements OnInit {

  sales: any[] = [];
  paymentMethods: any[] = [];
  loading = false;
  error = '';

  query = '';
  page = 1;
  pageSize = 10;

  // Modal de confirmación
  showConfirm = false;
  toDeleteId?: number;
  deleting = false;

  constructor(
    private salesService: SalesService,
    private pmService: PaymentMethodsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.error = '';

    forkJoin({
      methods: this.pmService.getAll(),
      sales: this.salesService.getAll()
    }).subscribe({
      next: ({ methods, sales }) => {
        this.paymentMethods = methods || [];
        const rawSales = sales || [];

        this.sales = rawSales.map(s => {
          const pmId = s.payment_method_id ?? s.paymentMethodId ?? s.paymentMethod?.id;
          const pm = this.paymentMethods.find(m => Number(m.id) === Number(pmId)) || null;
          return { ...s, payment_method: pm };
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error cargando ventas o métodos de pago.';
        this.loading = false;
      }
    });
  }

  // Navegación
  newSale() { this.router.navigate(['/sales/new']); }
  edit(id: number) { this.router.navigate(['/sales/edit', id]); }

  // Eliminar con confirmación
  confirmDelete(id: number) {
    this.toDeleteId = id;
    this.showConfirm = true;
  }

  cancelConfirm() {
    this.showConfirm = false;
    this.toDeleteId = undefined;
  }

  doDelete() {
    if (!this.toDeleteId) return;
    this.deleting = true;

    this.salesService.delete(this.toDeleteId).subscribe({
      next: () => {
        this.sales = this.sales.filter(s => s.id !== this.toDeleteId);
        this.cancelConfirm();
        this.deleting = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error eliminando la venta');
        this.deleting = false;
      }
    });
  }

  // Filtrado y paginación
  applyFilter() {
    this.page = 1; // resetear página al filtrar
  }

  get filteredSales() {
    const q = this.query?.trim().toLowerCase() || '';
    const list = q
      ? this.sales.filter(s =>
          String(s.id).includes(q) ||
          (s.customer_name?.toLowerCase().includes(q)) ||
          (s.customer_email?.toLowerCase().includes(q)) ||
          (s.payment_method?.name?.toLowerCase().includes(q))
        )
      : this.sales;
    return list;
  }

  get totalPages() {
    return Math.ceil(this.filteredSales.length / this.pageSize);
  }

  pageItems() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredSales.slice(start, start + this.pageSize);
  }

  prevPage() { if (this.page > 1) this.page--; }
  nextPage() { if (this.page < this.totalPages) this.page++; }
  goToPage(p: number) { this.page = p; }
}
