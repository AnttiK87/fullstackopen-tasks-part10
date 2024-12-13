// hook for deleting reviews
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const deleteReviewById = async (deleteReviewId) => {
    console.log(`this is id: ${deleteReviewId}`);
    const result = await deleteReview({
      variables: { deleteReviewId },
    });
    apolloClient.resetStore();
    return result;
  };

  return {
    deleteReviewById,
    result,
  };
};

export default useDeleteReview;
