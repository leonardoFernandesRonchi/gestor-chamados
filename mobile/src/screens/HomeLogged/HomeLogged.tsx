import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";

import { Card } from "@src/components";
import Colors from "@src/constants/colors";
import { useAuth } from "@src/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";

const HomeLogged = () => {
  const { user } = useAuth();

  const totalDepartments = user?.company?.departments?.length ?? 0;

  const totalUsers = user?.company?.totalUsers ?? 0;

  const activeProjects = 0; // Implementar futuramente

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.containerFlex}>
          <Card
            title="Total de usuários"
            titleIcon={
              <MaterialIcons
                name="people"
                size={24}
                color={Colors.textCardBlue}
              />
            }
            content={String(totalUsers)}
            style={styles.smallCard}
            contentStyle={styles.number}
          />

          <Card
            title="Total de departamentos"
            titleIcon={
              <MaterialIcons
                name="business"
                size={24}
                color={Colors.textCardBlue}
              />
            }
            content={String(totalDepartments)}
            style={styles.smallCard}
            contentStyle={styles.number}
          />

          <Card
            title="Projetos ativos"
            titleIcon={
              <MaterialIcons
                name="folder"
                size={24}
                color={Colors.textCardBlue}
              />
            }
            content="0"
            style={styles.largeCard}
            contentStyle={styles.number}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "5%",
    paddingHorizontal: 20,
  },

  smallCard: {
    width: "47.5%",
    height: 120,
    padding: 20,
    backgroundColor: Colors.white,
  },

  largeCard: {
    width: "100%",
    height: 120,
    padding: 20,
    backgroundColor: Colors.white,
  },

  number: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 12,
  },

  scrollContent: {
    paddingBottom: 40,
  },
});

export default HomeLogged;
