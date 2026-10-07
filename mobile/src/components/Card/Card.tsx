import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

import Colors from "@src/constants/colors";

type CardProps = {
  title?: string;
  content?: string;
  button?: boolean;
  buttonText?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

const Card = ({
  title,
  content,
  button,
  buttonText,
  style,
  titleStyle,
  contentStyle,
  children,
}: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {content && <Text style={[styles.content, contentStyle]}>{content}</Text>}
      {button && <Text style={styles.button}>{buttonText}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    backgroundColor: Colors.backgroundCardGray,
    width: "100%",
    height: "40%",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
