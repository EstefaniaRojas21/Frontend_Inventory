// supplier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private baseUrl = `${environment.apiUrl}/api/suppliers`; // <-- exactamente así

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getSupplierById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createSupplier(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/`, payload);
  }

  updateSupplier(id: number, payload: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
  }

  deleteSupplier(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
