import { createPlatform } from "../platforms";

test("should render platform on screen", () => {
  const screen = document.createElement("div");
  const bottomPosition = 100;
  const leftPosition = 100;

  const platform = createPlatform(screen, bottomPosition, leftPosition);

  expect(platform.element).not.toBeNull();
  expect(platform.element).toHaveClass("platform");
  expect(platform.element).toHaveStyle({
    left: "100px",
    bottom: "100px",
  });
  expect(screen).toContainElement(platform.element);
  expect(platform.bottom).toBe(100);
  expect(platform.left).toBe(100);
});
