export type User = {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'customer' | 'manager' | 'admin';
    birthDate: Date;
  }