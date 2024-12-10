import { View, ScrollView, StyleSheet } from "react-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import Constants from "expo-constants";
import useLoggedInUser from "../hooks/useLoggedInUser";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.appBarBackGround,
    marginTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  const { loggedInUser } = useLoggedInUser();
  //console.log(loggedInUser);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link={"/"} label={"Repositories"} />
        {loggedInUser?.me != null ? (
          <AppBarTab link={"/singIn"} label={"Sign out"} />
        ) : (
          <AppBarTab link={"/singIn"} label={"Sign in"} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
