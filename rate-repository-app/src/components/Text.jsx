import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.textWhite,
  },
  colorError: {
    color: theme.colors.textError,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  padding: {
    padding: theme.padding.SignIn,
  },
  marginLeft: {
    marginLeft: theme.marginLeft.marginError,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  padding,
  marginLeft,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "textWhite" && styles.colorWhite,
    color === "error" && styles.colorError,

    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,

    padding === "SignIn" && styles.padding,

    marginLeft === "error" && styles.marginLeft,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
