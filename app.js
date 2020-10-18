document.addEventListener("DOMContentLoaded", () => {
  const config = {
    startPoint: 150,
    screen: document.querySelector(".screen"),
    buttonStart: document.querySelector(".start"),
    doodler: document.createElement("div"),
  };
  initGame(config);
});

function clearScreen(screen) {
  screen.innerHTML = "";
}

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

function createPlatforms({ screen, platformCount, doodlerLeftSpace }) {
  let result = [];

  for (let i = 0; i < platformCount; i++) {
    let platformGap = 600 / platformCount;
    let newPlatformBottom = 100 + i * platformGap;

    let left;

    if (i === 0) {
      left = doodlerLeftSpace;
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

function movePlatforms(platforms, doodlerBottomSpace) {
  if (doodlerBottomSpace > 150) {
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

function initGame({
  startPoint,
  screen,
  buttonStart,
  doodler,
  isGameOver = false,
  isJumping = true,
  platformCount = 5,
  frameMs = 16,
  score = 0,
  platforms = [],
}) {
  let doodlerLeftSpace = startPoint;
  let doodlerBottomSpace = startPoint;
  let timerPlatforms;
  let upTimer;
  let fallDownTimer;
  let leftTimer;
  let rightTimer;

  function resetGame(platforms) {
    clearScreen(screen);
    clearInterval(timerPlatforms);
    clearInterval(upTimer);
    clearInterval(fallDownTimer);
    clearInterval(leftTimer);
    doodlerBottomSpace = startPoint;
    doodlerLeftSpace = startPoint;
    platforms = [];
    score = 0;

    document.removeEventListener("keyup", control);
  }

  function start() {
    resetGame(platforms);

    if (!isGameOver) {
      platforms = createPlatforms({ screen, platformCount, doodlerLeftSpace });
      renderDoodler({
        screen,
        doodler,
        leftSpace: doodlerLeftSpace,
        bottomSpace: doodlerBottomSpace,
      });
      movePlatforms(platforms, doodlerBottomSpace);

      // TODO do otherwise jump and fall
      // moveDoodler({
      //   screen,
      //   doodlerBottomSpace,
      //   doodler,
      //   startPoint,
      //   frameMs,
      //   upTimer,
      //   fallDownTimer,
      //   score,
      //   doodlerLeftSpace,
      //   platforms,
      //   isJumping,
      //   gameOver,
      // });
      jump();

      function jump() {
        isJumping = true;
        upTimer = setInterval(() => {
          doodlerBottomSpace += 5;

          doodler.style.bottom = `${doodlerBottomSpace}px`;

          if (doodlerBottomSpace > startPoint + 200) {
            fall();
          }
        }, frameMs);
      }

      function fall() {
        isJumping = false;
        clearInterval(upTimer);
        fallDownTimer = setInterval(() => {
          doodlerBottomSpace -= 5;
          doodler.style.bottom = `${doodlerBottomSpace}px`;

          if (doodlerBottomSpace <= 0) {
            clearInterval(fallDownTimer);
            gameOver(screen, score);
          }

          platforms.forEach((platform) => {
            if (
              doodlerBottomSpace >= platform.bottom &&
              doodlerBottomSpace <= platform.bottom + 15 &&
              doodlerLeftSpace + 87 >= platform.left &&
              doodlerLeftSpace <= platform.left + 85 &&
              !isJumping
            ) {
              clearInterval(fallDownTimer);
              startPoint = doodlerBottomSpace;
              score += 1;
              jump();
            }
          });
        }, frameMs);
      }

      document.addEventListener("keyup", control);

      timerPlatforms = setInterval(() => {
        movePlatforms(platforms, doodlerBottomSpace);
      }, frameMs);
    }
  }

  function control(e) {
    switch (e.key) {
      case "ArrowLeft": {
        moveLeft();
        break;
      }

      case "ArrowRight": {
        moveRight();
        break;
      }

      case "ArrowUp": {
        moveStraight(leftTimer, rightTimer);
        break;
      }

      case " ": {
        start();
        break;
      }

      default:
        break;
    }
  }

  // TODO do otherwise move actions
  function moveLeft() {
    clearInterval(leftTimer);
    clearInterval(rightTimer);

    leftTimer = setInterval(() => {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 3;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else {
        clearInterval(leftTimer);
      }
    }, frameMs);
  }

  function moveRight() {
    clearInterval(rightTimer);
    clearInterval(leftTimer);

    rightTimer = setInterval(() => {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 3;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else {
        clearInterval(rightTimer);
      }
    }, frameMs);
  }

  buttonStart.addEventListener("click", () => {
    start();
  });
}
