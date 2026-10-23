import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "@src/navigation/AppRoutes";
import AuthProvider from "@src/providers/AuthProvider";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}
