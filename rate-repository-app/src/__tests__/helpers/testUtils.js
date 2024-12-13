//test helper for testing repository lists structure
export const CheckRepositoryItemStructure = (withinItem, expectedData) => {
  expect(withinItem.getByText(expectedData.fullName)).toBeDefined();
  expect(withinItem.getByText(expectedData.description)).toBeDefined();
  expect(withinItem.getByText(expectedData.language)).toBeDefined();
  expect(withinItem.getByText(expectedData.stars)).toBeDefined();
  expect(withinItem.getByText(expectedData.forks)).toBeDefined();
  expect(withinItem.getByText(expectedData.reviews)).toBeDefined();
  expect(withinItem.getByText(expectedData.rating)).toBeDefined();
};
