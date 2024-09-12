export interface Product {
  id?: number;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    id: number;
  };
  supplier: {
    id: number;
  };
}
