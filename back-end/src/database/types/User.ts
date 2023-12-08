export type User = {
  id?: number;
  name: string;
  username?: string;
  email: string;
  password: string;
  role?: 'customer' | 'manager' | 'admin';
  birthDate: Date;
}

export type EditableUser = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
}