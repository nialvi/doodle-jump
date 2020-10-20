import { clearScreen } from "./screen";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    startPoint: 150,
    screen: document.querySelector(".screen"),
    buttonStart: document.querySelector(".start"),
    doodler: document.createElement("div"),
  };
  initGame(config);
});

function gameOver(screen, score) {
  screen.innerHTML = score;
}

function renderDoodler({ screen, doodler, leftSpace, bottomSpace }) {
  screen.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.left = `${leftSpace}px`;
  doodler.style.bottom = `${bottomSpace}px`;
}

function createPlatform(
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

function createPlatforms({ screen, platformCount, leftSpace }) {
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

function moveStraight(leftTimer, rightTimer) {
  clearInterval(leftTimer);
  clearInterval(rightTimer);
}

function movePlatforms(platforms, bottomSpace) {
  if (bottomSpace > 150) {
    platforms.forEach((platform) => {
      platform.bottom -= 2;
      platform.element.style.bottom = `${platform.bottom}px`;
      platform.element.style.left = `${platform.left}px`;

      if (platform.bottom <= 5) {
        platform.bottom = 600;
        platform.left = Math.random() * 315;
      }
    });
  }
}

function jump(state) {
  state.doodler.isJumping = true;
  state.timers.up = setInterval(() => {
    state.doodler.bottomSpace += 5;
    state.doodler.element.style.bottom = `${state.doodler.bottomSpace}px`;

    if (state.doodler.bottomSpace > state.screen.startPoint + 200) {
      fall(state);
    }
  }, state.frameMs);
}

function fall(state) {
  state.doodler.isJumping = false;
  clearInterval(state.timers.up);
  state.timers.fallDown = setInterval(() => {
    state.doodler.bottomSpace -= 5;
    state.doodler.element.style.bottom = `${state.doodler.bottomSpace}px`;

    if (state.doodler.bottomSpace <= 0) {
      clearInterval(state.timers.fallDown);
      gameOver(state.screen.element, state.score);
    }

    state.platforms.forEach((platform) => {
      if (
        state.doodler.bottomSpace >= platform.bottom &&
        state.doodler.bottomSpace <= platform.bottom + 15 &&
        state.doodler.leftSpace + 87 >= platform.left &&
        state.doodler.leftSpace <= platform.left + 85 &&
        !state.isJumping
      ) {
        clearInterval(state.timers.fallDown);
        state.screen.startPoint = state.doodler.bottomSpace;
        state.score += 1;
        jump(state);
      }
    });
  }, state.frameMs);
}

function moveRight(state) {
  clearInterval(state.timers.right);
  clearInterval(state.timers.left);

  state.timers.right = setInterval(() => {
    if (state.doodler.leftSpace <= 340) {
      state.doodler.leftSpace += 3;
      state.doodler.element.style.left = `${state.doodler.leftSpace}px`;
    } else {
      clearInterval(state.timers.right);
    }
  }, state.frameMs);
}

function moveLeft(state) {
  clearInterval(state.timers.left);
  clearInterval(state.timers.right);

  state.timers.left = setInterval(() => {
    if (state.doodler.leftSpace >= 0) {
      state.doodler.leftSpace -= 3;
      state.doodler.element.style.left = `${state.doodler.leftSpace}px`;
    } else {
      clearInterval(state.timers.left);
    }
  }, state.frameMs);
}

function control(e, state) {
  switch (e.key) {
    case "ArrowLeft": {
      moveLeft(state);
      break;
    }

    case "ArrowRight": {
      moveRight(state);
      break;
    }

    case "ArrowUp": {
      moveStraight(state.timers.left, state.timers.right);
      break;
    }

    case " ": {
      start(state);
      break;
    }

    default:
      break;
  }
}

function start(state) {
  Object.keys(state.timers).forEach((name) =>
    clearInterval(state.timers[name])
  );

  clearScreen(state.screen.element);

  state.platforms = createPlatforms({
    screen: state.screen.element,
    platformCount: state.platformCount,
    leftSpace: state.doodler.leftSpace,
  });
  renderDoodler({
    screen: state.screen.element,
    doodler: state.doodler.element,
    leftSpace: state.doodler.leftSpace,
    bottomSpace: state.doodler.bottomSpace,
  });
  movePlatforms(state.platforms, state.doodler.bottomSpace);

  jump(state);

  state.timers.platforms = setInterval(() => {
    movePlatforms(state.platforms, state.doodler.bottomSpace);
  }, state.frameMs);
}

function initGame({
  startPoint: initialStartPoint,
  screen,
  buttonStart,
  doodler,
  isJumping = true,
  platformCount = 5,
  frameMs = 16,
  score = 0,
  platforms = [],
}) {
  const initialState = {
    screen: {
      startPoint: initialStartPoint,
      element: screen,
    },
    doodler: {
      element: doodler,
      leftSpace: initialStartPoint,
      bottomSpace: initialStartPoint,
      isJumping,
    },
    timers: {
      up: 0,
      left: 0,
      right: 0,
      platforms: 0,
      fallDown: 0,
    },
    score,
    platforms,
    frameMs,
    platformCount,
  };

  buttonStart.addEventListener("click", () => {
    start(initialState);
  });

  document.addEventListener("keyup", (e) => control(e, initialState));
}
