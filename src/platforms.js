export function createPlatform(
  screen,
  bottomPosition,
  leftPosition = Math.random() * 315
) {
  const bottom = bottomPosition;
  const left = leftPosition;
  const element = document.createElement("div");

  element.classList.add("platform");
  element.style.bottom = `${bottom}px`;
  element.style.left = `${left}px`;

  screen.appendChild(element);

  return {
    bottom,
    left,
    element,
  };
}

export function createPlatforms({ screen, platformCount, leftSpace }) {
  let result = [];

  for (let i = 0; i < platformCount; i++) {
    let platformGap = 600 / platformCount;
    let newPlatformBottom = 100 + i * platformGap;

    let left;

    if (i === 0) {
      left = leftSpace;
    }

    let newPlatform = createPlatform(screen, newPlatformBottom, left);

    result.push(newPlatform);
  }

  return result;
}

export function movePlatforms(platforms, bottomSpace) {
  if (bottomSpace > 150) {
    platforms.forEach((platform) => {
      platform.bottom -= 2;
      platform.element.style.bottom = `${platform.bottom}px`;

      if (platform.bottom <= 5) {
        platform.bottom = 600;
        platform.left = Math.random() * 315;
      }
    });
  }
}
