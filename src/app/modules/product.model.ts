export interface Product {
  id?: number;
  name: string;
  code?: string;
  price: number;
  stock: number;
  categoryId?: number;
  supplierId?: number;
  description?: string;
  imageUrl?: string;
}
