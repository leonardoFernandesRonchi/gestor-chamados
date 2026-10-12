import { StyleSheet, View, Text, TextInput } from "react-native";

import Colors from "@src/constants/colors";

type InputProps = {
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const Input = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
}: InputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
  },
});

export default Input;
