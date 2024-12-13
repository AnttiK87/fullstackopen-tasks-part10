//main structure of the application and route defining for navigating throuh the app
import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import RepositoryInfo from "./RepositoryInfo";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

import AppBar from "./AppBar";
import theme from "../theme";

const styles = StyleSheet.create({
  color: {
    backgroundColor: theme.colors.mainBackGround,
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.color}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/singIn" element={<SignIn />} />
        <Route path="/singUp" element={<SignUp />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="/repositoryInfo/:id" element={<RepositoryInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
