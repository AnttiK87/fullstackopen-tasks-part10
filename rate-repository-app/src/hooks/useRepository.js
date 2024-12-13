//hook for getting repository by id and first set of reviews.
// More reviews are fetch by using fetch more
// after user scrolls at the end of the list
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_ID } from "../graphql/queries";

const useRepository = (id, first) => {
  //console.log(id, first);
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_BY_ID,
    {
      variables: { id, first },
      fetchPolicy: "cache-and-network",
    }
  );

  //console.log(data);

  const handleFetchMore = () => {
    //console.log("I was summoned");
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      //console.log("end of the list reached");
      return;
    }

    //console.log("I reached this point");
    //console.log(data.repository.reviews.pageInfo.endCursor);
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
        id,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
    ...result,
  };
};

export default useRepository;
