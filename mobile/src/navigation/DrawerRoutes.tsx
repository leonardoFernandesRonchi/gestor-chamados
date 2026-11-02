import { createDrawerNavigator } from "@react-navigation/drawer";

import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@src/constants";
import { useAuth } from "@src/hooks/useAuth";

import { HomeLogged, Home, Users } from "@src/screens";

const permissions = {
  Home: ["admin", "manager", "user"],
  Users: ["admin"],
  Departments: ["admin", "manager"],
};

const DrawerRoutes = () => {
  const Drawer = createDrawerNavigator();
  const { user, logout } = useAuth();

  const canAccess = (screen: keyof typeof permissions) => {
    return permissions[screen].includes(
      user?.status as (typeof permissions)[typeof screen][number],
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="HomeLogged"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.backgroundNavbar,
        },
        headerTitleAlign: "center",

        headerLeft: () => (
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={26} color="#333" />
          </Pressable>
        ),

        headerRight: () => (
          <Pressable onPress={logout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="#333" />
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeLogged"
        component={HomeLogged}
        options={{
          title: "Início",
        }}
      />

      <Drawer.Screen
        name="Users"
        component={Users}
        options={{
          title: "Usuários",
        }}
      />

      <Drawer.Screen
        name="Departments"
        component={HomeLogged}
        options={{
          title: "Departamentos",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
