//component for rendering review item at repository info and my reviews
import { View, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";

//styles
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    paddingBottom: 20,
    flex: 1,
  },
  containerInfo: {
    padding: 20,
    flexDirection: "row",
  },
  rating: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    height: 50,
    width: 50,
    borderWidth: 3,
    borderRadius: 25,
    borderColor: theme.colors.primary,
  },
  content: {
    width: "75%",
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  containerButtons: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  buttonDel: {
    backgroundColor: "red",
    borderRadius: 5,
    margin: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
});

//format date to ISO-format and to be show as eg. 10.12.2024
const formatDate = (dateToFormat) => {
  const dateISO = new Date(dateToFormat);
  const formattedDate = dateISO.toLocaleDateString("fi-FI");
  return formattedDate;
};

//item structure changes according to boolean myReviews
const ReviewItem = ({ item, myReviews, navigateToReview, deleteReview }) => {
  //console.log(`item lookslike this: ${JSON.stringify(item)}`);

  return (
    <View style={styles.listItem}>
      <View style={styles.containerInfo}>
        <View style={styles.rating}>
          <Text color="primary" fontSize="subheading" fontWeight="bold">
            {item.rating}
          </Text>
        </View>
        <View style={styles.content}>
          {myReviews ? (
            <Text fontSize="subheading" fontWeight="bold">
              {item.repository.ownerName}/{item.repository.name}
            </Text>
          ) : (
            <Text fontSize="subheading" fontWeight="bold">
              {item.user.username}
            </Text>
          )}
          <Text style={styles.paddingBottom} color="textSecondary">
            {formatDate(item.createdAt)}
          </Text>

          <Text>{item.text}</Text>
        </View>
      </View>
      {myReviews && (
        <View style={styles.containerButtons}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigateToReview(item.repository.ownerName, item.repository.name)
            }
          >
            <Text fontSize="subheading" fontWeight="bold" color="textWhite">
              Repository
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttonDel}
            onPress={() => deleteReview(item.id)}
          >
            <Text fontSize="subheading" fontWeight="bold" color="textWhite">
              Delete
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
