export interface User {
  id: number;
  code?: string;
  name: string;
  description?: string;
  price?: number;
  stock?:number; 
  category?:string;
  supplier?:string;
  surname?: string;
  telefono?:number;
  email?: string;
  password?: string;
  role?: string;
  creationDate?: Date;
  state?: boolean;
  direccion?: string;
  RFC?: string;
}
