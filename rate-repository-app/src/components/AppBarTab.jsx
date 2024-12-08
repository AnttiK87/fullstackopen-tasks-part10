import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = () => {
  return (
    <>
      <Pressable style={styles.container}>
        <Link to="/">
          <Text color="textWhite" fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
      </Pressable>
      <Pressable style={styles.container}>
        <Link to="/singIn">
          <Text color="textWhite" fontWeight="bold" fontSize="subheading">
            Sign in
          </Text>
        </Link>
      </Pressable>
    </>
  );
};

export default AppBarTab;
