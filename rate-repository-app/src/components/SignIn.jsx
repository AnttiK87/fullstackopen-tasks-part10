import { Button, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";

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

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(5, "User name must be at least 5 characters long")
    .required("User name is required"),
  password: yup
    .string()
    .min(5, "Pasword must be at least 5 characters long")
    .required("Pasword is required"),
});

const initialValues = {
  userName: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
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
      <View>
        <TextInput
          style={formik.errors.userName ? styles.errorBorder : styles.input}
          placeholder="User name"
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
        <Button title="Sign in" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
