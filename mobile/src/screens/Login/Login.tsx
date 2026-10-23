import { StyleSheet, View, Text } from "react-native";

import Colors from "@src/constants/colors";
import { Card, Button, Input, Snackbar } from "@src/components";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useState } from "react";
import { usersService } from "@src/services";
import axios from "axios";
import { useAuth } from "@src/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleContinue = async () => {
    try {
      setError(false);
      const data = {
        email,
        password,
      };
      const response = await usersService.login({
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("accessToken", response.access_token);

      login();

      navigation.navigate("HomeLogged");
    } catch (error) {
      setError(true);
      setSnackbar({
        visible: true,
        message: "Email ou senha incorretos.",
        type: "error",
      });
    } finally {
    }
  };

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "10%" }}></View>
      <View style={styles.containerText}>
        <Text style={styles.title}>Realize seu login</Text>
        <Text>Inclui todos os recursos.</Text>
      </View>

      <Card
        style={{
          height: "50%",
          width: "100%",
          padding: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Input
          icon={<MaterialIcons name="email" size={20} />}
          label="E-mail de trabalho"
          placeholder="john.doe@example.com"
          onChangeText={setEmail}
        />

        <Input
          icon={<MaterialIcons name="lock" size={20} />}
          label="Senha"
          placeholder="********"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button text="Entrar" onPressFunction={handleContinue} />

        {error && (
          <Text
            style={{
              color: "red",
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Email ou senha inválidos.
          </Text>
        )}
        <View style={{ marginTop: "10%" }}>
          <Snackbar
            visible={snackbar.visible}
            message={snackbar.message}
            type={snackbar.type}
            onDismiss={() =>
              setSnackbar((prev) => ({
                ...prev,
                visible: false,
              }))
            }
          />
        </View>
      </Card>

      <View style={styles.containerText}>
        <Text>
          Não possui uma conta?{" "}
          <Text
            style={styles.textBlue}
            onPress={() => navigation.navigate("Home")}
          >
            Crie uma agora!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  containerText: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  containerIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  textBlue: {
    color: Colors.textCardBlue,
    fontSize: 18,
  },
});

export default Login;
