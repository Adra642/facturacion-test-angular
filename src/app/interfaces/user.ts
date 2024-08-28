export interface User {
  id: number;
  name: string;
  surname: string;
  telefono?:number;
  email: string;
  password?: string;
  role?: string;
  creationDate: Date;
  state: boolean;
  direccion?: string;
  RFC?: string;
}
