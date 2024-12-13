//component for rendering repository list/main screen
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import SearchBarComponent from "./SearchBarComponent";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

//styles
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 10,
    height: 60,
    paddingHorizontal: 20,
    fontSize: theme.fontSizes.subheading,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

//separator between repositories
const ItemSeparator = () => <View style={styles.separator} />;

//Container rendered as class so that search bar works better
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { search, setSearch, sortingMethod, handleSortingChange } =
      this.props;

    return (
      <>
        <SearchBarComponent search={search} setSearch={setSearch} />
        <Picker
          style={styles.picker}
          selectedValue={sortingMethod}
          onValueChange={(itemValue) => handleSortingChange(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="Latest" />
          <Picker.Item label="Highest rated repositories" value="Highest" />
          <Picker.Item label="Lowest rated repositories" value="Lowest" />
        </Picker>
        <ItemSeparator />
      </>
    );
  };

  render() {
    const { repositoryNodes, onEndReach } = this.props;

    return (
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <RepositoryItem item={item} repositoryInfo={false} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

//for rendering mainscreen and functionalites for it
const RepositoryList = () => {
  //hooks and state variables
  const [sortingMethod, setSortingMethod] = React.useState("");
  const [sorting, setSorting] = React.useState("CREATED_AT");
  const [direction, setDirection] = React.useState("DESC");
  const [search, setSearch] = React.useState("");
  const { repositories, loading, fetchMore } = useRepositories(
    4,
    sorting,
    direction,
    search
  );

  //setting up repositories for rendering
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  //console.log(repositoryNodes);

  //functionality for sorting
  const handleSortingChange = (method) => {
    setSortingMethod(method);
    if (method === "Latest") {
      setSorting("CREATED_AT");
      setDirection("DESC");
    } else if (method === "Highest") {
      setSorting("RATING_AVERAGE");
      setDirection("DESC");
    } else {
      setSorting("RATING_AVERAGE");
      setDirection("ASC");
    }
  };

  //get more repositories at the end of the list
  const onEndReach = () => {
    fetchMore();
    //console.log("You have reached the end of the list");
  };

  //show loading screen
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text fontSize="subheading" fontWeight="bold">
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositoryNodes={repositoryNodes}
      search={search}
      setSearch={setSearch}
      sortingMethod={sortingMethod}
      handleSortingChange={handleSortingChange}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
