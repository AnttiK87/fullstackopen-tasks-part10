// form for creating review and fuctionalities related to that
import { Button, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
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

//validating form inputs
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repository: yup.string().required("Repository is required"),
  rating: yup
    .number("Rating must be a number")
    .integer("Rating must be integer")
    .min(0, "Rating must be between 0-100")
    .max(100, "Rating must be between 0-100")
    .required("Rating is required"),
});

const initialValues = {
  ownerName: "",
  repository: "",
  rating: "",
  review: "",
};

//structure of form and showing validatin errors
const CreateReviewForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" padding="SignIn">
        Create a review
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
            formik.errors.ownerName || error ? styles.errorBorder : styles.input
          }
          placeholder="Repository owner's username"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text marginLeft="error" color="error">
            {formik.errors.ownerName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={
            formik.errors.repository || error
              ? styles.errorBorder
              : styles.input
          }
          placeholder="Repository's name"
          value={formik.values.repository}
          onChangeText={formik.handleChange("repository")}
        />
        {formik.touched.repository && formik.errors.repository && (
          <Text marginLeft="error" color="error">
            {formik.errors.repository}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          style={formik.errors.rating ? styles.errorBorder : styles.input}
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={(value) => formik.setFieldValue("rating", value)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text marginLeft="error" color="error">
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          multiline
          style={styles.input}
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange("review")}
        />
      </View>
      <View style={styles.button}>
        <Button title="Create a new review" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

//rendering form and fuctionality for submitting review
const CreateReview = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    //console.log(values);
    const { ownerName, repository, rating, review } = values;
    //console.log(ownerName, repository, rating, review);
    const ratingAsInt = Number(rating);
    //console.log(ratingAsInt);

    try {
      await createReview({
        ownerName,
        repository,
        rating: ratingAsInt,
        review,
      });

      navigate(
        `/repositoryInfo/${ownerName.toLowerCase()}.${repository.toLowerCase()}`
      );
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <>
      <CreateReviewForm onSubmit={onSubmit} error={error} />
    </>
  );
};

export default CreateReview;
