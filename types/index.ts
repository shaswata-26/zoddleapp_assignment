export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
}