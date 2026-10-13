import { StyleSheet, View, Text } from "react-native";

import Colors from "@src/constants/colors";
import { Card, Button, Input } from "@src/components";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>Realize seu login</Text>
        <Text>Inclui todos os recursos.</Text>
      </View>

      <Card
        style={{
          height: "40%",
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

        <Button
          text="Entrar"
          onPressFunction={() => navigation.navigate("Home")}
        />
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
