import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";

import { Card, Input, Button, ErrorMessage } from "@src/components";
import Colors from "@src/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ValidationError } from "yup";

const HomeLogged = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={0}
    >
      <ScrollView></ScrollView>
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

export default HomeLogged;
