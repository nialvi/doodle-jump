import { createPlatform, createPlatforms, movePlatforms } from "../platforms";

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
  const bottomSpaces = [leftSpace, 220, 340, 460, 580];

  const platforms = createPlatforms({ screen, platformCount, leftSpace });

  expect(platforms.length).toBe(platformCount);
  platforms.forEach((platform, index) => {
    expect(screen).toContainElement(platform.element);
    expect(platform.bottom).toBe(bottomSpaces[index]);
  });
  expect(platforms[0].left).toBe(leftSpace);
});

test("platform should not move", () => {
  const screen = document.createElement("div");
  const platformCount = 5;
  const leftSpace = 100;
  const bottomSpaces = [leftSpace, 220, 340, 460, 580];

  const platforms = createPlatforms({ screen, platformCount, leftSpace });

  movePlatforms(platforms, leftSpace);

  platforms.forEach((platform, index) => {
    expect(platform.bottom).toBe(bottomSpaces[index]);
  });
});

test("platform should move platform bottom", () => {
  const screen = document.createElement("div");
  const platformCount = 5;
  const leftSpace = 100;
  const bottomSpace = 200;
  const bottomSpaces = [leftSpace, 220, 340, 460, 580];

  const platforms = createPlatforms({ screen, platformCount, leftSpace });

  movePlatforms(platforms, bottomSpace);

  platforms.forEach((platform, index) => {
    expect(platform.bottom).toBe(bottomSpaces[index] - 2);
    expect(platform.element).toHaveStyle({
      bottom: `${bottomSpaces[index] - 2}px`,
    });
  });
});

test("platform under 5px should have a new bottom position", () => {
  const screen = document.createElement("div");
  const platformCount = 5;
  const leftSpace = 100;
  const bottomSpace = 200;

  const platforms = createPlatforms({ screen, platformCount, leftSpace });

  platforms[0].bottom = 2;

  movePlatforms(platforms, bottomSpace);

  expect(platforms[0].bottom).toBe(600);
  expect(platforms[0].element).toHaveStyle({
    bottom: `0px`,
  });
});
