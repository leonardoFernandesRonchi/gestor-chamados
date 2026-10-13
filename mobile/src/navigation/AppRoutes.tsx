import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "@src/constants";

import { CreateAccountFormProps } from "@src/types/CreateAccountFormProps";

export type AppRoutesProps = {
  Home: undefined;
  Login: undefined;
  CreateAccount: undefined;
  CreateAccountPartTwo: {
    formProps: CreateAccountFormProps;
  };

  navigate: () => void;
};

import { CreateAccount, CreateAccountPartTwo, Home, Login } from "@src/screens";
const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
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
    </Stack.Navigator>
  );
};

export default AppRoutes;
