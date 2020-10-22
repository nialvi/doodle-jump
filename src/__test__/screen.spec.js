import { clearScreen } from "../screen";

test("it should clear screen", () => {
  const screen = document.createElement("div");
  screen.innerHTML = "content";

  clearScreen(screen);
  expect(screen).toBeEmptyDOMElement();
});
