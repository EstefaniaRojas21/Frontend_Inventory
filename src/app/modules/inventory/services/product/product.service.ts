import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  // Obtener un producto por ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear producto
  create(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`, product);
  }

  // Actualizar producto
  update(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  // Eliminar producto
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
