import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SalesService } from '../../services/sales/sales.service';
import { PaymentMethodsService } from '../../services/payment-methods/payment-methods.service';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-list-form.html'
})
export class SaleFormComponent implements OnInit {

  form!: FormGroup;
  editing = false;
  id?: number;
  paymentMethods: any[] = [];

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private paymentMethodsService: PaymentMethodsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      customer_name: ['', Validators.required],
      customer_email: ['', Validators.required],
      total_amount: [0, Validators.required],
      payment_method_id: [null, Validators.required]
    });

    this.paymentMethodsService.getAll().subscribe(res => {
      this.paymentMethods = res;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.id = Number(idParam);

      this.salesService.getById(this.id).subscribe(sale => {
        this.form.patchValue(sale);
      });
    }
  }

  save() {
    const data = this.form.value;

    if (this.editing && this.id) {
      this.salesService.update(this.id, data).subscribe(() => {
        alert("Venta actualizada");
        this.router.navigate(['/sales']);
      });
    } else {
      this.salesService.create(data).subscribe(() => {
        alert("Venta registrada");
        this.router.navigate(['/sales']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/sales']);
  }
}
