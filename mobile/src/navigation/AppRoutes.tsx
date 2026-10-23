import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "@src/constants";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CreateAccountFormProps } from "@src/types/CreateAccountFormProps";

import { useAuth } from "@src/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";

export type AppRoutesProps = {
  Home: undefined;
  HomeLogged: undefined;
  Login: undefined;
  CreateAccount: undefined;
  CreateAccountPartTwo: {
    formProps: CreateAccountFormProps;
  };

  navigate: () => void;
};

import {
  CreateAccount,
  CreateAccountPartTwo,
  Home,
  Login,
  HomeLogged,
} from "@src/screens";

const AppRoutes = () => {
  const { user, loading, logout } = useAuth();

  console.log(loading);

  const permissions = {
    Home: ["admin", "manager", "user"],
    Users: ["admin"],
    Departments: ["admin", "manager"],
  };

  const canAcess = (screen: keyof typeof permissions) => {
    return permissions[screen].includes(
      user?.status as (typeof permissions)[typeof screen][number],
    );
  };

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator key={user ? "authenticated" : "unauthenticated"}>
      {user ? (
        <>
          <Stack.Screen
            name="HomeLogged"
            component={HomeLogged}
            options={{
              title: "Preços e Compras",
              headerStyle: {
                backgroundColor: Colors.backgroundNavbar,
              },
              headerTitleAlign: "center",
              headerLeft: () => (
                <Pressable>
                  <Ionicons name="menu" size={26} color="#333" />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable onPress={logout}>
                  <Ionicons name="log-out-outline" size={24} color="#333" />
                </Pressable>
              ),
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Preços e Compras",
              headerStyle: {
                backgroundColor: Colors.backgroundNavbar,
              },
              headerTitleAlign: "center",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Realize seu login",
              headerStyle: {
                backgroundColor: Colors.backgroundNavbar,
              },
              headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              title: "Setup inicial",
              headerStyle: {
                backgroundColor: Colors.backgroundNavbar,
              },
              headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="CreateAccountPartTwo"
            component={CreateAccountPartTwo}
            options={{
              title: "Setup inicial",
              headerStyle: {
                backgroundColor: Colors.backgroundNavbar,
              },
              headerTitleAlign: "center",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppRoutes;
