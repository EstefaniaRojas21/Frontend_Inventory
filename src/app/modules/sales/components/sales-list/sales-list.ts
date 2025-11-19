import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService, Sale } from '../../services/sale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-list.html',
  styleUrls: ['./sales-list.scss']
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  loading = false;

  constructor(
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.loading = true;
    this.saleService.getAll().subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sales:', error);
        this.loading = false;
      }
    });
  }

  newSale(): void {
    this.router.navigate(['/sales/new']);
  }

  editSale(id: number): void {
    this.router.navigate(['/sales/edit', id]);
  }

  deleteSale(id: number): void {
    if (confirm('¿Está seguro de eliminar esta venta?')) {
      this.saleService.delete(id).subscribe({
        next: () => this.loadSales(),
        error: (error) => {
          console.error('Error deleting sale:', error);
          alert('Error al eliminar la venta');
        }
      });
    }
  }
}
