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
  titleIcon?: React.ReactNode;
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
  titleIcon,
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
      <View style={styles.box}>
        {titleIcon && <View style={[styles.titleIcon]}>{titleIcon}</View>}
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      </View>

      {content && <Text style={[styles.content, contentStyle]}>{content}</Text>}
      {button && <Text style={styles.button}>{buttonText}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  titleIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
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
