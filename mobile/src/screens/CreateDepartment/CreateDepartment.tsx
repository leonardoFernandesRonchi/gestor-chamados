import { StyleSheet, View, Text } from "react-native";

import Colors from "@src/constants/colors";
import { Card, Button, Input, Snackbar } from "@src/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { departmentsService } from "@src/services";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";

import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { useCompany } from "@src/hooks/useCompany";

const CreateDepartment = () => {
  const { fetchCompany } = useCompany();

  const [name, setName] = useState("");

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  const handleContinue = async () => {
    try {
      await departmentsService.create({ name: name });

      await fetchCompany();
      navigation.navigate("Departments");
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>Adicione um departamento</Text>
        <Text>
          Preencha as informações para adicionar um novo departamento.
        </Text>
      </View>

      <Card
        style={{
          height: "30%",
          width: "100%",
          padding: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Input
          icon={<MaterialIcons name="business" size={20} />}
          label="Nome do departamento"
          placeholder="Ex: TI, RH, Financeiro"
          onChangeText={setName}
        />

        <Button text="Criar departamento" onPressFunction={handleContinue} />
      </Card>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CreateDepartment;
