import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.inventoryApi}/api/categories`;

  constructor(private http: HttpClient) {}

  // ⭐ Obtener todas las categorías
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // ⭐ Obtener una categoría por ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // ⭐ Crear categoría
  createCategory(payload: { name: string; description?: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  // ⭐ Actualizar categoría
  updateCategory(id: number, payload: { name: string; description?: string }) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
