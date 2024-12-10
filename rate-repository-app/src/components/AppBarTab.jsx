import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ link, label }) => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();

  const logout = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      console.log("User logged out successfully");
      navigate(link, { replace: true });
    } catch (e) {
      console.log("Error during logout:", e);
    }
  };

  if (label === "Sign out") {
    return (
      <Pressable style={styles.container} onPress={logout}>
        <Text color="textWhite" fontWeight="bold" fontSize="subheading">
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link style={styles.container} to={link}>
      <Text color="textWhite" fontWeight="bold" fontSize="subheading">
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
