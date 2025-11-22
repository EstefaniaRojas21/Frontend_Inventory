import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SaleItemsService } from '../../services/sale-items/sale-items.service';
import { PaymentMethodsService } from '../../services/payment-methods/payment-methods.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sale-item.html'
})

export class SalesListComponent implements OnInit {

  sales: any[] = [];
  paymentMethods: any[] = [];
  loading = false;
  error = '';
  query = '';
  page = 1;
  pageSize = 10;

  constructor(
    private salesService: SaleItemsService,
    private pmService: PaymentMethodsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    forkJoin({
      methods: this.pmService.getAll(),
      sales: this.salesService.getAll()
    }).subscribe({
      next: ({ methods, sales }) => {
        this.paymentMethods = methods || [];
        this.sales = (sales || []).map(s => ({
          ...s,
          payment_method: this.paymentMethods.find(m => Number(m.id) === Number(s.payment_method_id)) || null
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error cargando ventas o métodos de pago.';
        this.loading = false;
      }
    });
  }

  filteredSales() {
    const q = this.query?.trim().toLowerCase() || '';
    return q
      ? this.sales.filter(s =>
          String(s.id).includes(q) ||
          (s.customer_name && s.customer_name.toLowerCase().includes(q)) ||
          (s.customer_email && s.customer_email.toLowerCase().includes(q)) ||
          (s.payment_method?.name && s.payment_method.name.toLowerCase().includes(q))
        )
      : this.sales;
  }

  newSale() {
    this.router.navigate(['/sales/new']);
  }

  edit(id: number) {
    this.router.navigate(['/sales/edit', id]);
  }

  delete(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta venta?')) return;
    this.salesService.delete(id).subscribe(() => this.sales = this.sales.filter(s => s.id !== id));
  }
}
