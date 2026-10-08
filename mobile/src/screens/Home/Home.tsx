import { StyleSheet, View, Text } from "react-native";

import Colors from "@src/constants/colors";
import { Card, Button } from "@src/components";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@src/navigation/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Home = () => {
  type navigationProps = NativeStackNavigationProp<AppRoutesProps>;

  const navigation = useNavigation<navigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chamados</Text>

      <Card
        title="Premium"
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: Colors.backgroundCardGray,
        }}
      >
        <Text style={styles.priceText}>R$ 29,90/mês</Text>
        <Text>Inclui todos os recursos.</Text>

        <View style={styles.containerIcons}>
          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="black" />
            <Text>Suporte 24/7</Text>
          </View>

          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="black" />
            <Text>Relatórios detalhados</Text>
          </View>
          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="black" />
            <Text>Integração com outros serviços</Text>
          </View>

          <Button
            text="Assinar agora"
            onPressFunction={() => navigation.navigate("CreateAccount")}
          />
        </View>
      </Card>

      <Card
        title="Profissional"
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: Colors.backgroundCardBlue,
        }}
        titleStyle={{
          color: Colors.textCardBlue,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        <Text style={(styles.priceText, { color: Colors.textCardBlue })}>
          R$ 29,90/mês
        </Text>
        <Text style={{ color: Colors.textCardBlue }}>
          Inclui todos os recursos.
        </Text>

        <View style={styles.containerIcons}>
          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="green" />
            <Text style={{ color: Colors.textCardBlue }}>Suporte 24/7</Text>
          </View>

          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="green" />
            <Text style={{ color: Colors.textCardBlue }}>
              Relatórios detalhados
            </Text>
          </View>
          <View style={styles.containerIcon}>
            <EvilIcons name="check" size={24} color="green" />
            <Text style={{ color: Colors.textCardBlue }}>
              Integração com outros serviços
            </Text>
          </View>

          <Button
            text="Assinar agora"
            style={{ backgroundColor: Colors.buttonBlue }}
            onPressFunction={() => navigation.navigate("CreateAccount")}
          />
        </View>
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

export default Home;
