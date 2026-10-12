import { Text, StyleSheet } from "react-native";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: "3%",
  },
});

export default ErrorMessage;
