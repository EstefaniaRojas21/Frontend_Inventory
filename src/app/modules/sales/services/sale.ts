import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api';
import { environment } from '../../../../environments/environment';

export interface Sale {
  id?: number;
  customerName: string;
  total: number;
  date: string;
  payment_method: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private endpoint = `sales`;

  constructor(private api: ApiService) {}

  getAll(): Observable<Sale[]> {
    return this.api.get<Sale[]>(this.endpoint);
  }

  getById(id: number): Observable<Sale> {
    return this.api.get<Sale>(`${this.endpoint}/${id}`);
  }

  create(sale: Sale): Observable<Sale> {
    return this.api.post<Sale>(this.endpoint, sale);
  }

  update(id: number, sale: Sale): Observable<Sale> {
    return this.api.put<Sale>(`${this.endpoint}/${id}`, sale);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
