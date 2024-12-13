//component for signing up
import { Button, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useCreateUser from "../hooks/useCreateUser";
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
  userName: yup
    .string()
    .min(5, "Username min lenght 5 digits")
    .max(30, "Username max lenght 30 digits")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password min lenght 5 digits")
    .max(30, "Password max lenght 30 digits")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doesn't match")
    .required("Password confirmation is required"),
});

const initialValues = {
  userName: "",
  password: "",
  passwordConfirm: "",
};

//structure of sign up form
const SignUpForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" padding="SignIn">
        Sign up
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
          style={
            formik.errors.userName || error ? styles.errorBorder : styles.input
          }
          placeholder="Username"
          value={formik.values.userName}
          onChangeText={formik.handleChange("userName")}
        />
        {formik.touched.userName && formik.errors.userName && (
          <Text marginLeft="error" color="error">
            {formik.errors.userName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={
            formik.errors.password || error ? styles.errorBorder : styles.input
          }
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
      <View>
        <TextInput
          style={
            formik.errors.passwordConfirm || error
              ? styles.errorBorder
              : styles.input
          }
          secureTextEntry
          placeholder="Password confirmation"
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange("passwordConfirm")}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <Text marginLeft="error" color="error">
            {formik.errors.passwordConfirm}
          </Text>
        )}
      </View>
      <View style={styles.button}>
        <Button title="Sign Up" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

//rendering sign up form and fuctionality for it
const SignUp = () => {
  //hooks and state variables
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [createUser] = useCreateUser();

  //functionality for submitting sign up form
  const onSubmit = async (values) => {
    //console.log(values);
    const { userName, password } = values;

    try {
      await createUser({
        userName,
        password,
      });
      navigate(`/singIn`);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <>
      <SignUpForm onSubmit={onSubmit} error={error} />
    </>
  );
};

export default SignUp;
