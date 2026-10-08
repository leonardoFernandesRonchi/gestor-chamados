import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "@src/constants";

export type AppRoutesProps = {
  Home: undefined;
  CreateAccount: undefined;

  navigate: () => void;
};

import { CreateAccount, Home } from "@src/screens";
const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default AppRoutes;
