import { View, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  containerInfo: {
    padding: 20,
    flexDirection: "row",
  },
  info: {
    alignItems: "left",
    paddingLeft: 20,
    marginRight: 50,
  },
  containerStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  statItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  statText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#6c757d",
  },
  languageView: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  listItem: {
    backgroundColor: "white",
    paddingBottom: 20,
  },
});

const statsFormatting = (stats) => {
  if (stats > 1000) {
    return (stats / 1000).toFixed(1) + "k";
  } else {
    return stats;
  }
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.containerInfo}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${item.ownerAvatarUrl}`,
          }}
        />
        <View style={styles.info}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="secondary">{item.description}</Text>
          <View style={styles.languageView}>
            <Text color="textWhite">{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerStats}>
        <View style={styles.statItem}>
          <Text fontSize="subheading" fontWeight="bold">
            {statsFormatting(item.stargazersCount)}
          </Text>
          <Text color="secondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize="subheading" fontWeight="bold">
            {statsFormatting(item.forksCount)}
          </Text>
          <Text color="secondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize="subheading" fontWeight="bold">
            {statsFormatting(item.reviewCount)}
          </Text>
          <Text color="secondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.ratingAverage}
          </Text>
          <Text color="secondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
