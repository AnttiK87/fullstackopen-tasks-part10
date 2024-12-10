import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [login, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    //console.log(username);
    //console.log(password);
    const result = await login({ variables: { username, password } });
    //console.log(result.data.authenticate);
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    //const tokenInStore = await authStorage.getAccessToken();
    //console.log(tokenInStore);
    apolloClient.resetStore();
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
