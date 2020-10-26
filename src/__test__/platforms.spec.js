import { createPlatform, createPlatforms } from "../platforms";

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

test("should render platfomrs", () => {
  const screen = document.createElement("div");
  const platformCount = 5;
  const leftSpace = 100;
  const bottomSpaces = [100, 220, 340, 460, 580];

  const platforms = createPlatforms({ screen, platformCount, leftSpace });

  expect(platforms.length).toBe(platformCount);
  platforms.forEach((platform, index) => {
    expect(screen).toContainElement(platform.element);
    expect(platform.bottom).toBe(bottomSpaces[index]);
  });
  expect(platforms[0].left).toBe(leftSpace);
});
