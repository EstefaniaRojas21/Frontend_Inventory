import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService, Sale } from '../../services/sale';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sale-form.html',
  styleUrls: ['./sale-form.scss']
})
export class SaleFormComponent implements OnInit {
  form!: FormGroup;
  saleId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });

    this.saleId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.saleId) {
      this.loadSale();
    }
  }

  loadSale(): void {
    this.loading = true;
    this.saleService.getById(this.saleId!).subscribe({
      next: (sale) => {
        this.form.patchValue(sale);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sale:', error);
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const sale: Sale = this.form.value;
    const request = this.saleId
      ? this.saleService.update(this.saleId, sale)
      : this.saleService.create(sale);

    request.subscribe({
      next: () => this.router.navigate(['/sales']),
      error: (error) => {
        console.error('Error saving sale:', error);
        alert('Error al guardar la venta');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/sales']);
  }
}
