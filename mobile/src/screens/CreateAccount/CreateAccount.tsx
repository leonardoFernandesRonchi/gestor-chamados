import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Card, Input } from "@src/components";
import Colors from "@src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const CreateAccount = () => {
  return (
    <ScrollView style={styles.container}>
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
          height: "30%",
          backgroundColor: Colors.white,
        }}
      >
        <Input
          label="Nome do departamento"
          placeholder="Departamento de Recursos Humanos"
        />

        <Input
          label="Código do departamento"
          placeholder="ADM-01, TI-1, RH-01"
        />
      </Card>

      <Card
        title="Administrador"
        titleIcon={<Ionicons name="business" size={25} color="black" />}
        style={{
          marginTop: "10%",
          marginBottom: "20%",
          width: "100%",
          height: "55%",
          padding: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Input label="Nome Completo" placeholder="John Doe" />

        <Input label="Número de telefone" placeholder="(11) 99999-9999" />

        <Input label="E-mail" placeholder="john.doe@example.com" />

        <Input label="Senha" placeholder="********" />

        <Input label="Confirmação de senha" placeholder="********" />
      </Card>
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
