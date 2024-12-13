//test file for testing that repository list renders correctly
import React from "react";
import { render, screen, within } from "@testing-library/react-native";
import RepositoryList from "../../components/RepositoryList";
import { CheckRepositoryItemStructure } from "../helpers/testUtils";
import { MemoryRouter } from "react-router-native";

jest.mock("../../hooks/useRepositories", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useRepositories from "../../hooks/useRepositories";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      useRepositories.mockReturnValue({
        repositories: repositories,
      });

      render(
        <MemoryRouter>
          <RepositoryList />
        </MemoryRouter>
      );

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      CheckRepositoryItemStructure(within(firstRepositoryItem), {
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        stars: "21.9k",
        forks: "1.6k",
        reviews: "3",
        rating: "88",
      });

      CheckRepositoryItemStructure(within(secondRepositoryItem), {
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        stars: "1.8k",
        forks: "69",
        reviews: "3",
        rating: "72",
      });
    });
  });
});
