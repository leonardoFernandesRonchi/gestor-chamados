import { createContext } from "react";

type DepartmentType = {
  name: string;
};

type CompanySettingsType = {
  id: string;
  company_id: string;
  logo_url: string | null;
  favicon_url: string | null;
  cor_primaria: string;
  cor_secundaria: string;
};

type UserType = {
  id: string;
  name: string;
  avatar_url: string | null;
  phone: string;
  email: string;
  status: string;
  department_id: string;
};

export type CompanyType = {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  dominio_customizado: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  departments: DepartmentType[];
  company_settings: CompanySettingsType;
  users: { data: UserType[] };
};

type CompanyContextType = {
  company: CompanyType | null;
  loading: boolean;
  fetchCompany: () => Promise<void>;
};

const CompanyContext = createContext<any | null>(null);

export default CompanyContext;
