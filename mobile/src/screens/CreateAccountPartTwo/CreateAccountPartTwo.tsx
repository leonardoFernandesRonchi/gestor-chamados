import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Card, Input, Button } from "@src/components";
import Colors from "@src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { companiesService, usersService } from "@src/services";

const CreateAccountPartTwo = () => {
  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  const route = useRoute<RouteProp<AppRoutesProps, "CreateAccountPartTwo">>();

  const formProps = route.params.formProps;

  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  console.log("chegou aqui");
  console.log(formProps);

  const handleContinue = async () => {
    try {
      const response = await companiesService.create({
        companyEmail: companyEmail,
        companyName: companyName,
        cnpj: cnpj,
      });
    } catch (error) {}
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Detalhe das empresa</Text>
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

        <Input
          onChangeText={setCnpj}
          label="CNPJ"
          placeholder="00.000.000/0000-00"
        />

        <Input
          onChangeText={setCompanyEmail}
          label="E-mail da empresa"
          placeholder="empresa@exemplo.com"
        />
      </Card>

      <Button
        text="Continuar"
        onPressFunction={() => navigation.navigate("CreateAccount")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
