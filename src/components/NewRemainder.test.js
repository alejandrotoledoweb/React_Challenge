import NewRemainder from "./NewRemainder";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import myStore from "../store/getStore";

test("New Remainder component", async () => {
  await act(async () =>
    render(
      <>
        <Provider store={myStore}>
          <BrowserRouter>
            <NewRemainder />
          </BrowserRouter>
        </Provider>
      </>
    )
  );
  render();

  const inputText = screen.getByLabelText(/Text for the remainder/i);
  await act(async () => {
    userEvent.type(inputText, "new remainder test");
  });
  expect(inputText.value).toBe("t");

  const inputDate = screen.getByLabelText(/Date for the remainder/i);
  await act(async () => {
    userEvent.type(inputDate, "03-Jul-2021");
  });
  expect(inputDate.value).toBe("");

  const inputTime = screen.getByLabelText(/Time for the remainder/i);
  await act(async () => {
    userEvent.type(inputTime, "09:30");
  });
  expect(inputTime.value).toBe("09:30");

  const inputCity = screen.getByLabelText(
    /City where happening the remainder/i
  );
  await act(async () => {
    userEvent.type(inputCity, "o");
  });
  expect(inputCity.value).toBe("o");
});
