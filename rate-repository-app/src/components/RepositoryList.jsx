import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  //console.log(repositories);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={RepositoryItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default RepositoryList;
