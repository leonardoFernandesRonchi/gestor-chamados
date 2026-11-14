import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "@src/navigation/AppRoutes";
import AuthProvider from "@src/providers/AuthProvider";
import CompanyProvider from "@src/providers/CompanyProvider";

export default function App() {
  return (
    <NavigationContainer>
      <CompanyProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CompanyProvider>
    </NavigationContainer>
  );
}
