import { StyleSheet, View, Text } from "react-native";

import Colors from "@src/constants/colors";
import { Card, Button, Input } from "@src/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";

import { usersService } from "@src/services";
import { useCompany } from "@src/hooks/useCompany";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types";
import { AppRoutesProps } from "@src/navigation/AppRoutes";

import { useState } from "react";

const roles = [
  { label: "Administrador", value: "admin" },
  { label: "Gerente", value: "owner" },
  { label: "Usuário", value: "user" },
];

const CreateUser = () => {
  const { company, fetchCompany } = useCompany();

  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [department_id, setDepartment_id] = useState("");

  const departments = company?.company_to_show?.departments ?? [];

  const departmentOptions = departments.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  console.log(departmentOptions);

  const handleContinue = async () => {
    try {
      await usersService.create({
        name,
        email,
        password,
        phone,
        department_id,
        status,
      });

      await fetchCompany();
      navigation.navigate("Users");
    } catch (error) {
      console.log(error);
      console.error("Error creating user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>Adicione um novo usuário</Text>
        <Text>Preencha as informações para adicionar um novo membro.</Text>
      </View>

      <Card
        style={{
          width: "100%",
          height: "80%",
          padding: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Input
          icon={<MaterialIcons name="person" size={20} />}
          label="Nome completo"
          placeholder="John Doe"
          onChangeText={setName}
        />

        <Input
          icon={<MaterialIcons name="email" size={20} />}
          label="E-mail de trabalho"
          placeholder="john.doe@example.com"
          onChangeText={setEmail}
        />

        <Input
          icon={<MaterialIcons name="lock" size={20} />}
          label="Senha"
          placeholder="Digite uma senha"
          onChangeText={setPassword}
        />

        <Input
          icon={<MaterialIcons name="phone" size={20} />}
          label="Telefone"
          placeholder="(00) 00000-0000"
          onChangeText={setPhone}
        />

        {/* SELECT DE FUNÇÃO */}
        <Text style={styles.label}>Função</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          data={roles}
          labelField="label"
          valueField="value"
          placeholder="Selecione uma função"
          value={status}
          onChange={(item) => setStatus(item.value)}
          renderRightIcon={() => (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#777" />
          )}
        />

        {/* SELECT DE DEPARTAMENTO */}
        <Text style={styles.label}>Departamento</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          data={departmentOptions}
          labelField="label"
          valueField="value"
          placeholder="Selecione um departamento"
          value={department_id}
          onChange={(item) => setDepartment_id(item.value)}
          renderRightIcon={() => (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#777" />
          )}
        />

        <Button text="Criar usuário" onPressFunction={handleContinue} />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  placeholder: {
    color: "#999",
    fontSize: 14,
  },
  selectedText: {
    color: "#333",
    fontSize: 14,
  },
});

export default CreateUser;
