import { useState, ReactNode, useEffect, useCallback } from "react";
import CompanyContext, { CompanyType } from "@src/contexts/CompanyContext";
import { companiesService } from "@src/services";
import { useFocusEffect } from "@react-navigation/native";

const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);

      const response = await companiesService.get();
      console.log("RESPONSE COMPLETA:", JSON.stringify(response, null, 2));

      console.log(response);

      setCompany(response);
    } catch (error) {
      console.error(error);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ company, loading, fetchCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
