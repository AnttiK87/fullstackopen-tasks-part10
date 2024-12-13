//app bar component for renderin appbar tabs tabs show alters if user is signed in or not
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
  const { loggedInUser } = useLoggedInUser(false);
  //console.log(loggedInUser);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link={"/"} label={"Repositories"} />
        {loggedInUser?.me && (
          <>
            <AppBarTab link={"/review"} label={"Create a review"} />
            <AppBarTab link={"/myReviews"} label={"My reviews"} />
          </>
        )}
        {loggedInUser?.me != null ? (
          <AppBarTab link={"/singIn"} label={"Sign out"} />
        ) : (
          <AppBarTab link={"/singIn"} label={"Sign in"} />
        )}
        {!loggedInUser?.me && <AppBarTab link={"/singUp"} label={"Sign Up"} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
