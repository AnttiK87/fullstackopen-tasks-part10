// component for showing more detailed info of repository and for rendering reviews
import useRepository from "../hooks/useRepository";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-native";
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

const RepositoryInfo = () => {
  //get repositorys id from parameters
  let { id } = useParams();

  //get repositorys info with first two reviews
  const { repository, loading, fetchMore } = useRepository(id, 2);
  //console.log(repository);

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

  //setup reviews for rendering
  const reviews = repository.reviews;
  //console.log(reviews);
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  //console.log(reviewNodes);

  //fetch more reviews at the end of the list
  const onEndReach = () => {
    fetchMore();
    //console.log("You have reached the end of the list");
  };

  return (
    <>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            <RepositoryItem item={repository} repositoryInfo={true} />
            <ItemSeparator />
          </>
        )}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default RepositoryInfo;
