import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";

const useLoggedInUser = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
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
