// GraphQl mutations
import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $ownerName: String!
    $repository: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repository
        rating: $rating
        text: $review
      }
    ) {
      rating
      repository {
        ownerName
        name
      }
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($userName: String!, $password: String!) {
    createUser(user: { username: $userName, password: $password }) {
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
