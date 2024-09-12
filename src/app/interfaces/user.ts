import { Role } from './role';

export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: {
    id: number;
  };
  state: boolean;
}
