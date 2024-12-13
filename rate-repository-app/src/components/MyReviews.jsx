//component for showing reviews written by logged in user
import useLoggedInUser from "../hooks/useLoggedInUser";
import useDeleteReview from "../hooks/useDeleteReview";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";

import Text from "./Text";
//styles
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
//separator between reviews
const ItemSeparator = () => <View style={styles.separator} />;

//functionalities and structure of the component
const MyReviews = () => {
  //hooks
  const navigate = useNavigate();
  const { loggedInUser, loading } = useLoggedInUser(true);
  const { deleteReviewById, result } = useDeleteReview();
  //console.log(loggedInUser);

  //show loading screen if data is not ready
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text fontSize="subheading" fontWeight="bold">
          Loading...
        </Text>
      </View>
    );
  }

  //set reviews ready for rendering
  const reviews = loggedInUser?.me.reviews;
  //console.log(reviews);
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  //console.log(reviewNodes);

  //functionality for repository button
  const navigateToReview = (owner, name) => {
    navigate(`/repositoryInfo/${owner}.${name}`, { replace: true });
  };

  //functionality for delete button confirmation of deletion with alert
  const deleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              console.log(id);
              await deleteReviewById(id);
              console.log(`Review deleted successfully: ${result}`);
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <ReviewItem
            item={item}
            myReviews={true}
            navigateToReview={navigateToReview}
            deleteReview={deleteReview}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );
};

export default MyReviews;
