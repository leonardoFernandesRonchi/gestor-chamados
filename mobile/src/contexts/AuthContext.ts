import { createContext } from "react";

type Department = {
  name: string;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string | null;
  phone: string;
  status: "owner" | "admin" | "manager" | "user";
  company_id: string;
  department_id: string;
  createdAt: string;
  updatedAt: string;

  company: {
    id: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    dominio_customizado: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    totalUsers: string;
    departments: Department[];
  };

  department: {
    id: string;
    name: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  };
};

type AuthContextType = {
  user: UserType | null;
  login: () => void;
  loading?: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
