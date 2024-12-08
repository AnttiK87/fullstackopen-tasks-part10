import { Platform } from "react-native";

const theme = {
  colors: {
    appBarBackGround: "#24292e",
    mainBackGround: "#e1e4e8",
    primary: "#0366d6",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textWhite: "white",
    textError: "#d73a4a",
  },
  fontSizes: {
    body: 15,
    subheading: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    SignIn: 10,
  },
  marginLeft: {
    marginError: 12,
  },
};

export default theme;
