import { useContext } from "react";
import { CompanyContext } from "@src/contexts";

export const useCompany = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompany deve ser usado dentro de CompanyProvider");
  }

  return context;
};
