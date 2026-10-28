import { useState, ReactNode, useEffect, useCallback } from "react";
import { AuthContext } from "@src/contexts";
import { usersService } from "@src/services";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRoutesProps } from "@src/navigation/AppRoutes";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  console.log("aaaa");

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const response = await usersService.me();

      console.log("aqui está a resposta" + response?.data);

      setUser(response?.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const login = async () => {
    await fetchUser();
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("acessToken");
      setUser(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
