//hook for gettin logged in user data
import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";

const useLoggedInUser = (includeReviews) => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  console.log(data);
  return {
    loggedInUser: data || null,
    loading,
    error,
    refetch,
  };
};

export default useLoggedInUser;
