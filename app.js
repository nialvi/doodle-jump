document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
  const grid = document.querySelector(".grid");
  const buttonStart = document.querySelector(".start");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 150;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  const platformCount = 5;
  const frameMs = 16;
  let platforms = [];
  let timerPlatforms;
  let upTimer;
  let fallDownTimer;
  let leftTimer;
  let rightTimer;
  let score = 0;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  class Platform {
    constructor(bottomPosition, leftPosition = Math.random() * 315) {
      this.bottom = bottomPosition;
      this.left = leftPosition;
      this.element = document.createElement("div");

      this.element.classList.add("platform");
      this.element.style.bottom = `${this.bottom}px`;
      this.element.style.left = `${this.left}px`;

      grid.appendChild(this.element);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformGap;
      let left;

      if (i === 0) {
        left = doodlerLeftSpace;
      }

      let newPlatform = new Platform(newPlatformBottom, left);

      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
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
        gameOver();
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

  function gameOver() {
    grid.innerHTML = score;
    console.log("game over");
  }

  function clearGrid() {
    grid.innerHTML = "";
  }

  function resetGame() {
    clearGrid();
    clearInterval(timerPlatforms);
    clearInterval(upTimer);
    clearInterval(fallDownTimer);
    clearInterval(leftTimer);
    doodlerBottomSpace = startPoint;
    doodlerLeftSpace = startPoint;
    isGoingLeft = false;
    isGoingRight = false;
    platforms = [];
    score = 0;

    document.removeEventListener("keyup", control);
  }

  function start() {
    resetGame();

    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      movePlatforms();
      jump();

      document.addEventListener("keyup", control);

      timerPlatforms = setInterval(movePlatforms, frameMs);
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
        moveStraight();
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

  function moveLeft() {
    isGoingLeft = true;
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
    isGoingRight = true;
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

  function moveStraight() {
    clearInterval(leftTimer);
    clearInterval(rightTimer);
  }

  buttonStart.addEventListener("click", () => {
    start();
  });
}
