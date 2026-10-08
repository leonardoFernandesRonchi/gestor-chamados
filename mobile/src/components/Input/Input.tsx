import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ViewStyle,
  StyleProp,
  TextInput,
} from "react-native";
import Colors from "@src/constants/colors";

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const Input = ({ label, placeholder, value, onChangeText }: InputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Input;
