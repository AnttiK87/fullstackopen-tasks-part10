//component of showing repository information at repository list
import { View, StyleSheet, Image, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

//styles
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: "100%",
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

//formatting stats over 1000 to form e.g 1.0k
const statsFormatting = (stats) => {
  if (stats > 1000) {
    return (stats / 1000).toFixed(1) + "k";
  } else {
    return stats;
  }
};

//stucture of repository item
const RepositoryItem = ({ item, repositoryInfo }) => {
  const navigate = useNavigate();

  const showRepository = (id) => {
    navigate(`/repositoryInfo/${id}`);
  };

  //console.log(`item lookslike this: ${JSON.stringify(item)}`);

  return (
    <Pressable style={styles.container} onPress={() => showRepository(item.id)}>
      <View testID="repositoryItem" style={styles.listItem}>
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
            <Text color="textSecondary">{item.description}</Text>
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
        {repositoryInfo && (
          <View style={styles.containerInfo}>
            <Pressable
              style={styles.button}
              onPress={() => Linking.openURL(item.url)}
            >
              <Text fontSize="subheading" fontWeight="bold" color="textWhite">
                Open in GitHub
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
