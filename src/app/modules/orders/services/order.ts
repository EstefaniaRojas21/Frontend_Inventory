import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api';

export interface Order {
  id?: number;
  customer_name: string;
  order_date: string;
  status: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private endpoint = 'orders'; // <- endpoint Flask correspondiente

  constructor(private api: ApiService) {}

  getAll(): Observable<Order[]> {
    return this.api.get<Order[]>(`${this.endpoint}/`);
  }

  getById(id: number): Observable<Order> {
    return this.api.get<Order>(`${this.endpoint}/${id}/`);
  }

  create(order: Order): Observable<Order> {
    return this.api.post<Order>(`${this.endpoint}/`, order);
  }

  update(id: number, order: Order): Observable<Order> {
    return this.api.put<Order>(`${this.endpoint}/${id}/`, order);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}/`);
  }
}
