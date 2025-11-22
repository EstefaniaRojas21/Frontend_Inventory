import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentMethodsService } from '../../services/payment-methods/payment-methods.service';

@Component({
  selector: 'app-payment-method-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-methods-form.html'
})
export class PaymentMethodFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private service: PaymentMethodsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.id = Number(param);
      this.editing = true;

      this.service.getById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const data = this.form.value;

    if (this.editing) {
      this.service.update(this.id!, data).subscribe(() => {
        alert('Método actualizado');
        this.router.navigate(['/payment']);
      });
    } else {
      this.service.create(data).subscribe(() => {
        alert('Método creado');
        this.router.navigate(['/payment']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/payment']);
  }
}
