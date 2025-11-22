import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleItemsService } from '../../services/sale-items/sale-items.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface SaleItemForm {
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

@Component({
  selector: 'app-sale-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sales-item-form.html'
})
export class SaleItemFormComponent implements OnInit {

  form: SaleItemForm = {
    sale_id: 0,
    product_id: 0,
    quantity: 1,
    unit_price: 0,
    subtotal: 0
  };

  itemId?: number;

  constructor(
    private saleItemsService: SaleItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Tomar sale_id desde la ruta
    const saleIdParam = this.route.snapshot.paramMap.get('saleId');
    if (saleIdParam) this.form.sale_id = Number(saleIdParam);

    // Cargar item si viene itemId en ruta (editar)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.itemId = Number(idParam);
      this.saleItemsService.getById(this.itemId).subscribe((item: any) => {
        this.form = {
          sale_id: item.sale_id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal
        };
      });
    }
  }

  // Calcula subtotal cada vez que cambia quantity o unit_price
  updateSubtotal() {
    this.form.subtotal = this.form.quantity * this.form.unit_price;
  }

  save() {
    this.updateSubtotal();

    if (this.itemId) {
      this.saleItemsService.update(this.itemId, this.form).subscribe({
        next: () => {
          alert("Item actualizado");
          this.router.navigate(['/sales']);
        },
        error: () => alert("Error al actualizar el item")
      });
    } else {
      this.saleItemsService.create(this.form).subscribe({
        next: () => {
          alert("Item agregado");
          this.router.navigate(['/sales']);
        },
        error: () => alert("Error al agregar el item")
      });
    }
  }

  cancel() {
    this.router.navigate(['/sales']);
  }
}
