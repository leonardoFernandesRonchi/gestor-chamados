import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "@src/constants";
import { useAuth } from "@src/hooks/useAuth";

import {
  CreateAccount,
  CreateAccountPartTwo,
  Login,
  Users,
  CreateUser,
} from "@src/screens";

import DrawerRoutes from "./DrawerRoutes";

import { ActivityIndicator, View } from "react-native";
import { CreateAccountFormProps } from "@src/types/CreateAccountFormProps";

export type AppRoutesProps = {
  Home: undefined;
  HomeLogged: undefined;
  Login: undefined;
  Users: undefined;
  CreateAccount: undefined;
  CreateUser: undefined;
  CreateAccountPartTwo: {
    formProps: CreateAccountFormProps;
  };

  navigate: () => void;
};

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator key={user ? "authenticated" : "unauthenticated"}>
      {user ? (
        <Stack.Screen
          name="HomeLogged"
          component={DrawerRoutes}
          options={{
            headerShown: false,
          }}
        />
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
            name="CreateUser"
            component={CreateUser}
            options={{
              title: "Criar usuário",
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
