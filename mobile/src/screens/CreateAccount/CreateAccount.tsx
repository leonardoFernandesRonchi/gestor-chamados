import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Card, Input, Button } from "@src/components";
import Colors from "@src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import schema from "./schema";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ValidationError } from "yup";

const CreateAccount = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const handleContinue = async () => {
    const data = {
      departmentName,
      departmentCode,
      userName,
      userPhone,
      userEmail,
      userPassword,
      confirmPassword,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      setErrors({});

      navigation.navigate("CreateAccountPartTwo");
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};

        error.inner.forEach((item) => {
          if (item.path) {
            validationErrors[item.path] = item.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Seja bem vindo!</Text>
        <Text>Vamos realizar as configurações iniciais.</Text>
      </View>

      <Card
        title="Primeiro Departamento"
        titleIcon={<Ionicons name="business" size={25} color="black" />}
        style={{
          width: "100%",
          padding: 20,
          height: "25%",
          backgroundColor: Colors.white,
        }}
      >
        <Input
          label="Nome do departamento"
          value={departmentName}
          onChangeText={setDepartmentName}
          placeholder="Departamento de Recursos Humanos"
        />

        <Input
          label="Código do departamento"
          value={departmentCode}
          onChangeText={setDepartmentCode}
          placeholder="ADM-01, TI-1, RH-01"
        />
      </Card>

      <Card
        title="Administrador"
        titleIcon={<Ionicons name="business" size={25} color="black" />}
        style={{
          marginTop: "10%",
          marginBottom: "3%",
          width: "100%",
          height: "50%",
          padding: 15,
          backgroundColor: Colors.white,
        }}
      >
        <Input
          label="Nome Completo"
          value={userName}
          onChangeText={setUserName}
          placeholder="John Doe"
        />

        <Input
          label="Número de telefone"
          value={userPhone}
          onChangeText={setUserPhone}
          placeholder="(11) 99999-9999"
        />

        <Input
          label="E-mail"
          value={userEmail}
          onChangeText={setUserEmail}
          placeholder="john.doe@example.com"
        />

        <Input
          label="Senha"
          value={userPassword}
          onChangeText={setUserPassword}
          placeholder="********"
        />

        <Input
          label="Confirmação de senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
        />
      </Card>
      <Button text="Continuar" onPressFunction={handleContinue} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  containerIcons: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export default CreateAccount;
