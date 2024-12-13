//component for signing in
import { Button, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
//styles
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12,
  },
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  errorBorder: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#d73a4a",
  },
});

//validating user inputs
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Pasword must be at least 5 characters long")
    .required("Pasword is required"),
});

const initialValues = {
  username: "",
  password: "",
};

//structure of sign in form
const SignInForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" padding="SignIn">
        Sign in
      </Text>
      {error && (
        <Text
          marginLeft="error"
          color="error"
          fontSize="subheading"
          fontWeight="bold"
        >
          {error}
        </Text>
      )}
      <View>
        <TextInput
          style={formik.errors.username ? styles.errorBorder : styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text marginLeft="error" color="error">
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={formik.errors.password ? styles.errorBorder : styles.input}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text marginLeft="error" color="error">
            {formik.errors.password}
          </Text>
        )}
      </View>
      <View style={styles.button}>
        <Button testID="SignIn" title="Sign in" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

//rendering sign in form and fuctionality for it
const SignIn = () => {
  //hooks and state variables
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  //functionality for submitting sign in form
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return <SignInForm onSubmit={onSubmit} error={error} />;
};

export default SignIn;
