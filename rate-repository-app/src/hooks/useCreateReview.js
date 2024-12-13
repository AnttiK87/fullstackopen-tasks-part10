//hook for adding reviews
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const createNewReview = async ({ ownerName, repository, rating, review }) => {
    //console.log(ownerName, repository, rating, review);
    const result = await createReview({
      variables: { ownerName, repository, rating, review },
    });
    apolloClient.resetStore();
    return result;
  };

  return [createNewReview, result];
};

export default useCreateReview;
