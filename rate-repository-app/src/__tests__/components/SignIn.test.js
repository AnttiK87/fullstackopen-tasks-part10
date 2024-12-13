//test file for testing that sing in form calls function with correct values
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignIn from "../../components/SignIn";
import useSignIn from "../../hooks/useSignIn";
import { MemoryRouter } from "react-router-native";

jest.mock("../../hooks/useSignIn");

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      useSignIn.mockReturnValue([onSubmit]);

      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );

      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.press(screen.getByTestId("SignIn"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
