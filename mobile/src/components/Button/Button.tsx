import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ViewStyle,
  StyleProp,
} from "react-native";
import Colors from "@src/constants/colors";

type CardProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const Button = ({ text, style, children }: CardProps) => {
  return (
    <Pressable style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    backgroundColor: Colors.primary,
    width: "100%",
    height: 50,
    marginTop: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default Button;
