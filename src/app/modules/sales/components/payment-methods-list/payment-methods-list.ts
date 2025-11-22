import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentMethodsService } from '../../services/payment-methods/payment-methods.service';

@Component({
  selector: 'app-payment-methods-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-methods-list.html'
})
export class PaymentMethodsListComponent implements OnInit {

  methods: any[] = [];
  loading = true;

  constructor(
    private service: PaymentMethodsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe(res => {
      this.methods = res;
      this.loading = false;
    });
  }

  goToCreate() {
    this.router.navigate(['/payment/new']);
  }

  editMethod(id: number) {
    this.router.navigate(['/payment/edit', id]);
  }

  deleteMethod(id: number) {
    if (confirm('¿Eliminar método de pago?')) {
      this.service.delete(id).subscribe(() => this.loadData());
    }
  }
}
