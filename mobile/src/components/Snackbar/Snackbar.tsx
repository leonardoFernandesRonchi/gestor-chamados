import { Snackbar as PaperSnackbar } from "react-native-paper";

type AppSnackbarProps = {
  visible: boolean;
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
};

const Snackbar = ({ visible, message, type, onDismiss }: AppSnackbarProps) => {
  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      style={{
        backgroundColor: type === "success" ? "#2E7D32" : "#C62828",
        borderRadius: 8,
        marginHorizontal: 0,
      }}
    >
      {message}
    </PaperSnackbar>
  );
};

export default Snackbar;
