import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Card, Input, Button } from "@src/components";
import Colors from "@src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CreateAccount = () => {
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
          marginBottom: "3%",
          width: "100%",
          height: "50%",
          padding: 15,
          backgroundColor: Colors.white,
        }}
      >
        <Input label="Nome Completo" placeholder="John Doe" />

        <Input label="Número de telefone" placeholder="(11) 99999-9999" />

        <Input label="E-mail" placeholder="john.doe@example.com" />

        <Input label="Senha" placeholder="********" />

        <Input label="Confirmação de senha" placeholder="********" />
      </Card>
      <Button
        text="Continuar"
        onPressFunction={() => navigation.navigate("CreateAccountPartTwo")}
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
