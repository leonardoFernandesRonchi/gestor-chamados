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
const CreateUser = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>Adicione um novo usuário</Text>
        <Text>Preencha as informações para adicionar um novo membro.</Text>
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
          icon={<MaterialIcons name="email" size={20} />}
          label="Função"
          placeholder="Admin, Manager, User"
          onChangeText={setRole}
        />
        <Input
          icon={<MaterialIcons name="email" size={20} />}
          label="Departamento"
          placeholder="Ex: TI, RH, Financeiro"
          onChangeText={setDepartment}
        />
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

export default CreateUser;
