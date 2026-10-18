import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Input, Button, Snackbar, ErrorMessage } from "@src/components";
import Colors from "@src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { companiesService, usersService } from "@src/services";
import schema from "@src/screens/CreateAccountPartTwo/schema";
import { ValidationError } from "yup";

const CreateAccountPartTwo = () => {
  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  const route = useRoute<RouteProp<AppRoutesProps, "CreateAccountPartTwo">>();

  const formProps = route.params.formProps;

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState(false);

  console.log("chegou aqui");
  console.log(formProps);

  const handleContinue = async () => {
    try {
      setError(false);
      const data = {
        companyName,
        cnpj,
        companyEmail,
        companyPhone,
      };
      await schema.validate(data, {
        abortEarly: false,
      });
      await companiesService.create({
        companyEmail: companyEmail,
        companyName: companyName,
        companyPhone: companyPhone,

        cnpj: cnpj,
        userName: formProps.userName,
        userPassword: formProps.userPassword,
        userEmail: formProps.userEmail,
        userPhone: formProps.userPhone,

        departmentName: formProps.departmentName,
      });

      setSnackbar({
        visible: true,
        message: "Empresa cadastrada com sucesso!",
        type: "success",
      });

      navigation.navigate("Login");
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={0}
    >
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Detalhes das empresa</Text>
          <Text>Vamos realizar as configurações da empresa.</Text>
        </View>
        <Card
          title="Detalhes da empresa"
          titleIcon={<Ionicons name="business" size={25} color="black" />}
          style={{
            width: "100%",
            padding: 20,
            height: "70%",
            marginTop: "10%",
            backgroundColor: Colors.white,
          }}
        >
          <Input
            onChangeText={setCompanyName}
            label="Nome da empresa"
            placeholder="Nome da empresa"
          />

          <ErrorMessage message={errors.companyName} />

          <Input
            onChangeText={setCnpj}
            label="CNPJ"
            placeholder="00.000.000/0000-00"
          />
          <ErrorMessage message={errors.cnpj} />

          <Input
            onChangeText={setCompanyPhone}
            label="Número"
            placeholder="11 99999-9999"
          />
          <ErrorMessage message={errors.companyPhone} />

          <Input
            onChangeText={setCompanyEmail}
            label="E-mail da empresa"
            placeholder="empresa@exemplo.com"
          />
          <ErrorMessage message={errors.companyEmail} />
        </Card>
        <Button text="Continuar" onPressFunction={handleContinue} />
        {error && (
          <Text
            style={{
              color: "red",
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Um erro ocorreu durante o processamento
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: "25%",
    backgroundColor: Colors.background,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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

export default CreateAccountPartTwo;
