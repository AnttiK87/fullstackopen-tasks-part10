//search bar for repository list component
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";
import theme from "../theme";
import { useEffect, useState } from "react";
//styles
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 0,
    margin: 10,
    height: 60,
  },
  input: {
    color: "black",
    fontSize: theme.fontSizes.subheading,
  },
});
//using debounce so that query is not made after every key stroke
const SearchBarComponent = ({ search, setSearch }) => {
  const [query, setQuery] = useState(search);
  const [debouncedQuery] = useDebounce(query, 1000);

  useEffect(() => {
    setSearch(debouncedQuery);
  }, [debouncedQuery, setSearch]);

  const onChangeSearch = (query) => {
    setQuery(query);
  };

  return (
    <Searchbar
      style={styles.searchBar}
      inputStyle={styles.input}
      placeholderTextColor="#808080"
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={query}
    />
  );
};

export default SearchBarComponent;
