//hook for creating users
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useCreateUser = () => {
  const apolloClient = useApolloClient();
  const [createUser, result] = useMutation(CREATE_USER);

  const createNewUser = async ({ userName, password }) => {
    const result = await createUser({
      variables: { userName, password },
    });
    apolloClient.resetStore();
    return result;
  };

  return [createNewUser, result];
};

export default useCreateUser;
